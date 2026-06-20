import { randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";
import {
  MAX_FAILED_ATTEMPTS,
  LOCKOUT_DURATION_MS,
  SESSION_TIMEOUT_MS,
  PENDING_AUTH_TTL_MS,
  ONE_TIME_TOKEN_TTL_MS,
} from "@/lib/auth/constants";

export async function isAccountLocked(lockedUntil: Date | null): Promise<{
  locked: boolean;
  lockedUntil: Date | null;
}> {
  if (!lockedUntil) return { locked: false, lockedUntil: null };

  if (lockedUntil > new Date()) {
    return { locked: true, lockedUntil };
  }

  return { locked: false, lockedUntil: null };
}

export async function recordFailedLogin(adminId: string) {
  const admin = await prisma.admin.update({
    where: { id: adminId },
    data: { failedAttempts: { increment: 1 } },
  });

  if (admin.failedAttempts >= MAX_FAILED_ATTEMPTS) {
    const lockedUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);

    await prisma.admin.update({
      where: { id: adminId },
      data: { lockedUntil, failedAttempts: MAX_FAILED_ATTEMPTS },
    });

    return { locked: true, lockedUntil };
  }

  return { locked: false, lockedUntil: null };
}

export async function resetFailedAttempts(adminId: string) {
  await prisma.admin.update({
    where: { id: adminId },
    data: { failedAttempts: 0, lockedUntil: null },
  });
}

export async function createPendingAuth(adminId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + PENDING_AUTH_TTL_MS);

  await prisma.pendingAuth.upsert({
    where: { adminId },
    create: { adminId, token, expiresAt },
    update: { token, expiresAt },
  });

  return token;
}

export async function validatePendingAuth(token: string) {
  const pending = await prisma.pendingAuth.findUnique({
    where: { token },
    include: { admin: true },
  });

  if (!pending || pending.expiresAt < new Date()) {
    if (pending) {
      await prisma.pendingAuth.delete({ where: { id: pending.id } });
    }

    return null;
  }

  return pending;
}

export async function clearPendingAuth(adminId: string) {
  await prisma.pendingAuth.deleteMany({ where: { adminId } });
}

export async function createOneTimeLoginToken(adminId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + ONE_TIME_TOKEN_TTL_MS);

  await prisma.oneTimeLoginToken.create({
    data: { adminId, token, expiresAt },
  });

  return token;
}

export async function consumeOneTimeLoginToken(token: string) {
  const record = await prisma.oneTimeLoginToken.findUnique({
    where: { token },
  });

  if (!record || record.used || record.expiresAt < new Date()) {
    return null;
  }

  await prisma.oneTimeLoginToken.update({
    where: { id: record.id },
    data: { used: true },
  });

  return record.adminId;
}

export async function createAdminSession(adminId: string) {
  const sessionToken = randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TIMEOUT_MS);

  await prisma.adminSession.create({
    data: {
      adminId,
      sessionToken,
      expiresAt,
      lastActivity: new Date(),
    },
  });

  return { sessionToken, expiresAt };
}

export async function validateAdminSession(sessionToken: string) {
  const session = await prisma.adminSession.findUnique({
    where: { sessionToken },
    include: { admin: true },
  });

  if (!session) return null;

  const inactiveMs = Date.now() - session.lastActivity.getTime();

  if (inactiveMs > SESSION_TIMEOUT_MS || session.expiresAt < new Date()) {
    await prisma.adminSession.delete({ where: { id: session.id } });

    return null;
  }

  await prisma.adminSession.update({
    where: { id: session.id },
    data: {
      lastActivity: new Date(),
      expiresAt: new Date(Date.now() + SESSION_TIMEOUT_MS),
    },
  });

  return session;
}

export async function destroyAdminSession(sessionToken: string) {
  await prisma.adminSession.deleteMany({ where: { sessionToken } });
}

export async function destroyAllAdminSessions(adminId: string) {
  await prisma.adminSession.deleteMany({ where: { adminId } });
}
