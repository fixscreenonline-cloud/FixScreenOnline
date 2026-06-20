import { prisma } from "@/lib/prisma";

export async function logAudit(params: {
  adminId?: string;
  action: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  await prisma.auditLog.create({
    data: {
      adminId: params.adminId,
      action: params.action,
      details: params.details,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    },
  });
}

export async function logLoginAttempt(params: {
  adminId?: string;
  email: string;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
  reason?: string;
}) {
  await prisma.loginAttempt.create({
    data: params,
  });
}
