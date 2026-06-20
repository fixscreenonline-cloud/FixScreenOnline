"use client";

import { BookingWizard } from "@/components/booking-wizard";
import type { BookingFormData } from "@/components/booking-modal";
import type { ServiceChoiceCopy } from "@/components/service-choice-section";
import type { DeviceOption } from "@/lib/i18n/types";

export interface ServiceQuoteCopy extends ServiceChoiceCopy {
  eyebrow: string;
  title: string;
  heading: string;
  stepLabels: [string, string, string, string];
  nextBtn: string;
  backBtn: string;
  changeService: string;
  locationLabel: string;
  fillFields: string;
  successTitle: string;
  successBody: string;
  validation: {
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
}

interface ServiceQuoteFormCopy {
  fullName: string;
  fullNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  deviceType: string;
  devicePlaceholder: string;
  streetAddress: string;
  streetAddressPlaceholder: string;
  city: string;
  cityPlaceholder: string;
  zip: string;
  zipPlaceholder: string;
  preferredDate: string;
  preferredTime: string;
  preferredTimePlaceholder: string;
  issueDescription: string;
  issuePlaceholder: string;
  submit: string;
  submitting: string;
}

interface ServiceQuoteBlockProps {
  copy: ServiceQuoteCopy;
  form: ServiceQuoteFormCopy;
  devices: DeviceOption[];
  compact?: boolean;
  onSubmit: (data: BookingFormData) => Promise<boolean>;
}

export function ServiceQuoteBlock({
  copy,
  form,
  devices,
  compact = false,
  onSubmit,
}: ServiceQuoteBlockProps) {
  return (
    <div className={compact ? "space-y-3" : "space-y-6"}>
      <div className="text-center">
        {compact ? (
          <>
            <h2 className="text-lg font-bold text-gray-900">{copy.title}</h2>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-violet-600 sm:text-xs">
              {copy.heading}
            </p>
          </>
        ) : (
          <>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              {copy.eyebrow}
            </p>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              {copy.title}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
              {copy.heading}
            </p>
          </>
        )}
      </div>

      <BookingWizard
        compact={compact}
        copy={copy}
        devices={devices}
        form={form}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export function resolveQuoteHash(): string {
  if (typeof window === "undefined") return "#quote";

  return window.matchMedia("(max-width: 1023px)").matches
    ? "#quote-mobile"
    : "#quote";
}
