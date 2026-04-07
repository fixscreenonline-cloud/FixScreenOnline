"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const pricingData = [
  {
    device: "iPhone",
    color: "blue",
    gradient: "from-blue-50 to-cyan-50",
    border: "border-blue-200",
    accent: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    repairs: [
      { name: "Screen Replacement", price: "From $79", time: "1–2 hrs" },
      { name: "Battery Replacement", price: "From $49", time: "30 mins" },
      { name: "Charging Port Repair", price: "From $39", time: "1 hr" },
      { name: "Back Glass Repair", price: "From $69", time: "2 hrs" },
      { name: "Camera Repair", price: "From $79", time: "1–2 hrs" },
      { name: "Water Damage", price: "From $99", time: "24 hrs" },
    ],
  },
  {
    device: "MacBook",
    color: "violet",
    gradient: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    accent: "text-violet-600",
    badge: "bg-violet-100 text-violet-700",
    repairs: [
      { name: "Screen Replacement", price: "From $299", time: "2–4 hrs" },
      { name: "Battery Replacement", price: "From $189", time: "1–2 hrs" },
      { name: "Keyboard Replacement", price: "From $149", time: "2 hrs" },
      { name: "Motherboard Repair", price: "From $249", time: "24–48 hrs" },
      { name: "Storage Upgrade (SSD)", price: "From $179", time: "2 hrs" },
      { name: "Water Damage Repair", price: "From $199", time: "24–48 hrs" },
    ],
  },
  {
    device: "iPad",
    color: "green",
    gradient: "from-green-50 to-emerald-50",
    border: "border-green-200",
    accent: "text-green-600",
    badge: "bg-green-100 text-green-700",
    repairs: [
      { name: "Screen Replacement", price: "From $129", time: "2–3 hrs" },
      { name: "Battery Replacement", price: "From $89", time: "1–2 hrs" },
      { name: "Charging Port Repair", price: "From $49", time: "1 hr" },
      { name: "Home Button Repair", price: "From $39", time: "1 hr" },
      { name: "Camera Repair", price: "From $79", time: "2 hrs" },
      { name: "Water Damage", price: "From $109", time: "24 hrs" },
    ],
  },
  {
    device: "iMac",
    color: "amber",
    gradient: "from-amber-50 to-yellow-50",
    border: "border-amber-200",
    accent: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    repairs: [
      { name: "Screen Replacement", price: "From $399", time: "3–5 hrs" },
      { name: "RAM Upgrade", price: "From $99", time: "1–2 hrs" },
      { name: "Storage Upgrade (SSD)", price: "From $199", time: "2–3 hrs" },
      { name: "GPU Repair", price: "From $299", time: "24–48 hrs" },
      { name: "Motherboard Repair", price: "From $349", time: "48 hrs" },
      { name: "Water Damage", price: "From $249", time: "24–48 hrs" },
    ],
  },
];

const included = [
  "Free diagnostic assessment",
  "Genuine / OEM-grade parts",
  "90-day repair warranty",
  "No fix — no fee guarantee",
  "Same-day service available",
  "Transparent pricing upfront",
];

export default function PricingPage() {
  const [activeDevice, setActiveDevice] = useState("MacBook");
  const active = pricingData.find((p) => p.device === activeDevice)!;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="w-full bg-gradient-to-b from-violet-50/60 to-white pt-24 pb-12 px-4 sm:px-6 text-center">
        <p className="text-violet-600 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
          Transparent & Affordable
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Transparent Repair Pricing
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-6">
          No hidden charges. Free diagnostics. All prices start from — final
          price confirmed before we begin.
        </p>
        <Link
          className="inline-flex items-center justify-center font-bold px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:from-violet-700 hover:to-purple-700 transition-all"
          href="/#contact"
        >
          Get a Free Quote
        </Link>
      </div>

      {/* What's Included */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center">
            Every Repair Includes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Tabs + Pricing */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {pricingData.map((p) => (
            <button
              key={p.device}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                activeDevice === p.device
                  ? "bg-violet-600 text-white shadow-md shadow-violet-500/30"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveDevice(p.device)}
            >
              {p.device}
            </button>
          ))}
        </div>

        {/* Price table */}
        <div
          className={`border ${active.border} rounded-2xl overflow-hidden bg-gradient-to-br ${active.gradient}`}
        >
          <div className={`px-6 py-4 border-b ${active.border}`}>
            <h2 className={`text-xl font-bold ${active.accent}`}>
              {active.device} Repair Prices
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Exact price confirmed after free diagnostics
            </p>
          </div>
          <div className="divide-y divide-gray-100">
            {active.repairs.map((repair) => (
              <div
                key={repair.name}
                className="flex items-center justify-between px-6 py-4 bg-white/60 hover:bg-white/90 transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {repair.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Est. time: {repair.time}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`font-bold text-sm sm:text-base ${active.accent}`}
                  >
                    {repair.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-400 mt-5">
          * Prices are indicative and may vary based on model variant and
          severity. Final price always confirmed before repair begins.
        </p>

        {/* CTA strip */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4 font-medium">
            Not sure about the cost? Get a free quote in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              className="inline-flex items-center justify-center font-bold px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md hover:shadow-lg transition-all"
              href="/#contact"
            >
              Book Free Diagnostic
            </Link>
            <a
              className="inline-flex items-center justify-center font-bold px-8 py-3.5 rounded-xl border-2 border-violet-600 text-violet-600 hover:bg-violet-50 transition-all"
              href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1-555-123-4567"}`}
            >
              Request Callback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
