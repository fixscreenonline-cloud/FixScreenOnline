import { signIn } from "@/auth";

import { prisma } from "@/lib/prisma";
import { logAudit, logLoginAttempt } from "@/lib/auth/audit";
import {
  createAdminSession,
  createOneTimeLoginToken,
  clearPendingAuth,
} from "@/lib/auth/lockout";
import {
  setSessionCookie,
  clearPendingCookie,
} from "@/lib/auth/session-cookies";

export async function finalizeAdminLogin(
  adminId: string,
  ip: string,
  userAgent: string,
) {
  const admin = await prisma.admin.findUniqueOrThrow({ where: { id: adminId } });

  await clearPendingAuth(adminId);
  await clearPendingCookie();

  const { sessionToken, expiresAt } = await createAdminSession(adminId);

  await setSessionCookie(sessionToken, expiresAt);

  const loginToken = await createOneTimeLoginToken(adminId);

  await signIn("admin-token", {
    loginToken,
    redirect: false,
  });

  await logLoginAttempt({
    adminId,
    email: admin.email,
    success: true,
    ipAddress: ip,
    userAgent,
  });

  await logAudit({
    adminId,
    action: "LOGIN_SUCCESS",
    ipAddress: ip,
    userAgent,
  });

  return { expiresAt };
}
