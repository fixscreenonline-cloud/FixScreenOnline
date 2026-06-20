import { NextResponse } from "next/server";

import { getAuthenticatedAdmin } from "@/lib/auth/guards";
import { validateCsrf } from "@/lib/auth/csrf";

export async function requireAdminApi(request: Request) {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (request.method !== "GET" && !(await validateCsrf(request))) {
    return {
      error: NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 }),
    };
  }

  return { admin };
}
