import { z } from "zod";

import { DEVICE_TYPES, SERVICE_LOCATIONS, TIME_SLOTS } from "@/lib/auth/constants";

export type BookingValidationMessages = {
  nameRequired: string;
  nameInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
  emailRequired: string;
  emailInvalid: string;
  deviceRequired: string;
  serviceRequired: string;
  streetRequired: string;
  cityRequired: string;
  cityInvalid: string;
  zipRequired: string;
  zipInvalid: string;
  dateRequired: string;
  timeRequired: string;
  issueRequired: string;
  issueMin: string;
};

export function sanitizePhoneInput(value: string): string {
  return value.replace(/[^\d+\-().\s]/g, "");
}

export function sanitizeZipInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, 5);
}

export function sanitizeCityInput(value: string): string {
  return value.replace(/[^a-zA-Z\s.'-]/g, "");
}

const phonePattern = /^[\d+\-().\s]+$/;

function countDigits(value: string) {
  return value.replace(/\D/g, "").length;
}

export function buildBookingValidators(messages: BookingValidationMessages) {
  const nameSchema = z
    .string()
    .trim()
    .min(1, messages.nameRequired)
    .min(2, messages.nameInvalid)
    .max(100, messages.nameInvalid)
    .regex(/^[a-zA-Z\s.'-]+$/, messages.nameInvalid);

  const phoneSchema = z
    .string()
    .trim()
    .min(1, messages.phoneRequired)
    .regex(phonePattern, messages.phoneInvalid)
    .refine((value) => countDigits(value) >= 10, messages.phoneInvalid)
    .refine((value) => countDigits(value) <= 15, messages.phoneInvalid);

  const emailSchema = z
    .string()
    .trim()
    .min(1, messages.emailRequired)
    .email(messages.emailInvalid);

  const streetSchema = z
    .string()
    .trim()
    .min(1, messages.streetRequired)
    .min(3, messages.streetRequired);

  const citySchema = z
    .string()
    .trim()
    .min(1, messages.cityRequired)
    .min(2, messages.cityInvalid)
    .regex(/^[a-zA-Z\s.'-]+$/, messages.cityInvalid);

  const zipSchema = z
    .string()
    .trim()
    .min(1, messages.zipRequired)
    .regex(/^\d{5}$/, messages.zipInvalid);

  const issueSchema = z
    .string()
    .trim()
    .min(1, messages.issueRequired)
    .min(10, messages.issueMin);

  const serviceStepSchema = z
    .object({
      serviceLocation: z.enum(SERVICE_LOCATIONS, {
        message: messages.serviceRequired,
      }),
      streetAddress: z.string(),
      city: z.string(),
      zip: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.serviceLocation !== "come-to-me") return;

      const street = streetSchema.safeParse(data.streetAddress);
      if (!street.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: street.error.issues[0]?.message ?? messages.streetRequired,
          path: ["streetAddress"],
        });
      }

      const city = citySchema.safeParse(data.city);
      if (!city.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: city.error.issues[0]?.message ?? messages.cityRequired,
          path: ["city"],
        });
      }

      const zip = zipSchema.safeParse(data.zip);
      if (!zip.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: zip.error.issues[0]?.message ?? messages.zipInvalid,
          path: ["zip"],
        });
      }
    });

  const dateStepSchema = z.object({
    preferredDate: z
      .string()
      .min(1, messages.dateRequired)
      .regex(/^\d{4}-\d{2}-\d{2}$/, messages.dateRequired),
  });

  const timeStepSchema = z.object({
    preferredTime: z
      .string()
      .min(1, messages.timeRequired)
      .refine(
        (value) => TIME_SLOTS.includes(value as (typeof TIME_SLOTS)[number]),
        messages.timeRequired,
      ),
  });

  const detailsStepSchema = z.object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    device: z.enum(DEVICE_TYPES, { message: messages.deviceRequired }),
    issue: issueSchema,
  });

  const publicBookingSchema = z
    .object({
      name: nameSchema,
      phone: phoneSchema,
      email: emailSchema,
      device: z.enum(DEVICE_TYPES, { message: messages.deviceRequired }),
      serviceLocation: z.enum(SERVICE_LOCATIONS, {
        message: messages.serviceRequired,
      }),
      streetAddress: z.string(),
      city: z.string(),
      zip: z.string(),
      preferredDate: z
        .string()
        .min(1, messages.dateRequired)
        .regex(/^\d{4}-\d{2}-\d{2}$/, messages.dateRequired),
      preferredTime: z
        .string()
        .min(1, messages.timeRequired)
        .refine(
          (value) => TIME_SLOTS.includes(value as (typeof TIME_SLOTS)[number]),
          messages.timeRequired,
        ),
      issue: issueSchema,
    })
    .superRefine((data, ctx) => {
      if (data.serviceLocation !== "come-to-me") return;

      for (const [field, schema] of [
        ["streetAddress", streetSchema],
        ["city", citySchema],
        ["zip", zipSchema],
      ] as const) {
        const result = schema.safeParse(data[field]);
        if (!result.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: result.error.issues[0]?.message ?? "Invalid",
            path: [field],
          });
        }
      }
    });

  return {
    serviceStepSchema,
    dateStepSchema,
    timeStepSchema,
    detailsStepSchema,
    publicBookingSchema,
  };
}

export function mapZodFieldErrors(error: z.ZodError): Record<string, string> {
  const mapped: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path[0];

    if (typeof key === "string" && !mapped[key]) {
      mapped[key] = issue.message;
    }
  }

  return mapped;
}

export type BookingStepData = {
  name: string;
  email: string;
  phone: string;
  device: string;
  serviceLocation: string;
  streetAddress: string;
  city: string;
  zip: string;
  preferredDate: string;
  preferredTime: string;
  issue: string;
};

export function validateBookingStep(
  step: number,
  data: BookingStepData,
  messages: BookingValidationMessages,
): { valid: boolean; errors: Record<string, string> } {
  const validators = buildBookingValidators(messages);

  let result:
    | ReturnType<typeof validators.serviceStepSchema.safeParse>
    | ReturnType<typeof validators.dateStepSchema.safeParse>
    | ReturnType<typeof validators.timeStepSchema.safeParse>
    | ReturnType<typeof validators.detailsStepSchema.safeParse>;

  switch (step) {
    case 0:
      result = validators.serviceStepSchema.safeParse(data);
      break;
    case 1:
      result = validators.dateStepSchema.safeParse(data);
      break;
    case 2:
      result = validators.timeStepSchema.safeParse(data);
      break;
    case 3:
      result = validators.detailsStepSchema.safeParse(data);
      break;
    default:
      return { valid: false, errors: {} };
  }

  if (result.success) {
    return { valid: true, errors: {} };
  }

  return { valid: false, errors: mapZodFieldErrors(result.error) };
}
