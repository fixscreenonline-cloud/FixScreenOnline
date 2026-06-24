import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function findAdminByEmail(email: string) {
  const normalized = email.trim().toLowerCase();

  const exact = await prisma.admin.findUnique({ where: { email: normalized } });

  if (exact) return exact;

  const admins = await prisma.admin.findMany();
  const match = admins.find(
    (admin) => admin.email.trim().toLowerCase() === normalized,
  );

  if (!match) return null;

  if (match.email !== normalized) {
    return prisma.admin.update({
      where: { id: match.id },
      data: { email: normalized },
    });
  }

  return match;
}

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL?.trim();

  if (!email) {
    console.error("Missing ADMIN_SEED_EMAIL in .env.local");
    process.exit(1);
  }

  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!password) {
    console.error("Missing ADMIN_SEED_PASSWORD in .env.local");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("ADMIN_SEED_PASSWORD must be at least 8 characters");
    process.exit(1);
  }

  const admin = await findAdminByEmail(email);

  if (!admin) {
    const admins = await prisma.admin.findMany({ select: { email: true } });

    console.error(`No admin account found for ${email.trim().toLowerCase()}`);

    if (admins.length > 0) {
      console.error("Existing admin emails:");
      for (const entry of admins) {
        console.error(`  - ${entry.email}`);
      }
    } else {
      console.error("Run npm run db:seed first to create the admin user.");
    }

    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.update({
    where: { id: admin.id },
    data: {
      email: admin.email.trim().toLowerCase(),
      passwordHash,
      failedAttempts: 0,
      lockedUntil: null,
    },
  });

  console.log(`Password updated for ${admin.email.trim().toLowerCase()}`);
  console.log("Login lockout cleared. Sign in with your new password.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
