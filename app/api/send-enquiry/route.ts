import { NextRequest, NextResponse } from "next/server";

import { createBooking } from "@/lib/admin/bookings-service";
import { notifyAdminNewBooking } from "@/lib/email/notify-admin-booking";
import { mapZodFieldErrors } from "@/lib/validations/booking-form";
import { publicBookingPayloadSchema } from "@/lib/validations/booking";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = publicBookingPayloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please correct the highlighted fields",
          fieldErrors: mapZodFieldErrors(parsed.error),
        },
        { status: 400 },
      );
    }

    const {
      name,
      email,
      phone,
      device,
      serviceLocation,
      streetAddress,
      city,
      zip,
      preferredDate,
      preferredTime,
      issue,
    } = parsed.data;

    const booking = await createBooking({
      name,
      phone,
      email: email ?? "",
      device,
      serviceLocation,
      streetAddress: streetAddress ?? "",
      city: city ?? "",
      zip: zip ?? "",
      preferredDate: preferredDate ?? "",
      preferredTime: preferredTime ?? "",
      issue,
    });

    void notifyAdminNewBooking({
      id: booking.id,
      name,
      email,
      phone,
      device,
      serviceLocation,
      streetAddress: streetAddress ?? "",
      city: city ?? "",
      zip: zip ?? "",
      preferredDate,
      preferredTime,
      issue,
    });

    return NextResponse.json(
      { success: true, message: "Booking submitted successfully", id: booking.id },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing booking:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
