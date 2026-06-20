import { NextRequest, NextResponse } from "next/server";

import {
  deleteBooking,
  getBookingById,
  updateBooking,
} from "@/lib/admin/bookings-service";
import { requireAdminApi } from "@/lib/auth/api-guard";
import { logAudit } from "@/lib/auth/audit";
import { getClientIp, getUserAgent } from "@/lib/auth/request";
import { bookingUpdateSchema } from "@/lib/validations/booking";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const guard = await requireAdminApi(request);

  if ("error" in guard) return guard.error;

  const { id } = await context.params;
  const booking = await getBookingById(id);

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json(booking);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const guard = await requireAdminApi(request);

  if ("error" in guard) return guard.error;

  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = bookingUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const booking = await updateBooking(id, {
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email ?? "",
      device: parsed.data.device,
      serviceLocation: parsed.data.serviceLocation,
      streetAddress: parsed.data.streetAddress ?? "",
      city: parsed.data.city ?? "",
      zip: parsed.data.zip ?? "",
      preferredDate: parsed.data.preferredDate ?? "",
      preferredTime: parsed.data.preferredTime ?? "",
      issue: parsed.data.issue,
    });

    await logAudit({
      adminId: guard.admin.adminId,
      action: "BOOKING_UPDATE",
      details: `Updated booking ${id}`,
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Update booking error:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const guard = await requireAdminApi(request);

  if ("error" in guard) return guard.error;

  try {
    const { id } = await context.params;

    await deleteBooking(id);

    await logAudit({
      adminId: guard.admin.adminId,
      action: "BOOKING_DELETE",
      details: `Deleted booking ${id}`,
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete booking error:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
