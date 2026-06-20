import type { Booking, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import type { BookingQuery } from "@/lib/validations/booking";

export async function createBooking(
  data: Omit<Booking, "id" | "createdAt" | "updatedAt">,
) {
  return prisma.booking.create({ data });
}

export async function getBookings(query: BookingQuery) {
  const { page, limit, search, device, serviceLocation, sortBy, sortOrder } =
    query;
  const skip = (page - 1) * limit;

  const where: Prisma.BookingWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  if (device) where.device = device;
  if (serviceLocation) where.serviceLocation = serviceLocation;

  const [items, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.booking.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getBookingById(id: string) {
  return prisma.booking.findUnique({ where: { id } });
}

export async function updateBooking(
  id: string,
  data: Partial<Omit<Booking, "id" | "createdAt" | "updatedAt">>,
) {
  return prisma.booking.update({ where: { id }, data });
}

export async function deleteBooking(id: string) {
  return prisma.booking.delete({ where: { id } });
}

export async function getAllBookingsForExport(filters: {
  search?: string;
  device?: string;
  serviceLocation?: string;
}) {
  const where: Prisma.BookingWhereInput = {};

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { phone: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.device) where.device = filters.device;
  if (filters.serviceLocation) where.serviceLocation = filters.serviceLocation;

  return prisma.booking.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDaysToDateString(dateStr: string, days: number) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);

  date.setDate(date.getDate() + days);

  return getLocalDateString(date);
}

const bookingSummarySelect = {
  id: true,
  name: true,
  phone: true,
  email: true,
  device: true,
  serviceLocation: true,
  streetAddress: true,
  city: true,
  preferredDate: true,
  preferredTime: true,
  issue: true,
  createdAt: true,
} as const;

function withPercent<T extends { count: number }>(
  rows: T[],
  total: number,
): (T & { percent: number })[] {
  return rows.map((row) => ({
    ...row,
    percent: total > 0 ? Math.round((row.count / total) * 100) : 0,
  }));
}

export async function getDashboardStats() {
  const now = new Date();
  const todayStart = new Date(now);

  todayStart.setHours(0, 0, 0, 0);

  const weekStart = new Date(todayStart);

  weekStart.setDate(weekStart.getDate() - 7);

  const todayStr = getLocalDateString(todayStart);
  const weekEndStr = addDaysToDateString(todayStr, 7);

  const needsSchedulingWhere: Prisma.BookingWhereInput = {
    OR: [{ preferredDate: "" }, { preferredTime: "" }],
  };

  const [
    totalBookings,
    newToday,
    newThisWeek,
    scheduledToday,
    needsScheduling,
    onSiteToday,
    inStoreToday,
    todaysSchedule,
    upcomingWeek,
    needsAttention,
    deviceStatsRaw,
    locationStatsRaw,
    popularTimeSlotsRaw,
    recentBookings,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.booking.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.booking.count({ where: { preferredDate: todayStr } }),
    prisma.booking.count({ where: needsSchedulingWhere }),
    prisma.booking.count({
      where: {
        preferredDate: todayStr,
        serviceLocation: "come-to-me",
      },
    }),
    prisma.booking.count({
      where: {
        preferredDate: todayStr,
        serviceLocation: "store",
      },
    }),
    prisma.booking.findMany({
      where: { preferredDate: todayStr },
      orderBy: [{ preferredTime: "asc" }, { createdAt: "desc" }],
      select: bookingSummarySelect,
    }),
    prisma.booking.findMany({
      where: {
        preferredDate: {
          gt: todayStr,
          lte: weekEndStr,
          not: "",
        },
      },
      orderBy: [{ preferredDate: "asc" }, { preferredTime: "asc" }],
      take: 8,
      select: bookingSummarySelect,
    }),
    prisma.booking.findMany({
      where: needsSchedulingWhere,
      orderBy: { createdAt: "desc" },
      take: 5,
      select: bookingSummarySelect,
    }),
    prisma.booking.groupBy({
      by: ["device"],
      _count: { device: true },
      orderBy: { _count: { device: "desc" } },
    }),
    prisma.booking.groupBy({
      by: ["serviceLocation"],
      _count: { serviceLocation: true },
    }),
    prisma.booking.groupBy({
      by: ["preferredTime"],
      where: { preferredTime: { not: "" } },
      _count: { preferredTime: true },
      orderBy: { _count: { preferredTime: "desc" } },
      take: 5,
    }),
    prisma.booking.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      select: bookingSummarySelect,
    }),
  ]);

  const deviceStats = withPercent(
    deviceStatsRaw.map((row) => ({
      device: row.device,
      count: row._count.device,
    })),
    totalBookings,
  );

  const locationStats = withPercent(
    locationStatsRaw.map((row) => ({
      serviceLocation: row.serviceLocation,
      count: row._count.serviceLocation,
    })),
    totalBookings,
  );

  const popularTimeSlots = popularTimeSlotsRaw.map((row) => ({
    time: row.preferredTime,
    count: row._count.preferredTime,
  }));

  return {
    todayLabel: todayStr,
    kpis: {
      totalBookings,
      newToday,
      newThisWeek,
      scheduledToday,
      needsScheduling,
      onSiteToday,
      inStoreToday,
    },
    todaysSchedule,
    upcomingWeek,
    needsAttention,
    deviceStats,
    locationStats,
    popularTimeSlots,
    recentBookings,
  };
}
