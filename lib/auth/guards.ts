import { prisma } from "@/lib/prisma";
import {
  getSessionToken,
  getPendingToken,
} from "@/lib/auth/session-cookies";
import { validateAdminSession, validatePendingAuth } from "@/lib/auth/lockout";

export type AdminAuthContext = {
  adminId: string;
  email: string;
  twoFactorEnabled: boolean;
};

export async function getAuthenticatedAdmin(): Promise<AdminAuthContext | null> {
  const sessionToken = await getSessionToken();

  if (!sessionToken) return null;

  const session = await validateAdminSession(sessionToken);

  if (!session) return null;

  return {
    adminId: session.admin.id,
    email: session.admin.email,
    twoFactorEnabled: session.admin.twoFactorEnabled,
  };
}

export async function requireAuthenticatedAdmin(): Promise<AdminAuthContext> {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    throw new Error("UNAUTHORIZED");
  }

  return admin;
}

export async function getPendingAdmin() {
  const token = await getPendingToken();

  if (!token) return null;

  const pending = await validatePendingAuth(token);

  if (!pending) return null;

  return pending.admin;
}

export async function getAdminByEmail(email: string) {
  return prisma.admin.findUnique({ where: { email: email.toLowerCase() } });
}
