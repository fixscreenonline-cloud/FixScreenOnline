"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

import { adminFetch, setCsrfToken } from "@/lib/admin/api-client";
import type { BookingPayload } from "@/lib/validations/booking";

export type Booking = {
  id: string;
  name: string;
  phone: string;
  email: string;
  device: string;
  serviceLocation: string;
  streetAddress: string;
  city: string;
  zip: string;
  preferredDate: string;
  preferredTime: string;
  issue: string;
  createdAt: string;
  updatedAt: string;
};

export function AdminProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30_000, retry: 1 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}

export function useAdminSession() {
  return useQuery({
    queryKey: ["admin-session"],
    queryFn: async () => {
      const res = await fetch("/api/admin/auth/session");

      if (!res.ok) return null;

      const data = await res.json();

      if (data.csrfToken) setCsrfToken(data.csrfToken);

      return data;
    },
    retry: false,
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/dashboard/stats");

      if (!res.ok) throw new Error("Failed to load dashboard");

      return res.json();
    },
  });
}

export function useBookings(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);

  return useQuery({
    queryKey: ["bookings", params],
    queryFn: async () => {
      const res = await adminFetch(`/api/admin/bookings?${searchParams}`);

      if (!res.ok) throw new Error("Failed to load bookings");

      return res.json() as Promise<{
        items: Booking[];
        total: number;
        page: number;
        totalPages: number;
      }>;
    },
  });
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BookingPayload }) => {
      const res = await adminFetch(`/api/admin/bookings/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update booking");

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/bookings/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete booking");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}
