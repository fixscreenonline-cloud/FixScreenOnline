import { NextResponse } from "next/server";

import { signOut } from "@/auth";
import { logAudit } from "@/lib/auth/audit";
import { destroyAdminSession } from "@/lib/auth/lockout";
import {
  clearSessionCookie,
  clearPendingCookie,
  getSessionToken,
} from "@/lib/auth/session-cookies";
import { getAuthenticatedAdmin } from "@/lib/auth/guards";
import { getClientIp, getUserAgent } from "@/lib/auth/request";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const userAgent = getUserAgent(request);

  try {
    const admin = await getAuthenticatedAdmin();
    const sessionToken = await getSessionToken();

    if (sessionToken) {
      await destroyAdminSession(sessionToken);
    }

    if (admin) {
      await logAudit({
        adminId: admin.adminId,
        action: "LOGOUT",
        ipAddress: ip,
        userAgent,
      });
    }

    await clearSessionCookie();
    await clearPendingCookie();
    await signOut({ redirect: false });

    return NextResponse.json({ success: true });
  } catch {
    await clearSessionCookie();
    await clearPendingCookie();

    return NextResponse.json({ success: true });
  }
}
