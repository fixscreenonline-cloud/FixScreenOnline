import * as XLSX from "xlsx";

import type { Booking } from "@prisma/client";

const HEADERS = [
  "Name",
  "Phone",
  "Email",
  "Device",
  "Service Location",
  "Street Address",
  "City",
  "ZIP",
  "Preferred Date",
  "Preferred Time",
  "Issue",
  "Created At",
];

function bookingToRow(booking: Booking) {
  return [
    booking.name,
    booking.phone,
    booking.email,
    booking.device,
    booking.serviceLocation,
    booking.streetAddress,
    booking.city,
    booking.zip,
    booking.preferredDate,
    booking.preferredTime,
    booking.issue,
    booking.createdAt.toISOString(),
  ];
}

export function exportBookingsToCsv(bookings: Booking[]): string {
  const rows = [HEADERS, ...bookings.map(bookingToRow)];

  return rows
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
}

export function exportBookingsToExcel(bookings: Booking[]): Buffer {
  const worksheet = XLSX.utils.aoa_to_sheet([
    HEADERS,
    ...bookings.map(bookingToRow),
  ]);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

  return Buffer.from(
    XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }),
  );
}
