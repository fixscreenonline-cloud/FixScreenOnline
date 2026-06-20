import { NextRequest, NextResponse } from "next/server";

import {
  createBooking,
  getBookings,
} from "@/lib/admin/bookings-service";
import { requireAdminApi } from "@/lib/auth/api-guard";
import { logAudit } from "@/lib/auth/audit";
import { getClientIp, getUserAgent } from "@/lib/auth/request";
import {
  bookingPayloadSchema,
  bookingQuerySchema,
} from "@/lib/validations/booking";

export async function GET(request: NextRequest) {
  const guard = await requireAdminApi(request);

  if ("error" in guard) return guard.error;

  const params = Object.fromEntries(request.nextUrl.searchParams);
  const parsed = bookingQuerySchema.safeParse(params);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
  }

  const result = await getBookings(parsed.data);

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const guard = await requireAdminApi(request);

  if ("error" in guard) return guard.error;

  try {
    const body = await request.json();
    const parsed = bookingPayloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    if (
      data.serviceLocation === "come-to-me" &&
      (!data.streetAddress?.trim() || !data.city?.trim() || !data.zip?.trim())
    ) {
      return NextResponse.json(
        { error: "Address fields required for on-site service" },
        { status: 400 },
      );
    }

    const booking = await createBooking({
      name: data.name,
      phone: data.phone,
      email: data.email ?? "",
      device: data.device,
      serviceLocation: data.serviceLocation,
      streetAddress: data.streetAddress ?? "",
      city: data.city ?? "",
      zip: data.zip ?? "",
      preferredDate: data.preferredDate ?? "",
      preferredTime: data.preferredTime ?? "",
      issue: data.issue,
    });

    await logAudit({
      adminId: guard.admin.adminId,
      action: "BOOKING_CREATE",
      details: `Created booking ${booking.id}`,
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Create booking error:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
