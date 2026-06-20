import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyTotpToken } from "@/lib/auth/totp";
import { verifyRecoveryCode } from "@/lib/auth/password";
import { logAudit } from "@/lib/auth/audit";
import { checkRateLimit } from "@/lib/auth/rate-limit";
import { getClientIp, getUserAgent } from "@/lib/auth/request";
import { validatePendingAuth } from "@/lib/auth/lockout";
import { getPendingToken } from "@/lib/auth/session-cookies";
import { finalizeAdminLogin } from "@/lib/auth/finalize-login";
import {
  totpVerifySchema,
  recoveryCodeSchema,
} from "@/lib/validations/booking";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const userAgent = getUserAgent(request);
  const rate = checkRateLimit(`2fa:${ip}`);

  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const pendingToken = await getPendingToken();

    if (!pendingToken) {
      return NextResponse.json({ error: "Session expired. Please log in again." }, { status: 401 });
    }

    const pending = await validatePendingAuth(pendingToken);

    if (!pending) {
      return NextResponse.json({ error: "Session expired. Please log in again." }, { status: 401 });
    }

    const admin = pending.admin;

    if (!admin.twoFactorEnabled || !admin.twoFactorSecret) {
      return NextResponse.json({ error: "2FA not configured" }, { status: 400 });
    }

    const body = await request.json();

    if (body.recoveryCode) {
      const parsed = recoveryCodeSchema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json({ error: "Invalid recovery code" }, { status: 400 });
      }

      if (!admin.recoveryCodesHash) {
        return NextResponse.json({ error: "No recovery codes available" }, { status: 400 });
      }

      const result = await verifyRecoveryCode(
        parsed.data.recoveryCode,
        admin.recoveryCodesHash,
      );

      if (!result.valid) {
        await logAudit({
          adminId: admin.id,
          action: "2FA_FAILED",
          details: "Invalid recovery code",
          ipAddress: ip,
          userAgent,
        });

        return NextResponse.json({ error: "Invalid recovery code" }, { status: 401 });
      }

      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          recoveryCodesHash: JSON.stringify(result.remainingHashes),
        },
      });
    } else {
      const parsed = totpVerifySchema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json({ error: "Invalid authenticator code" }, { status: 400 });
      }

      const valid = verifyTotpToken(admin.twoFactorSecret, parsed.data.token);

      if (!valid) {
        await logAudit({
          adminId: admin.id,
          action: "2FA_FAILED",
          details: "Invalid TOTP code",
          ipAddress: ip,
          userAgent,
        });

        return NextResponse.json({ error: "Invalid authenticator code" }, { status: 401 });
      }
    }

    await finalizeAdminLogin(admin.id, ip, userAgent);

    return NextResponse.json({ success: true, redirect: "/admin" });
  } catch (error) {
    console.error("2FA verify error:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
