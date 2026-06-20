import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    console.error(
      "Missing ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD in .env.local",
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("ADMIN_SEED_PASSWORD must be at least 8 characters");
    process.exit(1);
  }

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    console.error(`No admin account found for ${email}`);
    console.error("Run npm run db:seed first to create the admin user.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.update({
    where: { id: admin.id },
    data: {
      passwordHash,
      failedAttempts: 0,
      lockedUntil: null,
    },
  });

  console.log(`Password updated for ${email}`);
  console.log("You can now sign in with the new password.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
