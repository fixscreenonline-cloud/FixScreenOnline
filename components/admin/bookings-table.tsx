"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Car,
  Download,
  Eye,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Search,
  Store,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";

import {
  useBookings,
  useDeleteBooking,
  useUpdateBooking,
  type Booking,
} from "@/components/admin/admin-query-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DEVICE_TYPES, SERVICE_LOCATIONS, TIME_SLOTS } from "@/lib/auth/constants";
import type { BookingPayload } from "@/lib/validations/booking";

const inputClassName =
  "mt-1.5 flex h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

const selectClassName =
  "mt-1.5 flex h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

function formatLocation(value: string) {
  return value === "store" ? "In-Store" : "On-Site";
}

function formatDevice(device: string) {
  return device.replace("-", " ");
}

function formatTimeLabel(time: string) {
  if (!time) return "—";
  const [hourStr, minuteStr] = time.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minuteStr} ${period}`;
}

function needsScheduling(booking: Booking) {
  return !booking.preferredDate || !booking.preferredTime;
}

function StatusBadge({ booking }: { booking: Booking }) {
  if (needsScheduling(booking)) {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
        Needs schedule
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
      Scheduled
    </span>
  );
}

function LocationIcon({ location }: { location: string }) {
  return location === "come-to-me" ? (
    <Car className="h-3.5 w-3.5 text-violet-600" />
  ) : (
    <Store className="h-3.5 w-3.5 text-violet-600" />
  );
}

function BookingActions({
  onView,
  onEdit,
  onDelete,
  compact,
}: {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex gap-1.5">
        <button
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition hover:border-violet-300 hover:text-violet-600"
          type="button"
          onClick={onView}
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
        <button
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition hover:border-violet-300 hover:text-violet-600"
          type="button"
          onClick={onEdit}
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/30"
          type="button"
          onClick={onDelete}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button className="h-9 flex-1 text-xs" size="sm" variant="outline" onClick={onView}>
        <Eye className="mr-1.5 h-3.5 w-3.5" />
        View
      </Button>
      <Button className="h-9 flex-1 text-xs" size="sm" variant="outline" onClick={onEdit}>
        <Pencil className="mr-1.5 h-3.5 w-3.5" />
        Edit
      </Button>
      <Button
        className="h-9 px-3 text-xs"
        size="sm"
        variant="outline"
        onClick={onDelete}
      >
        <Trash2 className="h-3.5 w-3.5 text-destructive" />
      </Button>
    </div>
  );
}

function BookingMobileCard({
  booking,
  onView,
  onEdit,
  onDelete,
}: {
  booking: Booking;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const onSite = booking.serviceLocation === "come-to-me";

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm">
      <div className="border-b border-border/40 bg-muted/30 px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold">{booking.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(booking.createdAt), { addSuffix: true })}
            </p>
          </div>
          <StatusBadge booking={booking} />
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="capitalize" variant="secondary">
            {formatDevice(booking.device)}
          </Badge>
          <Badge className="gap-1 capitalize" variant="outline">
            <LocationIcon location={booking.serviceLocation} />
            {formatLocation(booking.serviceLocation)}
          </Badge>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">{booking.issue}</p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-muted/40 px-3 py-2">
            <p className="text-muted-foreground">Date</p>
            <p className="mt-0.5 font-medium">
              {booking.preferredDate || "Not set"}
            </p>
          </div>
          <div className="rounded-lg bg-muted/40 px-3 py-2">
            <p className="text-muted-foreground">Time</p>
            <p className="mt-0.5 font-medium">
              {formatTimeLabel(booking.preferredTime)}
            </p>
          </div>
        </div>

        {onSite && booking.city && (
          <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-600" />
            <span>
              {booking.streetAddress ? `${booking.streetAddress}, ` : ""}
              {booking.city}
              {booking.zip ? ` ${booking.zip}` : ""}
            </span>
          </p>
        )}

        <div className="flex gap-2">
          <a
            className="inline-flex h-9 flex-1 items-center justify-center rounded-lg bg-violet-600 text-xs font-medium text-white shadow-sm"
            href={`tel:${booking.phone}`}
          >
            <Phone className="mr-1.5 h-3.5 w-3.5" />
            Call
          </a>
          {booking.email && (
            <a
              className="inline-flex h-9 items-center justify-center rounded-lg border px-3 text-xs font-medium"
              href={`mailto:${booking.email}`}
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        <BookingActions compact onDelete={onDelete} onEdit={onEdit} onView={onView} />
      </div>
    </div>
  );
}

function BookingDetail({ booking }: { booking: Booking }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <a
          className="inline-flex h-9 items-center rounded-lg bg-violet-600 px-4 text-sm font-medium text-white"
          href={`tel:${booking.phone}`}
        >
          <Phone className="mr-2 h-4 w-4" />
          {booking.phone}
        </a>
        {booking.email && (
          <a
            className="inline-flex h-9 items-center rounded-lg border px-4 text-sm font-medium"
            href={`mailto:${booking.email}`}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email
          </a>
        )}
        <StatusBadge booking={booking} />
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Issue
        </p>
        <p className="mt-1.5 text-sm leading-relaxed">{booking.issue}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["Device", formatDevice(booking.device)],
          ["Service", formatLocation(booking.serviceLocation)],
          ["Preferred Date", booking.preferredDate || "—"],
          ["Preferred Time", formatTimeLabel(booking.preferredTime)],
          ["Street", booking.streetAddress || "—"],
          ["City", booking.city || "—"],
          ["ZIP", booking.zip || "—"],
          ["Submitted", format(new Date(booking.createdAt), "PPpp")],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-muted/30 px-3 py-2.5">
            <p className="text-[11px] font-medium uppercase text-muted-foreground">
              {label}
            </p>
            <p className="mt-0.5 text-sm font-medium capitalize">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyBookings({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/10 px-6 py-14 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/15">
        <Calendar className="h-6 w-6" />
      </div>
      <p className="font-semibold">
        {hasFilters ? "No bookings match your filters" : "No bookings yet"}
      </p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {hasFilters
          ? "Try clearing filters or searching with a different name or phone number."
          : "Customer quote requests from your website will appear here."}
      </p>
    </div>
  );
}

export function BookingsTable() {
  const [search, setSearch] = useState("");
  const [device, setDevice] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");
  const [page, setPage] = useState(1);
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<BookingPayload | null>(null);

  const hasFilters = Boolean(search || device || serviceLocation);

  const params = useMemo(
    () => ({
      page: String(page),
      limit: "20",
      ...(search ? { search } : {}),
      ...(device ? { device } : {}),
      ...(serviceLocation ? { serviceLocation } : {}),
      sortBy: "createdAt",
      sortOrder: "desc",
    }),
    [page, search, device, serviceLocation],
  );

  const { data, isLoading, refetch } = useBookings(params);
  const updateBooking = useUpdateBooking();
  const deleteBooking = useDeleteBooking();

  useEffect(() => {
    if (editBooking) {
      setForm({
        name: editBooking.name,
        email: editBooking.email,
        phone: editBooking.phone,
        device: editBooking.device as BookingPayload["device"],
        serviceLocation:
          editBooking.serviceLocation as BookingPayload["serviceLocation"],
        streetAddress: editBooking.streetAddress,
        city: editBooking.city,
        zip: editBooking.zip,
        preferredDate: editBooking.preferredDate,
        preferredTime: editBooking.preferredTime,
        issue: editBooking.issue,
      });
    }
  }, [editBooking]);

  function clearFilters() {
    setSearch("");
    setDevice("");
    setServiceLocation("");
    setPage(1);
  }

  async function handleExport(exportFormat: "csv" | "xlsx") {
    const query = new URLSearchParams({
      format: exportFormat,
      ...(search ? { search } : {}),
      ...(device ? { device } : {}),
      ...(serviceLocation ? { serviceLocation } : {}),
    });

    window.open(`/api/admin/bookings/export?${query}`, "_blank");
  }

  async function handleSave() {
    if (!editBooking || !form) return;

    try {
      await updateBooking.mutateAsync({ id: editBooking.id, data: form });
      toast.success("Booking updated");
      setEditBooking(null);
    } catch {
      toast.error("Failed to update booking");
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    try {
      await deleteBooking.mutateAsync(deleteId);
      toast.success("Booking deleted");
      setDeleteId(null);
      refetch();
    } catch {
      toast.error("Failed to delete booking");
    }
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="rounded-2xl border border-border/60 bg-background p-4 shadow-sm lg:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-sm font-semibold">Find bookings</p>
              <p className="text-xs text-muted-foreground">
                Search by customer name, phone, or email
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className="flex h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                placeholder="Search name, phone, email..."
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:max-w-md">
              <select
                className={selectClassName.replace("mt-1.5 ", "")}
                value={device}
                onChange={(e) => {
                  setPage(1);
                  setDevice(e.target.value);
                }}
              >
                <option value="">All devices</option>
                {DEVICE_TYPES.map((value) => (
                  <option key={value} value={value}>
                    {formatDevice(value)}
                  </option>
                ))}
              </select>
              <select
                className={selectClassName.replace("mt-1.5 ", "")}
                value={serviceLocation}
                onChange={(e) => {
                  setPage(1);
                  setServiceLocation(e.target.value);
                }}
              >
                <option value="">All services</option>
                {SERVICE_LOCATIONS.map((value) => (
                  <option key={value} value={value}>
                    {formatLocation(value)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
            <Button
              className="h-10 flex-1 bg-violet-600 text-white hover:bg-violet-700 sm:flex-none"
              onClick={() => handleExport("csv")}
            >
              <Download className="mr-1.5 h-4 w-4" />
              Export CSV
            </Button>
            <Button
              className="h-10 flex-1 sm:flex-none"
              variant="outline"
              onClick={() => handleExport("xlsx")}
            >
              <Download className="mr-1.5 h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </div>

        {(hasFilters || (data && data.total > 0)) && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/40 pt-4">
            <span className="text-xs text-muted-foreground">
              {isLoading
                ? "Loading..."
                : `${data?.items.length ?? 0} shown · ${data?.total ?? 0} total`}
            </span>
            {search && (
              <Badge className="gap-1 pr-1" variant="secondary">
                “{search}”
                <button type="button" onClick={() => setSearch("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {device && (
              <Badge className="gap-1 pr-1 capitalize" variant="secondary">
                {formatDevice(device)}
                <button type="button" onClick={() => setDevice("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {serviceLocation && (
              <Badge className="gap-1 pr-1" variant="secondary">
                {formatLocation(serviceLocation)}
                <button type="button" onClick={() => setServiceLocation("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {hasFilters && (
              <button
                className="text-xs font-medium text-violet-600 hover:underline"
                type="button"
                onClick={clearFilters}
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-52 rounded-2xl" />
          ))
        ) : (data?.items ?? []).length === 0 ? (
          <EmptyBookings hasFilters={hasFilters} />
        ) : (
          (data?.items ?? []).map((booking) => (
            <BookingMobileCard
              key={booking.id}
              booking={booking}
              onDelete={() => setDeleteId(booking.id)}
              onEdit={() => setEditBooking(booking)}
              onView={() => setViewBooking(booking)}
            />
          ))
        )}
      </div>

      {/* Desktop table */}
      <Card className="hidden overflow-hidden border-border/60 shadow-sm lg:block">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg" />
              ))}
            </div>
          ) : (data?.items ?? []).length === 0 ? (
            <div className="p-6">
              <EmptyBookings hasFilters={hasFilters} />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Customer</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Appointment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data?.items ?? []).map((booking) => (
                  <TableRow key={booking.id} className="group">
                    <TableCell>
                      <div>
                        <p className="font-semibold">{booking.name}</p>
                        <a
                          className="text-xs text-violet-600 hover:underline"
                          href={`tel:${booking.phone}`}
                        >
                          {booking.phone}
                        </a>
                        {booking.email && (
                          <p className="truncate text-xs text-muted-foreground">
                            {booking.email}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="capitalize" variant="secondary">
                        {formatDevice(booking.device)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-sm">
                        <LocationIcon location={booking.serviceLocation} />
                        {formatLocation(booking.serviceLocation)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">
                        {booking.preferredDate || "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimeLabel(booking.preferredTime)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <StatusBadge booking={booking} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(booking.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <BookingActions
                        compact
                        onDelete={() => setDeleteId(booking.id)}
                        onEdit={() => setEditBooking(booking)}
                        onView={() => setViewBooking(booking)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background p-3 sm:flex-row lg:border-0 lg:bg-transparent lg:p-0">
          <p className="text-sm text-muted-foreground">
            Page <span className="font-medium text-foreground">{data.page}</span> of{" "}
            {data.totalPages}
          </p>
          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              className="h-10 flex-1 sm:flex-none"
              disabled={page <= 1}
              variant="outline"
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              className="h-10 flex-1 sm:flex-none"
              disabled={page >= data.totalPages}
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* View dialog */}
      <Dialog open={!!viewBooking} onOpenChange={() => setViewBooking(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{viewBooking?.name}</DialogTitle>
            <DialogDescription>Customer booking details</DialogDescription>
          </DialogHeader>
          {viewBooking && <BookingDetail booking={viewBooking} />}
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editBooking} onOpenChange={() => setEditBooking(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>Update customer and appointment info</DialogDescription>
          </DialogHeader>
          {form && (
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["name", "Name"],
                  ["phone", "Phone"],
                  ["email", "Email"],
                  ["streetAddress", "Street Address"],
                  ["city", "City"],
                  ["zip", "ZIP"],
                  ["preferredDate", "Preferred Date"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <Label htmlFor={key}>{label}</Label>
                  <input
                    className={inputClassName}
                    id={key}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                </div>
              ))}
              <div>
                <Label htmlFor="device-edit">Device</Label>
                <select
                  className={selectClassName}
                  id="device-edit"
                  value={form.device}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      device: e.target.value as BookingPayload["device"],
                    })
                  }
                >
                  {DEVICE_TYPES.map((value) => (
                    <option key={value} value={value}>
                      {formatDevice(value)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="location-edit">Service Location</Label>
                <select
                  className={selectClassName}
                  id="location-edit"
                  value={form.serviceLocation}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      serviceLocation: e.target
                        .value as BookingPayload["serviceLocation"],
                    })
                  }
                >
                  {SERVICE_LOCATIONS.map((value) => (
                    <option key={value} value={value}>
                      {formatLocation(value)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="time-edit">Preferred Time</Label>
                <select
                  className={selectClassName}
                  id="time-edit"
                  value={form.preferredTime}
                  onChange={(e) =>
                    setForm({ ...form, preferredTime: e.target.value })
                  }
                >
                  <option value="">Select time</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {formatTimeLabel(slot)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="issue">Issue Description</Label>
                <textarea
                  className={`${inputClassName} min-h-28 py-2`}
                  id="issue"
                  value={form.issue}
                  onChange={(e) => setForm({ ...form, issue: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <Button
                  className="h-11 w-full bg-violet-600 text-white hover:bg-violet-700 sm:w-auto"
                  disabled={updateBooking.isPending}
                  onClick={handleSave}
                >
                  {updateBooking.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete booking?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The booking record will be permanently
              removed.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button className="h-10" variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              className="h-10"
              disabled={deleteBooking.isPending}
              variant="destructive"
              onClick={handleDelete}
            >
              {deleteBooking.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
