import { NextRequest, NextResponse } from "next/server";

import { getAllBookingsForExport } from "@/lib/admin/bookings-service";
import {
  exportBookingsToCsv,
  exportBookingsToExcel,
} from "@/lib/admin/export";
import { requireAdminApi } from "@/lib/auth/api-guard";
import { logAudit } from "@/lib/auth/audit";
import { getClientIp, getUserAgent } from "@/lib/auth/request";

export async function GET(request: NextRequest) {
  const guard = await requireAdminApi(request);

  if ("error" in guard) return guard.error;

  const format = request.nextUrl.searchParams.get("format") ?? "csv";
  const search = request.nextUrl.searchParams.get("search") ?? undefined;
  const device = request.nextUrl.searchParams.get("device") ?? undefined;
  const serviceLocation =
    request.nextUrl.searchParams.get("serviceLocation") ?? undefined;

  const bookings = await getAllBookingsForExport({
    search,
    device,
    serviceLocation,
  });

  await logAudit({
    adminId: guard.admin.adminId,
    action: "BOOKINGS_EXPORT",
    details: `Exported ${bookings.length} bookings as ${format}`,
    ipAddress: getClientIp(request),
    userAgent: getUserAgent(request),
  });

  if (format === "xlsx" || format === "excel") {
    const buffer = exportBookingsToExcel(bookings);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="bookings-${Date.now()}.xlsx"`,
      },
    });
  }

  const csv = exportBookingsToCsv(bookings);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="bookings-${Date.now()}.csv"`,
    },
  });
}
