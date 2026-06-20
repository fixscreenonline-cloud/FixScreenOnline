"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CalendarClock,
  Car,
  Clock,
  Download,
  Phone,
  Store,
  TrendingUp,
  UserPlus,
  Wrench,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { useDashboardStats } from "@/components/admin/admin-query-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type BookingSummary = {
  id: string;
  name: string;
  phone: string;
  email: string;
  device: string;
  serviceLocation: string;
  streetAddress: string;
  city: string;
  preferredDate: string;
  preferredTime: string;
  issue: string;
  createdAt: string;
};

function formatLocation(value: string) {
  return value === "store" ? "In-Store" : "On-Site";
}

function formatTimeLabel(time: string) {
  if (!time) return "Time TBD";

  const [hourStr, minuteStr] = time.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minuteStr} ${period}`;
}

function formatDevice(device: string) {
  return device.replace("-", " ");
}

function StatBar({
  label,
  count,
  percent,
  color = "bg-violet-600",
}: {
  label: string;
  count: number;
  percent: number;
  color?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="capitalize">{label}</span>
        <span className="font-semibold tabular-nums">
          {count} <span className="text-muted-foreground">({percent}%)</span>
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${Math.max(percent, 4)}%` }}
        />
      </div>
    </div>
  );
}

function AppointmentRow({ booking }: { booking: BookingSummary }) {
  const isOnSite = booking.serviceLocation === "come-to-me";

  return (
    <div className="flex gap-3 rounded-xl border border-border/60 bg-background p-3">
      <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-violet-50 px-1 py-2 text-center dark:bg-violet-500/10">
        <span className="text-xs font-bold text-violet-700 dark:text-violet-300">
          {booking.preferredTime ? formatTimeLabel(booking.preferredTime).split(" ")[0] : "—"}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {booking.preferredTime
            ? formatTimeLabel(booking.preferredTime).split(" ")[1]
            : "TBD"}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-semibold">{booking.name}</p>
            <p className="truncate text-xs text-muted-foreground capitalize">
              {formatDevice(booking.device)} · {formatLocation(booking.serviceLocation)}
            </p>
          </div>
          {isOnSite ? (
            <Car className="h-4 w-4 shrink-0 text-violet-600" />
          ) : (
            <Store className="h-4 w-4 shrink-0 text-violet-600" />
          )}
        </div>

        {isOnSite && booking.city && (
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {booking.streetAddress ? `${booking.streetAddress}, ` : ""}
            {booking.city}
          </p>
        )}

        <div className="mt-2 flex gap-2">
          <a
            className="inline-flex h-8 items-center rounded-md bg-violet-600 px-2.5 text-xs font-medium text-white"
            href={`tel:${booking.phone}`}
          >
            <Phone className="mr-1 h-3 w-3" />
            Call
          </a>
          <Link
            className="inline-flex h-8 items-center rounded-md border px-2.5 text-xs font-medium"
            href="/admin/bookings"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border/80 px-4 py-8 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}

export function DashboardStats() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  const kpis = data?.kpis;

  const kpiCards = [
    {
      label: "New Today",
      value: kpis?.newToday ?? 0,
      hint: "Requests received today",
      icon: UserPlus,
      accent: "text-emerald-600",
    },
    {
      label: "Scheduled Today",
      value: kpis?.scheduledToday ?? 0,
      hint: `${kpis?.onSiteToday ?? 0} on-site · ${kpis?.inStoreToday ?? 0} in-store`,
      icon: CalendarClock,
      accent: "text-violet-600",
    },
    {
      label: "This Week",
      value: kpis?.newThisWeek ?? 0,
      hint: "New requests (7 days)",
      icon: TrendingUp,
      accent: "text-blue-600",
    },
    {
      label: "Needs Scheduling",
      value: kpis?.needsScheduling ?? 0,
      hint: "Missing date or time",
      icon: AlertCircle,
      accent: kpis?.needsScheduling ? "text-amber-600" : "text-muted-foreground",
    },
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        <Button asChild className="h-9 bg-violet-600 text-white hover:bg-violet-700" size="sm">
          <Link href="/admin/bookings">
            View All Bookings
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild className="h-9" size="sm" variant="outline">
          <a href="/api/admin/bookings/export?format=csv" target="_blank">
            <Download className="mr-1.5 h-4 w-4" />
            Export CSV
          </a>
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.label} className="border-border/60 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-muted-foreground lg:text-xs">
                      {card.label}
                    </p>
                    <p className="mt-1 text-2xl font-bold tabular-nums lg:text-3xl">
                      {card.value}
                    </p>
                    <p className="mt-1 line-clamp-2 text-[10px] text-muted-foreground lg:text-xs">
                      {card.hint}
                    </p>
                  </div>
                  <Icon className={`h-5 w-5 shrink-0 ${card.accent}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Needs attention alert */}
      {(kpis?.needsScheduling ?? 0) > 0 && (
        <Card className="border-amber-200 bg-amber-50/80 shadow-sm dark:border-amber-900/40 dark:bg-amber-950/20">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-amber-900 dark:text-amber-200">
                {kpis?.needsScheduling} booking{kpis?.needsScheduling === 1 ? "" : "s"} need scheduling
              </p>
              <p className="mt-0.5 text-sm text-amber-800/80 dark:text-amber-300/80">
                These customers submitted a request but haven&apos;t picked a date or time yet.
                Follow up by phone to confirm their appointment.
              </p>
            </div>
            <Button asChild className="hidden shrink-0 sm:inline-flex" size="sm" variant="outline">
              <Link href="/admin/bookings">Review</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-5 lg:gap-6">
        {/* Today's schedule — most useful */}
        <Card className="border-border/60 shadow-sm lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2 lg:p-6">
            <div>
              <CardTitle className="text-sm lg:text-base">Today&apos;s Schedule</CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Appointments for {data?.todayLabel}
              </p>
            </div>
            <Badge variant="secondary">{data?.todaysSchedule?.length ?? 0} jobs</Badge>
          </CardHeader>
          <CardContent className="space-y-2 p-4 pt-0 lg:space-y-3 lg:p-6 lg:pt-0">
            {(data?.todaysSchedule ?? []).length === 0 ? (
              <EmptyState message="No appointments scheduled for today. Check new requests below." />
            ) : (
              (data?.todaysSchedule ?? []).map((booking: BookingSummary) => (
                <AppointmentRow key={booking.id} booking={booking} />
              ))
            )}
          </CardContent>
        </Card>

        {/* Upcoming week */}
        <Card className="border-border/60 shadow-sm lg:col-span-2">
          <CardHeader className="p-4 pb-2 lg:p-6">
            <CardTitle className="text-sm lg:text-base">Next 7 Days</CardTitle>
            <p className="mt-0.5 text-xs text-muted-foreground">Upcoming appointments</p>
          </CardHeader>
          <CardContent className="space-y-2 p-4 pt-0 lg:p-6 lg:pt-0">
            {(data?.upcomingWeek ?? []).length === 0 ? (
              <EmptyState message="No upcoming appointments this week." />
            ) : (
              (data?.upcomingWeek ?? []).map((booking: BookingSummary) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{booking.name}</p>
                    <p className="text-xs capitalize text-muted-foreground">
                      {formatDevice(booking.device)}
                    </p>
                  </div>
                  <div className="shrink-0 text-right text-xs">
                    <p className="font-medium">{booking.preferredDate}</p>
                    <p className="text-muted-foreground">
                      {formatTimeLabel(booking.preferredTime)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        {/* Device breakdown */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="p-4 pb-2 lg:p-6">
            <CardTitle className="flex items-center gap-2 text-sm lg:text-base">
              <Wrench className="h-4 w-4 text-violet-600" />
              Devices Repaired
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-0 lg:p-6 lg:pt-0">
            {(data?.deviceStats ?? []).length === 0 ? (
              <EmptyState message="No device data yet." />
            ) : (
              (data?.deviceStats ?? []).map(
                (row: { device: string; count: number; percent: number }) => (
                  <StatBar
                    key={row.device}
                    count={row.count}
                    label={formatDevice(row.device)}
                    percent={row.percent}
                  />
                ),
              )
            )}
          </CardContent>
        </Card>

        {/* Service location split */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="p-4 pb-2 lg:p-6">
            <CardTitle className="text-sm lg:text-base">Service Type Split</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-0 lg:p-6 lg:pt-0">
            {(data?.locationStats ?? []).length === 0 ? (
              <EmptyState message="No service data yet." />
            ) : (
              (data?.locationStats ?? []).map(
                (row: { serviceLocation: string; count: number; percent: number }) => (
                  <StatBar
                    key={row.serviceLocation}
                    color={
                      row.serviceLocation === "come-to-me"
                        ? "bg-purple-600"
                        : "bg-violet-600"
                    }
                    count={row.count}
                    label={formatLocation(row.serviceLocation)}
                    percent={row.percent}
                  />
                ),
              )
            )}
          </CardContent>
        </Card>

        {/* Popular times */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="p-4 pb-2 lg:p-6">
            <CardTitle className="flex items-center gap-2 text-sm lg:text-base">
              <Clock className="h-4 w-4 text-violet-600" />
              Popular Time Slots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-4 pt-0 lg:p-6 lg:pt-0">
            {(data?.popularTimeSlots ?? []).length === 0 ? (
              <EmptyState message="Not enough booking data yet." />
            ) : (
              (data?.popularTimeSlots ?? []).map(
                (row: { time: string; count: number }) => (
                  <div
                    key={row.time}
                    className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm"
                  >
                    <span>{formatTimeLabel(row.time)}</span>
                    <Badge variant="secondary">{row.count} bookings</Badge>
                  </div>
                ),
              )
            )}
          </CardContent>
        </Card>
      </div>

      {/* Latest requests */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 lg:p-6">
          <div>
            <CardTitle className="text-sm lg:text-base">Latest Requests</CardTitle>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {kpis?.totalBookings ?? 0} total · respond within 15 minutes
            </p>
          </div>
          <Button asChild className="h-8" size="sm" variant="ghost">
            <Link href="/admin/bookings">See all</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 p-4 pt-0 lg:space-y-3 lg:p-6 lg:pt-0">
          {(data?.recentBookings ?? []).length === 0 ? (
            <EmptyState message="No bookings yet. They'll appear here when customers submit the quote form." />
          ) : (
            (data?.recentBookings ?? []).map((booking: BookingSummary) => (
              <div
                key={booking.id}
                className="rounded-xl border border-border/60 bg-background p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{booking.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(booking.createdAt), {
                        addSuffix: true,
                      })}
                      {" · "}
                      <span className="capitalize">{formatDevice(booking.device)}</span>
                      {" · "}
                      {formatLocation(booking.serviceLocation)}
                    </p>
                  </div>
                  <a
                    className="inline-flex h-8 shrink-0 items-center rounded-md border px-2.5 text-xs font-medium"
                    href={`tel:${booking.phone}`}
                  >
                    <Phone className="mr-1 h-3 w-3" />
                    Call
                  </a>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {booking.issue}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
