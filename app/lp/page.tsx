"use client";

import { useState } from "react";
import {
  CheckCircle,
  Phone,
  MessageCircle,
  Shield,
  Clock,
  Star,
  Wrench,
} from "lucide-react";

import { LanguageSwitcher } from "@/components/locale-switcher";
import { SchedulePickers } from "@/components/schedule-pickers";
import { ServiceAddressFields } from "@/components/service-address-fields";
import { useLanguage } from "@/lib/i18n/language-provider";

// Google Ads / gtag conversion helper
function gtagEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
}

const trustPoints = [
  { icon: Shield, text: "90-Day Warranty on Every service" },
  { icon: CheckCircle, text: "Genuine & OEM-Grade Parts Only" },
  { icon: Clock, text: "Most Services Done in 1–3 Hours" },
  { icon: Star, text: "4.9 ★ Average Customer Rating" },
  { icon: Wrench, text: "Certified Premium Brand Technicians" },
  { icon: CheckCircle, text: "No restore = No Fee Guarantee" },
];

const reviews = [
  {
    name: "James R.",
    rating: 5,
    text: "My water-damaged Laptop was restored perfectly. Saved me from buying a new one. Incredible service!",
    device: "Laptop Pro — Brooklyn, NY",
  },
  {
    name: "Sarah M.",
    rating: 5,
    text: "Screen replaced in under 2 hours. Looks brand new. Very professional technicians.",
    device: "Smartphone 14 Pro — Manhattan, NY",
  },
  {
    name: "David L.",
    rating: 5,
    text: "Battery replaced quickly and at a fair price. My Smartphone lasts all day again. Highly recommend!",
    device: "Smartphone 13 — Queens, NY",
  },
];

export default function LandingPage() {
  const { dict } = useLanguage();
  const form = dict.home.form.modal;
  const devices = dict.home.form.devices;
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    device: "",
    serviceLocation: "" as "" | "store" | "come-to-me",
    streetAddress: "",
    city: "",
    zip: "",
    preferredDate: "",
    preferredTime: "",
    issue: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isValid =
    formData.name.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.device !== "" &&
    formData.serviceLocation !== "" &&
    (formData.serviceLocation !== "come-to-me" ||
      (formData.streetAddress.trim() !== "" &&
        formData.city.trim() !== "" &&
        formData.zip.trim() !== "")) &&
    formData.issue.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, email: "" }),
      });

      if (res.ok) {
        setIsSuccess(true);
        gtagEvent("conversion", {
          send_to: process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL || "",
        });
        gtagEvent("form_submit", {
          event_category: "lead",
          event_label: "lp_service_form",
        });
      }
    } catch {
      // silent
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Minimal Header – No nav distractions */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm sm:text-base">
              {dict.nav.brand}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher compact />
            <a
              className="inline-flex items-center gap-1.5 font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm shadow-md"
              href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1-555-123-4567"}`}
              onClick={() =>
                gtagEvent("phone_call_click", { event_category: "lead" })
              }
            >
              <Phone className="w-3.5 h-3.5" />
              {process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+91-77000-44192"}
            </a>
          </div>
        </div>
      </header>

      {/* Hero – Above the fold */}
      <section className="pt-20 pb-0 bg-gradient-to-b from-violet-50/70 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left – Headline + trust */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Open Now — Same-Day Services Available
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Independent service Services
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
                  Smartphone, Tablet & Laptop
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Cracked screen? Dead battery? Water damage? Our professional
                technicians service Smartphones, Laptops, Tablets, and Desktops —{" "}
                <strong>usually within hours</strong>, using quality parts.
              </p>

              {/* Trust pills */}
              <div className="grid grid-cols-2 gap-2">
                {trustPoints.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-violet-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Phone CTA (mobile shows prominently) */}
              <div className="flex gap-3 flex-col sm:flex-row lg:hidden">
                <a
                  className="flex-1 inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30"
                  href="#quote-form"
                >
                  Get Free Quote
                </a>
                <a
                  className="flex-1 inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-xl border-2 border-violet-600 text-violet-600"
                  href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1-555-123-4567"}`}
                  onClick={() =>
                    gtagEvent("phone_call_click", { event_category: "lead" })
                  }
                >
                  <Phone className="w-4 h-4" />
                  Request Callback
                </a>
              </div>
            </div>

            {/* Right – Lead form (primary conversion element) */}
            <div className="scroll-mt-24" id="quote-form">
              {isSuccess ? (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Request Received!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    We&apos;ll call you back within <strong>30 minutes</strong>{" "}
                    with a free quote.
                  </p>
                  <a
                    className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl bg-violet-600 text-white"
                    href={`https://wa.me/${(process.env.NEXT_PUBLIC_BUSINESS_PHONE || "15551234567").replace(/[^0-9]/g, "")}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
                    <h2 className="text-white font-bold text-lg">
                      Get Your Free service Quote
                    </h2>
                    <p className="text-violet-100 text-sm">
                      Fill in 4 quick fields — we&apos;ll call you back in 30
                      mins
                    </p>
                  </div>
                  <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-1"
                        htmlFor="lp-name"
                      >
                        {form.fullName} *
                      </label>
                      <input
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        id="lp-name"
                        placeholder="John Smith"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-1"
                        htmlFor="lp-phone"
                      >
                        {form.phone} *
                      </label>
                      <input
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        id="lp-phone"
                        placeholder="+91 98765 43210"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-1"
                        htmlFor="lp-device"
                      >
                        {form.deviceType.replace(" *", "")} *
                      </label>
                      <select
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                        id="lp-device"
                        value={formData.device}
                        onChange={(e) =>
                          setFormData({ ...formData, device: e.target.value })
                        }
                      >
                        <option value="">{form.devicePlaceholder}</option>
                        {devices.map((d) => (
                          <option key={d.key} value={d.key}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="block text-sm font-semibold text-gray-700 mb-2">
                        {form.serviceMethod}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <label
                          className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                            formData.serviceLocation === "store"
                              ? "border-violet-500 bg-violet-50 ring-1 ring-violet-500/20"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <input
                            checked={formData.serviceLocation === "store"}
                            className="sr-only"
                            name="lp-serviceLocation"
                            type="radio"
                            value="store"
                            onChange={() =>
                              setFormData({
                                ...formData,
                                serviceLocation: "store",
                                streetAddress: "",
                                city: "",
                                zip: "",
                              })
                            }
                          />
                          <span
                            aria-hidden
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                              formData.serviceLocation === "store"
                                ? "border-violet-600"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.serviceLocation === "store" && (
                              <span className="h-2 w-2 rounded-full bg-violet-600" />
                            )}
                          </span>
                          <span className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium text-gray-900">
                              {form.inStoreTitle}
                            </span>
                            <span className="text-xs text-gray-500">
                              {form.inStoreDescription}
                            </span>
                          </span>
                        </label>

                        <label
                          className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                            formData.serviceLocation === "come-to-me"
                              ? "border-violet-500 bg-violet-50 ring-1 ring-violet-500/20"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <input
                            checked={formData.serviceLocation === "come-to-me"}
                            className="sr-only"
                            name="lp-serviceLocation"
                            type="radio"
                            value="come-to-me"
                            onChange={() =>
                              setFormData({
                                ...formData,
                                serviceLocation: "come-to-me",
                              })
                            }
                          />
                          <span
                            aria-hidden
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                              formData.serviceLocation === "come-to-me"
                                ? "border-violet-600"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.serviceLocation === "come-to-me" && (
                              <span className="h-2 w-2 rounded-full bg-violet-600" />
                            )}
                          </span>
                          <span className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium text-gray-900">
                              {form.onSiteTitle}
                            </span>
                            <span className="text-xs text-gray-500">
                              {form.onSiteDescription}
                            </span>
                          </span>
                        </label>
                      </div>

                      {formData.serviceLocation === "come-to-me" && (
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
                      )}
                    </div>

                    <SchedulePickers
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

                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-1"
                        htmlFor="lp-issue"
                      >
                        {form.issueDescription} *
                      </label>
                      <textarea
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                        id="lp-issue"
                        placeholder="e.g. Cracked screen, won't turn on, battery drains fast..."
                        rows={3}
                        value={formData.issue}
                        onChange={(e) =>
                          setFormData({ ...formData, issue: e.target.value })
                        }
                      />
                    </div>

                    <button
                      className="w-full font-bold px-6 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-base"
                      disabled={!isValid || isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? form.submitting : form.submit}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      🔒 Your info is 100% private. No spam, ever.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-6 justify-center mb-10">
            {[
              { value: "4,500+", label: "Devices serviced" },
              { value: "4.9 ★", label: "Average Rating" },
              { value: "90 Days", label: "service Warranty" },
              { value: "Same Day", label: "Service Available" },
            ].map((stat) => (
              <div key={stat.label} className="text-center min-w-[120px]">
                <p className="text-2xl sm:text-3xl font-extrabold text-violet-600">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
              >
                <div className="flex mb-2">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {r.name}
                  </p>
                  <p className="text-xs text-gray-400">{r.device}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl px-4 py-3 flex gap-3 lg:hidden">
        <a
          className="flex-1 inline-flex items-center justify-center font-bold py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm shadow-md"
          href="#quote-form"
        >
          Get Free Quote
        </a>
        <a
          className="flex-1 inline-flex items-center justify-center font-bold py-3 rounded-xl border-2 border-violet-600 text-violet-600 text-sm"
          href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1-555-123-4567"}`}
          onClick={() =>
            gtagEvent("phone_call_click", { event_category: "lead" })
          }
        >
          <Phone className="w-4 h-4 mr-1.5" />
          Request Callback
        </a>
      </div>
      <div className="h-20 lg:hidden" />

      {/* Minimal Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 text-center py-6 px-4">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Device Service NYC · We are an independent service service provider and not affiliated, authorized, or endorsed by Premium Brand Inc. ·{" "}          <a className="hover:text-violet-600" href="/privacy">
            Privacy
          </a>{" "}
          ·{" "}
          <a className="hover:text-violet-600" href="/terms">
            Terms
          </a>
        </p>
      </footer>
    </div>
  );
}
