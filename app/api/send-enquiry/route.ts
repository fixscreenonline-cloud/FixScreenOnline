import { NextRequest, NextResponse } from "next/server";

import { createBooking } from "@/lib/admin/bookings-service";
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

    const serviceLocationLabel =
      serviceLocation === "store" ? "In-Store Visit" : "On-Site Service";

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "your-email@example.com";

    if (RESEND_API_KEY) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: ADMIN_EMAIL,
          subject: `New service Request from ${name}`,
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">New Device service Request</h2>
            <p style="color: #6b7280; font-size: 13px;">Booking ID: ${booking.id}</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              ${email ? `<p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>` : ""}
              <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin: 10px 0;"><strong>Device:</strong> ${device}</p>
              <p style="margin: 10px 0;"><strong>Service Method:</strong> ${serviceLocationLabel}</p>
              ${serviceLocation === "come-to-me" ? `<p style="margin: 10px 0;"><strong>Street Address:</strong> ${streetAddress}</p>` : ""}
              ${serviceLocation === "come-to-me" ? `<p style="margin: 10px 0;"><strong>City:</strong> ${city}</p>` : ""}
              ${serviceLocation === "come-to-me" ? `<p style="margin: 10px 0;"><strong>ZIP Code:</strong> ${zip}</p>` : ""}
              ${preferredDate ? `<p style="margin: 10px 0;"><strong>Preferred Date:</strong> ${preferredDate}</p>` : ""}
              ${preferredTime ? `<p style="margin: 10px 0;"><strong>Preferred Time:</strong> ${preferredTime}</p>` : ""}
            </div>
            <div style="margin: 20px 0;">
              <h3 style="color: #7c3aed;">Issue Description:</h3>
              <p style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #7c3aed; border-radius: 4px;">
                ${issue}
              </p>
            </div>
          </div>
        `,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        console.error("Resend API error:", data);
      }
    }

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
