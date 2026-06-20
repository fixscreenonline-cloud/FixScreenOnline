import { NextResponse } from "next/server";

import { getAuthenticatedAdmin } from "@/lib/auth/guards";
import { getCsrfToken } from "@/lib/auth/csrf";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  const csrfToken = await getCsrfToken();

  if (!admin) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    admin: {
      id: admin.adminId,
      email: admin.email,
      twoFactorEnabled: admin.twoFactorEnabled,
    },
    csrfToken,
  });
}
