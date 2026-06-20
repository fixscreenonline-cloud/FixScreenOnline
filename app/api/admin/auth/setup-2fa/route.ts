import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  generateTotpSecret,
  generateQrCodeDataUrl,
  verifyTotpToken,
  generateRecoveryCodes,
} from "@/lib/auth/totp";
import { hashRecoveryCodes } from "@/lib/auth/password";
import { RECOVERY_CODE_COUNT } from "@/lib/auth/constants";
import { finalizeAdminLogin } from "@/lib/auth/finalize-login";
import { logAudit } from "@/lib/auth/audit";
import { getClientIp, getUserAgent } from "@/lib/auth/request";
import { validatePendingAuth } from "@/lib/auth/lockout";
import { getPendingToken } from "@/lib/auth/session-cookies";

export async function GET() {
  try {
    const pendingToken = await getPendingToken();

    if (!pendingToken) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    const pending = await validatePendingAuth(pendingToken);

    if (!pending) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    const secret = generateTotpSecret(pending.admin.email);
    const qrCode = await generateQrCodeDataUrl(secret.otpauth_url!);

    return NextResponse.json({
      secret: secret.base32,
      qrCode,
      manualEntry: secret.base32,
    });
  } catch (error) {
    console.error("2FA setup error:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const userAgent = getUserAgent(request);

  try {
    const pendingToken = await getPendingToken();

    if (!pendingToken) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    const pending = await validatePendingAuth(pendingToken);

    if (!pending) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    const body = await request.json();
    const { secret, token } = body;

    if (!secret || !token) {
      return NextResponse.json(
        { error: "Secret and token are required" },
        { status: 400 },
      );
    }

    const valid = verifyTotpToken(secret, token);

    if (!valid) {
      return NextResponse.json({ error: "Invalid authenticator code" }, { status: 401 });
    }

    const recoveryCodes = generateRecoveryCodes(RECOVERY_CODE_COUNT);
    const recoveryCodesHash = await hashRecoveryCodes(recoveryCodes);

    await prisma.admin.update({
      where: { id: pending.admin.id },
      data: {
        twoFactorSecret: secret,
        twoFactorEnabled: true,
        recoveryCodesHash,
      },
    });

    await logAudit({
      adminId: pending.admin.id,
      action: "2FA_ENABLED",
      ipAddress: ip,
      userAgent,
    });

    await finalizeAdminLogin(pending.admin.id, ip, userAgent);

    return NextResponse.json({
      success: true,
      recoveryCodes,
      redirect: "/admin",
    });
  } catch (error) {
    console.error("2FA confirm error:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
