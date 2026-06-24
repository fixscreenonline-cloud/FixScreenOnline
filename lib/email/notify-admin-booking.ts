type BookingNotification = {
  id: string;
  name: string;
  email: string;
  phone: string;
  device: string;
  serviceLocation: "store" | "come-to-me";
  streetAddress: string;
  city: string;
  zip: string;
  preferredDate: string;
  preferredTime: string;
  issue: string;
};

const DEVICE_LABELS: Record<string, string> = {
  laptop: "Laptop",
  smartphone: "Smartphone",
  tablet: "Tablet",
  desktop: "Desktop",
  smartwatch: "Smartwatch",
  "smart-glass": "Meta Glass / Smart Glass",
  other: "Other",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDevice(device: string) {
  return DEVICE_LABELS[device] ?? device;
}

function formatPreferredDate(value: string) {
  if (!value) return "Not provided";

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return value;

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatPreferredTime(value: string) {
  if (!value) return "Not provided";

  const [hourPart, minutePart] = value.split(":");
  const hour = Number(hourPart);
  const minute = Number(minutePart);

  if (Number.isNaN(hour) || Number.isNaN(minute)) return value;

  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function buildAdminBookingEmailDraft(booking: BookingNotification) {
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });
  const serviceLocationLabel =
    booking.serviceLocation === "store"
      ? "In-Store Visit (customer comes to Hicksville)"
      : "On-Site Service (technician visits customer)";
  const deviceLabel = formatDevice(booking.device);
  const preferredDateLabel = formatPreferredDate(booking.preferredDate);
  const preferredTimeLabel = formatPreferredTime(booking.preferredTime);

  const subject = `New quote request — ${booking.name} (${deviceLabel})`;

  const text = [
    "NEW SERVICE QUOTE REQUEST",
    "=========================",
    "",
    `Submitted: ${submittedAt}`,
    `Booking ID: ${booking.id}`,
    "",
    "CUSTOMER DETAILS",
    "----------------",
    `Name:  ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    "",
    "SERVICE DETAILS",
    "---------------",
    `Device:         ${deviceLabel}`,
    `Service method: ${serviceLocationLabel}`,
    ...(booking.serviceLocation === "come-to-me"
      ? [
          `Street address: ${booking.streetAddress}`,
          `City:           ${booking.city}`,
          `ZIP code:       ${booking.zip}`,
        ]
      : []),
    "",
    "PREFERRED SCHEDULE",
    "------------------",
    `Date: ${preferredDateLabel}`,
    `Time: ${preferredTimeLabel}`,
    "",
    "ISSUE DESCRIPTION",
    "-----------------",
    booking.issue,
    "",
    "View in admin panel: /admin/bookings",
  ].join("\n");

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 38%; font-size: 14px;">
        ${escapeHtml(label)}
      </td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px; font-weight: 600;">
        ${value}
      </td>
    </tr>`;

  const linkRow = (label: string, value: string, href: string) => `
    <tr>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 38%; font-size: 14px;">
        ${escapeHtml(label)}
      </td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; font-weight: 600;">
        <a href="${escapeHtml(href)}" style="color: #7c3aed; text-decoration: none;">
          ${escapeHtml(value)}
        </a>
      </td>
    </tr>`;

  const section = (title: string, rows: string) => `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 20px; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: #ffffff;">
      <tr>
        <td colspan="2" style="padding: 12px 14px; background: #f5f3ff; color: #5b21b6; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
          ${escapeHtml(title)}
        </td>
      </tr>
      ${rows}
    </table>`;

  const customerRows = [
    row("Full name", booking.name),
    linkRow("Email", booking.email, `mailto:${booking.email}`),
    linkRow("Phone", booking.phone, phoneHref(booking.phone)),
  ].join("");

  const serviceRows = [
    row("Device type", deviceLabel),
    row("Service method", serviceLocationLabel),
    ...(booking.serviceLocation === "come-to-me"
      ? [
          row("Street address", booking.streetAddress),
          row("City", booking.city),
          row("ZIP code", booking.zip),
        ]
      : []),
  ].join("");

  const scheduleRows = [
    row("Preferred date", preferredDateLabel),
    row("Preferred time", preferredTimeLabel),
  ].join("");

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; background: #f9fafb; padding: 24px 12px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #7c3aed, #9333ea); padding: 24px 28px; color: #ffffff;">
          <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.9;">
            FixScreen Online
          </p>
          <h1 style="margin: 0; font-size: 24px; line-height: 1.3;">
            New Service Quote Request
          </h1>
          <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.95;">
            ${escapeHtml(submittedAt)}
          </p>
        </div>

        <div style="padding: 24px 28px;">
          <p style="margin: 0 0 20px; color: #6b7280; font-size: 13px;">
            Booking ID: <strong style="color: #111827;">${escapeHtml(booking.id)}</strong>
          </p>

          ${section("Customer Details", customerRows)}
          ${section("Service Details", serviceRows)}
          ${section("Preferred Schedule", scheduleRows)}

          <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
            <div style="padding: 12px 14px; background: #f5f3ff; color: #5b21b6; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
              Issue Description
            </div>
            <div style="padding: 16px 14px; color: #111827; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
              ${escapeHtml(booking.issue)}
            </div>
          </div>

          <div style="text-align: center; margin-top: 8px;">
            <a href="${escapeHtml(phoneHref(booking.phone))}"
              style="display: inline-block; margin: 0 6px 10px; padding: 12px 18px; background: #7c3aed; color: #ffffff; text-decoration: none; border-radius: 999px; font-size: 14px; font-weight: 700;">
              Call ${escapeHtml(booking.name.split(" ")[0] || "Customer")}
            </a>
            <a href="mailto:${escapeHtml(booking.email)}"
              style="display: inline-block; margin: 0 6px 10px; padding: 12px 18px; background: #ffffff; color: #7c3aed; text-decoration: none; border-radius: 999px; font-size: 14px; font-weight: 700; border: 1px solid #ddd6fe;">
              Reply by Email
            </a>
          </div>

          <p style="margin: 18px 0 0; color: #9ca3af; font-size: 12px; text-align: center;">
            This request is also saved in your admin panel under Bookings.
          </p>
        </div>
      </div>
    </div>
  `;

  return { subject, html, text };
}

export async function notifyAdminNewBooking(
  booking: BookingNotification,
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!apiKey || !adminEmail) {
    return { sent: false, error: "Email notification not configured" };
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const { subject, html, text } = buildAdminBookingEmailDraft(booking);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: adminEmail,
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));

      console.error("Resend API error:", data);

      return { sent: false, error: "Failed to send notification email" };
    }

    return { sent: true };
  } catch (error) {
    console.error("Resend request failed:", error);

    return { sent: false, error: "Failed to send notification email" };
  }
}
