"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import {
  User,
  Smartphone,
  CalendarDays,
  FileText,
  Store,
  Home,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  type LucideIcon,
} from "lucide-react";

import { LanguageSwitcher } from "@/components/locale-switcher";
import { SchedulePickers } from "@/components/schedule-pickers";
import { ServiceAddressFields } from "@/components/service-address-fields";
import type { DeviceOption } from "@/lib/i18n/types";

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  device: string;
  serviceLocation: "" | "store" | "come-to-me";
  streetAddress: string;
  city: string;
  zip: string;
  preferredDate: string;
  preferredTime: string;
  issue: string;
}

interface BookingModalCopy {
  titleDefault: string;
  titleSuccess: string;
  subtitleDefault: string;
  subtitleSuccess: string;
  successHeading: string;
  successBody: string;
  successHint: string;
  contactSectionTitle: string;
  serviceSectionTitle: string;
  scheduleSectionTitle: string;
  issueSectionTitle: string;
  privacyNote: string;
  trustFreeQuote: string;
  trustFastResponse: string;
  fullName: string;
  fullNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  deviceType: string;
  devicePlaceholder: string;
  serviceMethod: string;
  inStoreTitle: string;
  inStoreDescription: string;
  onSiteTitle: string;
  onSiteDescription: string;
  streetAddress: string;
  streetAddressPlaceholder: string;
  city: string;
  cityPlaceholder: string;
  zip: string;
  zipPlaceholder: string;
  scheduleHeading: string;
  preferredDate: string;
  preferredTime: string;
  preferredTimePlaceholder: string;
  issueDescription: string;
  issuePlaceholder: string;
  cancel: string;
  submit: string;
  submitting: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSuccess: boolean;
  isSubmitting: boolean;
  formData: BookingFormData;
  setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
  form: BookingModalCopy;
  devices: DeviceOption[];
  isFormValid: () => boolean;
  onSubmit: (e?: React.FormEvent) => void;
}

const inputClassNames = {
  inputWrapper:
    "min-h-12 bg-white border-gray-200 shadow-sm group-data-[focus=true]:border-violet-500 group-data-[focus=true]:ring-2 group-data-[focus=true]:ring-violet-500/20",
  label: "text-gray-600 font-medium",
};

function FormSection({
  icon: Icon,
  title,
  optional,
  children,
}: {
  icon: LucideIcon;
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-100/80 bg-white p-4 shadow-sm shadow-gray-100/80 sm:p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/30">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>
          {optional && (
            <p className="text-xs text-gray-400">Optional</p>
          )}
        </div>
      </div>
      <div className="space-y-3.5">{children}</div>
    </section>
  );
}

function ServiceOptionCard({
  selected,
  icon: Icon,
  title,
  description,
  name,
  value,
  onSelect,
}: {
  selected: boolean;
  icon: LucideIcon;
  title: string;
  description: string;
  name: string;
  value: "store" | "come-to-me";
  onSelect: () => void;
}) {
  return (
    <label
      className={`group relative flex cursor-pointer flex-col gap-3 rounded-2xl border-2 p-4 transition-all duration-200 active:scale-[0.98] ${
        selected
          ? "border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50/80 shadow-md shadow-violet-500/10"
          : "border-gray-100 bg-gray-50/50 hover:border-violet-200 hover:bg-white"
      }`}
    >
      <input
        checked={selected}
        className="sr-only"
        name={name}
        type="radio"
        value={value}
        onChange={onSelect}
      />
      {selected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white">
          <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      )}
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
          selected
            ? "bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30"
            : "bg-white text-violet-600 shadow-sm ring-1 ring-gray-100 group-hover:ring-violet-100"
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div className="pr-6">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
          {description}
        </p>
      </div>
    </label>
  );
}

function useMobileKeyboard() {
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [keyboardInset, setKeyboardInset] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");

    const updateMobile = () => setIsMobile(mq.matches);

    updateMobile();
    mq.addEventListener("change", updateMobile);

    return () => mq.removeEventListener("change", updateMobile);
  }, []);

  const syncViewport = useCallback(() => {
    const vv = window.visualViewport;

    if (!vv) return;

    setViewportHeight(vv.height);
    setKeyboardInset(
      Math.max(0, window.innerHeight - vv.height - vv.offsetTop),
    );
  }, []);

  const resetViewport = useCallback(() => {
    setViewportHeight(null);
    setKeyboardInset(0);
  }, []);

  return {
    isMobile,
    viewportHeight,
    keyboardInset,
    isKeyboardOpen: keyboardInset > 50,
    syncViewport,
    resetViewport,
  };
}

export function BookingModal({
  isOpen,
  onClose,
  isSuccess,
  isSubmitting,
  formData,
  setFormData,
  form,
  devices,
  isFormValid,
  onSubmit,
}: BookingModalProps) {
  const {
    isMobile,
    viewportHeight,
    keyboardInset,
    isKeyboardOpen,
    syncViewport,
    resetViewport,
  } = useMobileKeyboard();

  useEffect(() => {
    if (!isOpen) {
      resetViewport();
      return;
    }

    syncViewport();

    const vv = window.visualViewport;

    if (!vv) return;

    vv.addEventListener("resize", syncViewport);
    vv.addEventListener("scroll", syncViewport);

    return () => {
      vv.removeEventListener("resize", syncViewport);
      vv.removeEventListener("scroll", syncViewport);
    };
  }, [isOpen, resetViewport, syncViewport]);

  const scrollFieldIntoView = useCallback((element: HTMLElement | null) => {
    if (!element || !isMobile) return;

    requestAnimationFrame(() => {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 350);
    });
  }, [isMobile]);

  const handleFieldFocus = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      const field =
        event.currentTarget.querySelector("textarea, input") ??
        event.currentTarget;

      scrollFieldIntoView(field as HTMLElement);
    },
    [scrollFieldIntoView],
  );

  const mobileModalStyle =
    isMobile && viewportHeight
      ? { maxHeight: `${viewportHeight}px` }
      : undefined;

  const mobileBodyStyle =
    isMobile && keyboardInset > 0
      ? { paddingBottom: `${keyboardInset + 32}px` }
      : undefined;

  return (
    <Modal
      backdrop="blur"
      classNames={{
        backdrop: "bg-slate-900/60 backdrop-blur-md",
        base:
          "border-none shadow-2xl m-0 w-full max-w-full max-h-[94dvh] rounded-t-[1.75rem] rounded-b-none overflow-hidden flex flex-col fixed inset-x-0 bottom-0 top-auto sm:static sm:inset-auto sm:max-h-[92vh] sm:max-w-[540px] sm:rounded-3xl",
        wrapper:
          "!z-[9999] !p-0 sm:!p-4 items-end sm:items-center justify-center",
        closeButton: isSuccess
          ? "hidden"
          : "top-3.5 right-3.5 sm:top-5 sm:right-5 text-white/90 hover:bg-white/15 active:bg-white/25 z-[60] w-9 h-9 min-w-9 rounded-full",
        body: "!overflow-y-auto !overscroll-contain !flex-1 !min-h-0 !p-0",
        footer: "!flex-shrink-0 !p-0 !border-0",
      }}
      isDismissable={true}
      isKeyboardDismissDisabled={false}
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          },
          exit: {
            y: "100%",
            opacity: 0,
            transition: { duration: 0.3, ease: "easeIn" },
          },
        },
      }}
      placement="bottom"
      scrollBehavior="inside"
      size="full"
      onClose={onClose}
    >
      <ModalContent
        className="flex h-full max-h-[94dvh] flex-col overflow-hidden bg-gray-50 sm:max-h-[92vh]"
        style={mobileModalStyle}
      >
        {isSuccess ? (
          <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600" />
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-4 ring-white/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl">
                <CheckCircle2
                  className="h-9 w-9 text-emerald-500"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            <h2 className="relative mb-2 text-2xl font-bold text-white sm:text-3xl">
              {form.titleSuccess}
            </h2>
            <p className="relative mb-6 max-w-xs text-base text-emerald-50/90">
              {form.subtitleSuccess}
            </p>

            <div className="relative w-full max-w-sm rounded-2xl bg-white/95 p-5 text-left shadow-xl backdrop-blur-sm">
              <p className="font-semibold text-gray-900">{form.successHeading}</p>
              <p className="mt-1.5 text-sm text-gray-600">{form.successBody}</p>
              <p className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                {form.successHint}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Gradient hero header — collapses on mobile when keyboard is open */}
            <div
              className={`relative shrink-0 overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 transition-all duration-300 ${
                isMobile && isKeyboardOpen
                  ? "max-h-0 px-4 py-0 opacity-0 pointer-events-none"
                  : "px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4 opacity-100"
              }`}
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-indigo-400/20 blur-2xl" />

              <div className="relative mb-4 flex items-center justify-between sm:hidden">
                <LanguageSwitcher compact variant="light" />
                <div className="absolute left-1/2 top-1/2 h-1 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30" />
              </div>

              <div className="relative flex items-start gap-3.5 pr-10 sm:pr-12">
                <div className="hidden shrink-0 sm:flex">
                  <LanguageSwitcher compact variant="light" />
                </div>
                <div className="flex min-w-0 flex-1 items-start gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm sm:h-14 sm:w-14">
                    <Sparkles className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                      {form.titleDefault}
                    </h2>
                    <p className="mt-1 text-sm leading-snug text-violet-100/90">
                      {form.subtitleDefault}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm ring-1 ring-white/20">
                  <Sparkles className="h-3 w-3" />
                  {form.trustFreeQuote}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm ring-1 ring-white/20">
                  <Clock className="h-3 w-3" />
                  {form.trustFastResponse}
                </span>
              </div>
            </div>

            <ModalBody
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 scroll-pb-40 sm:scroll-pb-0 sm:px-5 sm:py-6"
              style={mobileBodyStyle}
            >
              <form className="space-y-4" id="booking-form" onSubmit={onSubmit}>
                <FormSection icon={User} title={form.contactSectionTitle}>
                  <Input
                    required
                    classNames={inputClassNames}
                    label={form.fullName}
                    placeholder={form.fullNamePlaceholder}
                    size="md"
                    value={formData.name}
                    variant="bordered"
                    onFocus={handleFieldFocus}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <Input
                      classNames={inputClassNames}
                      label={form.email}
                      placeholder={form.emailPlaceholder}
                      size="md"
                      type="email"
                      value={formData.email}
                      variant="bordered"
                      onFocus={handleFieldFocus}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <Input
                      required
                      classNames={inputClassNames}
                      label={form.phone}
                      placeholder={form.phonePlaceholder}
                      size="md"
                      type="tel"
                      value={formData.phone}
                      variant="bordered"
                      onFocus={handleFieldFocus}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </FormSection>

                <FormSection icon={Smartphone} title={form.serviceSectionTitle}>
                  <Select
                    isRequired
                    classNames={{
                      trigger:
                        "min-h-12 bg-white border-gray-200 shadow-sm data-[focus=true]:border-violet-500",
                      label: "text-gray-600 font-medium",
                    }}
                    label={form.deviceType.replace(" *", "")}
                    placeholder={form.devicePlaceholder}
                    selectedKeys={formData.device ? [formData.device] : []}
                    size="md"
                    variant="bordered"
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];

                      setFormData({
                        ...formData,
                        device: typeof selected === "string" ? selected : "",
                      });
                    }}
                  >
                    {devices.map((device) => (
                      <SelectItem key={device.key}>{device.label}</SelectItem>
                    ))}
                  </Select>

                  <div>
                    <p className="mb-2.5 text-sm font-medium text-gray-700">
                      {form.serviceMethod}
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <ServiceOptionCard
                        description={form.inStoreDescription}
                        icon={Store}
                        name="serviceLocation"
                        selected={formData.serviceLocation === "store"}
                        title={form.inStoreTitle}
                        value="store"
                        onSelect={() =>
                          setFormData({
                            ...formData,
                            serviceLocation: "store",
                            streetAddress: "",
                            city: "",
                            zip: "",
                          })
                        }
                      />
                      <ServiceOptionCard
                        description={form.onSiteDescription}
                        icon={Home}
                        name="serviceLocation"
                        selected={formData.serviceLocation === "come-to-me"}
                        title={form.onSiteTitle}
                        value="come-to-me"
                        onSelect={() =>
                          setFormData({
                            ...formData,
                            serviceLocation: "come-to-me",
                          })
                        }
                      />
                    </div>
                  </div>

                  {formData.serviceLocation === "come-to-me" && (
                    <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-3.5 transition-all duration-300">
                      <ServiceAddressFields
                        city={formData.city}
                        cityLabel={form.city}
                        cityPlaceholder={form.cityPlaceholder}
                        streetAddress={formData.streetAddress}
                        streetAddressLabel={form.streetAddress}
                        streetAddressPlaceholder={form.streetAddressPlaceholder}
                        zip={formData.zip}
                        zipLabel={form.zip}
                        zipPlaceholder={form.zipPlaceholder}
                        onCityChange={(city) =>
                          setFormData({ ...formData, city })
                        }
                        onStreetAddressChange={(streetAddress) =>
                          setFormData({ ...formData, streetAddress })
                        }
                        onZipChange={(zip) => setFormData({ ...formData, zip })}
                      />
                    </div>
                  )}
                </FormSection>

                <FormSection
                  icon={CalendarDays}
                  optional
                  title={form.scheduleSectionTitle}
                >
                  <SchedulePickers
                    embedded
                    preferredDate={formData.preferredDate}
                    preferredDateLabel={form.preferredDate}
                    preferredTime={formData.preferredTime}
                    preferredTimeLabel={form.preferredTime}
                    preferredTimePlaceholder={form.preferredTimePlaceholder}
                    scheduleHeading={form.scheduleHeading}
                    onPreferredDateChange={(preferredDate) =>
                      setFormData({ ...formData, preferredDate })
                    }
                    onPreferredTimeChange={(preferredTime) =>
                      setFormData({ ...formData, preferredTime })
                    }
                  />
                </FormSection>

                <FormSection icon={FileText} title={form.issueSectionTitle}>
                  <Textarea
                    required
                    classNames={{
                      ...inputClassNames,
                      inputWrapper: `${inputClassNames.inputWrapper} min-h-[6.5rem]`,
                    }}
                    label={form.issueDescription}
                    minRows={3}
                    placeholder={form.issuePlaceholder}
                    size="md"
                    value={formData.issue}
                    variant="bordered"
                    onFocus={handleFieldFocus}
                    onChange={(e) =>
                      setFormData({ ...formData, issue: e.target.value })
                    }
                  />
                </FormSection>

                {isMobile && isKeyboardOpen && (
                  <div className="sticky bottom-2 z-20 rounded-2xl border border-violet-100 bg-white/95 p-3 shadow-lg backdrop-blur-sm sm:hidden">
                    <Button
                      className="min-h-12 w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 font-semibold text-white shadow-lg shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                      form="booking-form"
                      isDisabled={!isFormValid() || isSubmitting}
                      isLoading={isSubmitting}
                      size="lg"
                      type="submit"
                    >
                      {isSubmitting ? form.submitting : form.submit}
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 pb-1 pt-1 text-center">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-violet-400" />
                  <span className="text-xs text-gray-400">{form.privacyNote}</span>
                </div>
              </form>
            </ModalBody>

            {!(isMobile && isKeyboardOpen) && (
            <ModalFooter className="shrink-0 border-t border-gray-100 bg-white px-4 py-3.5 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] sm:px-5 sm:py-4 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
              <div className="flex w-full gap-3">
                <Button
                  className="min-h-12 flex-1 border-gray-200 font-semibold text-gray-600 hover:bg-gray-50"
                  size="lg"
                  variant="bordered"
                  onPress={onClose}
                >
                  {form.cancel}
                </Button>
                <Button
                  className="min-h-12 flex-1 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 font-semibold text-white shadow-lg shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  form="booking-form"
                  isDisabled={!isFormValid() || isSubmitting}
                  isLoading={isSubmitting}
                  size="lg"
                  type="submit"
                  startContent={
                    !isSubmitting && (
                      <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
                    )
                  }
                >
                  {isSubmitting ? form.submitting : form.submit}
                </Button>
              </div>
            </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
