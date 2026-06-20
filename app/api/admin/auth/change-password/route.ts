import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth/api-guard";
import { logAudit } from "@/lib/auth/audit";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { getClientIp, getUserAgent } from "@/lib/auth/request";
import { changePasswordSchema } from "@/lib/validations/admin-auth";

export async function POST(request: NextRequest) {
  const guard = await requireAdminApi(request);

  if ("error" in guard) return guard.error;

  const ip = getClientIp(request);
  const userAgent = getUserAgent(request);

  try {
    const body = await request.json();
    const parsed = changePasswordSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid input";

      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { currentPassword, newPassword } = parsed.data;

    const admin = await prisma.admin.findUnique({
      where: { id: guard.admin.adminId },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin account not found" }, { status: 404 });
    }

    const currentValid = await verifyPassword(currentPassword, admin.passwordHash);

    if (!currentValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 },
      );
    }

    const passwordHash = await hashPassword(newPassword);

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        passwordHash,
        failedAttempts: 0,
        lockedUntil: null,
      },
    });

    await logAudit({
      adminId: admin.id,
      action: "PASSWORD_CHANGED",
      details: "Admin password updated",
      ipAddress: ip,
      userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Change password error:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
