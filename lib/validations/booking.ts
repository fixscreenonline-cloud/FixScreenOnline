import { z } from "zod";

import { DEVICE_TYPES, SERVICE_LOCATIONS, TIME_SLOTS } from "@/lib/auth/constants";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const totpVerifySchema = z.object({
  token: z.string().min(6).max(8),
});

export const recoveryCodeSchema = z.object({
  recoveryCode: z.string().min(8),
});

const phonePattern = /^[\d+\-().\s]+$/;

function countDigits(value: string) {
  return value.replace(/\D/g, "").length;
}

/** Public website quote form — strict validation */
export const publicBookingPayloadSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .regex(/^[a-zA-Z\s.'-]+$/),
    email: z.string().trim().email(),
    phone: z
      .string()
      .trim()
      .regex(phonePattern)
      .refine((v) => countDigits(v) >= 10 && countDigits(v) <= 15),
    device: z.enum(DEVICE_TYPES),
    serviceLocation: z.enum(SERVICE_LOCATIONS),
    streetAddress: z.string(),
    city: z.string(),
    zip: z.string(),
    preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    preferredTime: z
      .string()
      .min(1)
      .refine((value) => TIME_SLOTS.includes(value)),
    issue: z.string().trim().min(10).max(2000),
  })
  .superRefine((data, ctx) => {
    if (data.serviceLocation !== "come-to-me") return;

    if (data.streetAddress.trim().length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Street address is required",
        path: ["streetAddress"],
      });
    }

    if (data.city.trim().length < 2 || !/^[a-zA-Z\s.'-]+$/.test(data.city.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valid city is required",
        path: ["city"],
      });
    }

    if (!/^\d{5}$/.test(data.zip.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valid 5-digit ZIP code is required",
        path: ["zip"],
      });
    }
  });

/** Admin create/update — email optional */
export const bookingPayloadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.union([z.string().trim().email(), z.literal("")]).default(""),
  phone: z
    .string()
    .trim()
    .regex(phonePattern)
    .refine((v) => countDigits(v) >= 10 && countDigits(v) <= 15),
  device: z.enum(DEVICE_TYPES),
  serviceLocation: z.enum(SERVICE_LOCATIONS),
  streetAddress: z.string().optional().default(""),
  city: z.string().optional().default(""),
  zip: z.string().optional().default(""),
  preferredDate: z.string().optional().default(""),
  preferredTime: z.string().optional().default(""),
  issue: z.string().trim().min(10).max(2000),
});

export const bookingUpdateSchema = bookingPayloadSchema;

export const bookingQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  device: z.enum(DEVICE_TYPES).optional(),
  serviceLocation: z.enum(SERVICE_LOCATIONS).optional(),
  sortBy: z.enum(["createdAt", "preferredDate", "name"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type BookingPayload = z.infer<typeof bookingPayloadSchema>;
export type PublicBookingPayload = z.infer<typeof publicBookingPayloadSchema>;
export type BookingQuery = z.infer<typeof bookingQuerySchema>;
