import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { logAudit, logLoginAttempt } from "@/lib/auth/audit";
import { checkRateLimit } from "@/lib/auth/rate-limit";
import { getClientIp, getUserAgent } from "@/lib/auth/request";
import {
  isAccountLocked,
  recordFailedLogin,
  resetFailedAttempts,
  createPendingAuth,
} from "@/lib/auth/lockout";
import { setPendingCookie } from "@/lib/auth/session-cookies";
import { loginSchema } from "@/lib/validations/booking";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const userAgent = getUserAgent(request);
  const rate = checkRateLimit(`login:${ip}`);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)) },
      },
    );
  }

  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const { email, password } = parsed.data;
    const admin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!admin) {
      await logLoginAttempt({
        email: email.toLowerCase(),
        success: false,
        ipAddress: ip,
        userAgent,
        reason: "user_not_found",
      });

      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const lockStatus = await isAccountLocked(admin.lockedUntil);

    if (lockStatus.locked && lockStatus.lockedUntil) {
      await logLoginAttempt({
        adminId: admin.id,
        email: admin.email,
        success: false,
        ipAddress: ip,
        userAgent,
        reason: "account_locked",
      });

      return NextResponse.json(
        {
          error: "Account locked due to too many failed attempts",
          locked: true,
          lockedUntil: lockStatus.lockedUntil.toISOString(),
        },
        { status: 423 },
      );
    }

    const passwordValid = await verifyPassword(password, admin.passwordHash);

    if (!passwordValid) {
      const lockResult = await recordFailedLogin(admin.id);

      await logLoginAttempt({
        adminId: admin.id,
        email: admin.email,
        success: false,
        ipAddress: ip,
        userAgent,
        reason: "invalid_password",
      });

      if (lockResult.locked && lockResult.lockedUntil) {
        await logAudit({
          adminId: admin.id,
          action: "ACCOUNT_LOCKED",
          details: "Account locked after 3 failed login attempts",
          ipAddress: ip,
          userAgent,
        });

        return NextResponse.json(
          {
            error: "Account locked for 15 minutes",
            locked: true,
            lockedUntil: lockResult.lockedUntil.toISOString(),
          },
          { status: 423 },
        );
      }

      return NextResponse.json(
        {
          error: "Invalid email or password",
          attemptsRemaining: Math.max(0, 3 - admin.failedAttempts - 1),
        },
        { status: 401 },
      );
    }

    await resetFailedAttempts(admin.id);

    const pendingToken = await createPendingAuth(admin.id);

    await setPendingCookie(pendingToken);

    if (!admin.twoFactorEnabled) {
      return NextResponse.json({
        step: "setup_2fa",
        message: "Two-factor authentication setup required",
      });
    }

    return NextResponse.json({
      step: "verify_2fa",
      message: "Enter your authenticator code",
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
