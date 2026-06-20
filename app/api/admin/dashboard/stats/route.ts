import { NextRequest, NextResponse } from "next/server";

import { getDashboardStats } from "@/lib/admin/bookings-service";
import { requireAdminApi } from "@/lib/auth/api-guard";

export async function GET(request: NextRequest) {
  const guard = await requireAdminApi(request);

  if ("error" in guard) return guard.error;

  const stats = await getDashboardStats();

  return NextResponse.json(stats);
}
