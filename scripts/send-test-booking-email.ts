import { notifyAdminNewBooking } from "../lib/email/notify-admin-booking";

const dummyBooking = {
  id: "preview-000000000000000000000001",
  name: "Maria Gonzalez",
  email: "maria.gonzalez@example.com",
  phone: "+1 (516) 555-0199",
  device: "smartphone",
  serviceLocation: "come-to-me" as const,
  streetAddress: "42 Old Country Rd, Apt 3B",
  city: "Hicksville",
  zip: "11801",
  preferredDate: "2026-06-28",
  preferredTime: "14:30",
  issue:
    "iPhone 14 Pro screen is cracked after a drop. Touch still works but glass is shattered on the top-right corner. Would like same-day service if possible.",
};

async function main() {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
    console.error("Missing RESEND_API_KEY or ADMIN_EMAIL in .env.local");
    process.exit(1);
  }

  console.log(`Sending preview email to ${process.env.ADMIN_EMAIL}...`);

  const result = await notifyAdminNewBooking(dummyBooking);

  if (!result.sent) {
    console.error("Failed to send:", result.error ?? "Unknown error");
    process.exit(1);
  }

  console.log("Preview email sent successfully.");
  console.log("Check your inbox (and spam folder) for the sample booking.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
