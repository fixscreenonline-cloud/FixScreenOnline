"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { DatePicker } from "@heroui/date-picker";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { Car, CheckCircle2, MapPin, Store } from "lucide-react";

import type { BookingFormData } from "@/components/booking-modal";
import { ServiceChoiceSection } from "@/components/service-choice-section";
import type { ServiceQuoteCopy } from "@/components/service-quote-block";
import { ServiceAddressFields } from "@/components/service-address-fields";
import type { DeviceOption } from "@/lib/i18n/types";
import {
  sanitizeCityInput,
  sanitizePhoneInput,
  sanitizeZipInput,
  validateBookingStep,
} from "@/lib/validations/booking-form";

interface BookingWizardFormCopy {
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

interface BookingWizardProps {
  copy: ServiceQuoteCopy;
  form: BookingWizardFormCopy;
  devices: DeviceOption[];
  compact?: boolean;
  onSubmit: (data: BookingFormData) => Promise<boolean>;
}

const TIME_SLOTS = Array.from({ length: 12 }, (_, index) => {
  const hour = index + 8;

  return [0, 30].map((minute) => {
    const value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    const label = `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;

    return { value, label };
  });
}).flat();

const inputClassNames = {
  inputWrapper:
    "min-h-11 bg-white border-gray-200 shadow-sm group-data-[focus=true]:border-violet-500 group-data-[focus=true]:ring-2 group-data-[focus=true]:ring-violet-500/20",
  label: "text-gray-600 font-medium text-sm",
};

function stringToDate(value: string): CalendarDate | null {
  if (!value) return null;

  try {
    return parseDate(value);
  } catch {
    return null;
  }
}

function dateToString(value: CalendarDate | null): string {
  return value?.toString() ?? "";
}

const emptyForm: BookingFormData = {
  name: "",
  email: "",
  phone: "",
  device: "",
  serviceLocation: "",
  streetAddress: "",
  city: "",
  zip: "",
  preferredDate: "",
  preferredTime: "",
  issue: "",
};

export function BookingWizard({
  copy,
  form,
  devices,
  compact = false,
  onSubmit,
}: BookingWizardProps) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showStepHint, setShowStepHint] = useState(false);

  const selectedTitle =
    formData.serviceLocation === "come-to-me"
      ? copy.onSiteTitle
      : formData.serviceLocation === "store"
        ? copy.inStoreTitle
        : "";

  const SelectedIcon =
    formData.serviceLocation === "come-to-me" ? Car : Store;

  const hasSelectedService = formData.serviceLocation !== "";

  function clearFieldError(field: string) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  const handleNext = async () => {
    const { valid, errors } = validateBookingStep(step, formData, copy.validation);

    if (!valid) {
      setFieldErrors(errors);
      setShowStepHint(true);
      return;
    }

    setFieldErrors({});
    setShowStepHint(false);

    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }

    setIsSubmitting(true);
    const ok = await onSubmit(formData);
    setIsSubmitting(false);

    if (ok) {
      setIsSuccess(true);
      setFormData(emptyForm);
      setStep(0);
      setTimeout(() => setIsSuccess(false), 7000);
    }
  };

  const selectService = (location: "store" | "come-to-me") => {
    setFormData((prev) => ({
      ...prev,
      serviceLocation: location,
      ...(location === "store"
        ? { streetAddress: "", city: "", zip: "" }
        : {}),
    }));
    setFieldErrors({});
    setShowStepHint(false);
    setStep(0);
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50/80 px-4 py-8 text-center sm:px-6">
        <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-green-600" />
        <h3 className="text-lg font-bold text-gray-900">{copy.successTitle}</h3>
        <p className="mt-1 text-sm text-gray-600">{copy.successBody}</p>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/60 ${compact ? "" : "sm:shadow-xl"}`}
    >
      {hasSelectedService && (
        <div className="grid grid-cols-4 border-b border-gray-100 bg-gray-50/80">
          {copy.stepLabels.map((label, index) => (
            <button
              key={label}
              className={`relative px-1 py-3.5 text-center text-[10px] font-bold uppercase tracking-wider transition-colors sm:px-2 sm:text-xs ${
                index === step
                  ? "text-violet-600"
                  : index < step
                    ? "text-violet-400"
                    : "text-gray-400"
              }`}
              type="button"
              onClick={() => {
                if (index < step) {
                  setStep(index);
                  setFieldErrors({});
                  setShowStepHint(false);
                }
              }}
            >
              {index === step && (
                <span className="absolute inset-x-2 top-0 h-0.5 rounded-full bg-violet-600 sm:inset-x-4" />
              )}
              {label}
            </button>
          ))}
        </div>
      )}

      <div className={`space-y-4 ${compact ? "p-3.5 sm:p-4" : "p-5 sm:p-6"}`}>
        {hasSelectedService && step > 0 && (
          <div className="flex items-center gap-2.5 rounded-xl border border-violet-200 bg-violet-50/60 px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white">
              <SelectedIcon className="h-4 w-4" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-violet-800">
                {selectedTitle}
              </p>
              <p className="truncate text-xs text-violet-600/80">
                {formData.serviceLocation === "come-to-me"
                  ? copy.onSiteDescription
                  : copy.inStoreDescription}
              </p>
            </div>
            <button
              className="shrink-0 text-xs font-semibold text-violet-600 hover:text-violet-800"
              type="button"
              onClick={() => {
                setStep(0);
                setFieldErrors({});
                setShowStepHint(false);
              }}
            >
              {copy.changeService}
            </button>
          </div>
        )}

        {step === 0 && (
          <div className="space-y-4">
            <ServiceChoiceSection
              compact={compact}
              copy={copy}
              selectMode
              selected={formData.serviceLocation}
              onSelect={selectService}
            />

            {fieldErrors.serviceLocation && (
              <p className="text-center text-xs text-red-500">
                {fieldErrors.serviceLocation}
              </p>
            )}

            {formData.serviceLocation === "come-to-me" && (
              <div className="rounded-xl border border-violet-200 bg-violet-50/30 p-3.5 sm:p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-700">
                  <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                  {copy.locationLabel}
                </div>
                <ServiceAddressFields
                  city={formData.city}
                  cityLabel={`${form.city} *`}
                  cityPlaceholder={form.cityPlaceholder}
                  errors={{
                    streetAddress: fieldErrors.streetAddress,
                    city: fieldErrors.city,
                    zip: fieldErrors.zip,
                  }}
                  streetAddress={formData.streetAddress}
                  streetAddressLabel={`${form.streetAddress} *`}
                  streetAddressPlaceholder={form.streetAddressPlaceholder}
                  zip={formData.zip}
                  zipLabel={`${form.zip} *`}
                  zipPlaceholder={form.zipPlaceholder}
                  onCityChange={(city) => {
                    clearFieldError("city");
                    setFormData((prev) => ({
                      ...prev,
                      city: sanitizeCityInput(city),
                    }));
                  }}
                  onStreetAddressChange={(streetAddress) => {
                    clearFieldError("streetAddress");
                    setFormData((prev) => ({ ...prev, streetAddress }));
                  }}
                  onZipChange={(zip) => {
                    clearFieldError("zip");
                    setFormData((prev) => ({
                      ...prev,
                      zip: sanitizeZipInput(zip),
                    }));
                  }}
                />
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <DatePicker
            isRequired
            classNames={{
              base: "w-full",
              inputWrapper:
                "min-h-12 bg-white border-gray-200 shadow-sm group-data-[focus=true]:border-violet-500",
              label: "text-gray-600 font-medium",
            }}
            errorMessage={fieldErrors.preferredDate}
            isInvalid={Boolean(fieldErrors.preferredDate)}
            label={form.preferredDate}
            minValue={today(getLocalTimeZone())}
            size="md"
            value={stringToDate(formData.preferredDate)}
            variant="bordered"
            onChange={(date) => {
              clearFieldError("preferredDate");
              setFormData((prev) => ({
                ...prev,
                preferredDate: dateToString(date),
              }));
            }}
          />
        )}

        {step === 2 && (
          <Select
            isRequired
            classNames={{
              trigger:
                "min-h-12 bg-white border-gray-200 shadow-sm data-[focus=true]:border-violet-500",
              label: "text-gray-600 font-medium",
            }}
            errorMessage={fieldErrors.preferredTime}
            isInvalid={Boolean(fieldErrors.preferredTime)}
            label={form.preferredTime}
            placeholder={form.preferredTimePlaceholder}
            popoverProps={{
              placement: "bottom",
              classNames: { content: "max-h-60 overflow-y-auto" },
            }}
            selectedKeys={formData.preferredTime ? [formData.preferredTime] : []}
            size="md"
            variant="bordered"
            onSelectionChange={(keys) => {
              clearFieldError("preferredTime");
              const selected = Array.from(keys)[0];

              setFormData((prev) => ({
                ...prev,
                preferredTime:
                  typeof selected === "string" ? selected : "",
              }));
            }}
          >
            {TIME_SLOTS.map((slot) => (
              <SelectItem key={slot.value}>{slot.label}</SelectItem>
            ))}
          </Select>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <Input
              required
              classNames={inputClassNames}
              errorMessage={fieldErrors.name}
              isInvalid={Boolean(fieldErrors.name)}
              label={form.fullName}
              placeholder={form.fullNamePlaceholder}
              size="md"
              value={formData.name}
              variant="bordered"
              onChange={(e) => {
                clearFieldError("name");
                setFormData((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
            <Input
              required
              classNames={inputClassNames}
              errorMessage={fieldErrors.phone}
              inputMode="tel"
              isInvalid={Boolean(fieldErrors.phone)}
              label={form.phone}
              placeholder={form.phonePlaceholder}
              size="md"
              type="tel"
              value={formData.phone}
              variant="bordered"
              onChange={(e) => {
                clearFieldError("phone");
                setFormData((prev) => ({
                  ...prev,
                  phone: sanitizePhoneInput(e.target.value),
                }));
              }}
            />
            <Input
              required
              classNames={inputClassNames}
              errorMessage={fieldErrors.email}
              isInvalid={Boolean(fieldErrors.email)}
              label={form.email}
              placeholder={form.emailPlaceholder}
              size="md"
              type="email"
              value={formData.email}
              variant="bordered"
              onChange={(e) => {
                clearFieldError("email");
                setFormData((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
            <Select
              isRequired
              classNames={{
                trigger:
                  "min-h-11 bg-white border-gray-200 shadow-sm data-[focus=true]:border-violet-500",
                label: "text-gray-600 font-medium text-sm",
              }}
              errorMessage={fieldErrors.device}
              isInvalid={Boolean(fieldErrors.device)}
              label={form.deviceType.replace(" *", "")}
              placeholder={form.devicePlaceholder}
              selectedKeys={formData.device ? [formData.device] : []}
              size="md"
              variant="bordered"
              onSelectionChange={(keys) => {
                clearFieldError("device");
                const selected = Array.from(keys)[0];

                setFormData((prev) => ({
                  ...prev,
                  device: typeof selected === "string" ? selected : "",
                }));
              }}
            >
              {devices.map((device) => (
                <SelectItem key={device.key}>{device.label}</SelectItem>
              ))}
            </Select>
            <Textarea
              required
              classNames={{
                inputWrapper:
                  "bg-white border-gray-200 shadow-sm group-data-[focus=true]:border-violet-500",
                label: "text-gray-600 font-medium text-sm",
              }}
              errorMessage={fieldErrors.issue}
              isInvalid={Boolean(fieldErrors.issue)}
              label={form.issueDescription}
              minRows={3}
              placeholder={form.issuePlaceholder}
              value={formData.issue}
              variant="bordered"
              onChange={(e) => {
                clearFieldError("issue");
                setFormData((prev) => ({ ...prev, issue: e.target.value }));
              }}
            />
          </div>
        )}

        {hasSelectedService && (
          <div className="space-y-2 pt-1">
            <div className="flex gap-3">
              {step > 0 && (
                <Button
                  className="min-h-11 flex-1 font-semibold"
                  radius="lg"
                  variant="bordered"
                  onPress={() => {
                    setStep((s) => s - 1);
                    setFieldErrors({});
                    setShowStepHint(false);
                  }}
                >
                  {copy.backBtn}
                </Button>
              )}
              <Button
                className="min-h-11 flex-1 bg-gradient-to-r from-violet-600 to-purple-600 font-semibold text-white shadow-md shadow-violet-500/25"
                isLoading={isSubmitting}
                radius="lg"
                onPress={handleNext}
              >
                {step === 3
                  ? isSubmitting
                    ? form.submitting
                    : form.submit
                  : copy.nextBtn}
              </Button>
            </div>

            {showStepHint && Object.keys(fieldErrors).length > 0 && (
              <p className="text-center text-xs text-red-500">{copy.fillFields}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
