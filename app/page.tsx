"use client";

import { Link } from "@heroui/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { useState } from "react";
import Image from "next/image";
import {
  MessageCircle,
  Search,
  FileText,
  CheckCircle,
  Wrench,
  FlaskConical,
  Package,
  Headphones,
  Unlock,
  Droplet,
  Cpu,
  HardDrive,
  Database,
  Shield,
  ChevronDown,
} from "lucide-react";

// Google Ads / gtag conversion helper
function gtagEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
}

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const faqs = [
  {
    q: "How long does a typical repair take?",
    a: "Most screen replacements and battery swaps are completed within 1–3 hours while you wait. More complex repairs like motherboard or water damage may take 24–48 hours. We always give you an estimated turnaround before starting.",
  },
  {
    q: "Do you use genuine Apple parts?",
    a: "Yes. We use OEM-grade and genuine Apple parts for all repairs to ensure the same quality, fit, and feel as the original. We never compromise on parts quality.",
  },
  {
    q: "Is there a warranty on repairs?",
    a: "Absolutely. Every repair comes with a 90-day warranty covering parts and workmanship. If anything goes wrong due to our repair, we'll fix it free of charge.",
  },
  {
    q: "Can you repair water-damaged iPhones or MacBooks?",
    a: "Yes — water damage is one of our specialties. Using ultrasonic cleaning and micro-soldering techniques, we successfully restore the majority of liquid-damaged Apple devices. Bring it in as soon as possible for the best outcome.",
  },
  {
    q: "Do I need to book an appointment?",
    a: "Walk-ins are welcome! For faster service you can submit a repair request online or call ahead so we can prepare. For MacBook and iMac repairs we recommend calling first.",
  },
  {
    q: "How much does a repair cost?",
    a: "Costs vary by device and repair type. We offer a free diagnostic assessment before any work begins, so you'll know the exact cost upfront with no hidden fees.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash, all major credit/debit cards, UPI, Google Pay, and PhonePe.",
  },
  {
    q: "What if my device can't be repaired?",
    a: "If a repair isn't possible, there is no diagnostic charge. We'll return your device and explain what happened honestly.",
  },
];

const testimonials = [
  {
    quote:
      "I was amazed by the quick and efficient service for my water-damaged MacBook. The team restored it to perfect working condition, saving me from buying a new one. Highly recommended!",
    name: "Arjun",
    title: "Freelance Photographer",
    image: "https://i.ibb.co/r4g9Hbv/oie-v-KM22z-HFO6-SM-1-2.png",
  },
  {
    quote:
      "My iMac had storage issues, and the upgrade service was flawless. The team explained everything clearly, and now my device runs faster than ever. A fantastic experience!",
    name: "Priya",
    title: "Graphic Designer",
    image: "https://i.ibb.co/dP2jN76/oie-v-KM22z-HFO6-SM-1-1.png",
  },
  {
    quote:
      "The team successfully removed the MDM lock on my MacBook Pro. I was impressed by their professionalism and the secure handling of my device. Exceptional service!",
    name: "Rajesh",
    title: "App Developer",
    image: "https://i.ibb.co/bW0MNGF/oie-v-KM22z-HFO6-SM-1-3.png",
  },
];

const devices = [
  { key: "macbook", label: "MacBook" },
  { key: "iphone", label: "iPhone" },
  { key: "ipad", label: "iPad" },
  { key: "imac", label: "iMac" },
  { key: "iwatch", label: "iWatch" },
  { key: "other", label: "Other" },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openBookingModal = () => {
    setIsModalOpen(true);
    gtagEvent("generate_lead", {
      event_category: "engagement",
      event_label: "book_repair_cta",
    });
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    device: "",
    issue: "",
  });

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.device !== "" &&
      formData.issue.trim() !== ""
    );
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Validate form before submitting
    if (!isFormValid()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        gtagEvent("conversion", {
          send_to: process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL || "",
        });
        gtagEvent("form_submit", {
          event_category: "lead",
          event_label: "repair_enquiry",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          device: "",
          issue: "",
        });
        setTimeout(() => {
          setIsSuccess(false);
          setIsModalOpen(false);
        }, 7000);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full relative py-8 sm:py-16 lg:py-24 lg:min-h-screen lg:flex lg:items-center bg-gradient-to-b from-violet-50/50 via-white to-white overflow-hidden">
        {/* Blurred background elements for hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        </div>

        {/* Floating service badges */}
        <div className="absolute top-[10%] sm:top-20 right-2 sm:right-10 bg-white/80 backdrop-blur-sm px-2 py-1.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-violet-200/50 pointer-events-none block">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-md sm:rounded-lg flex items-center justify-center">
              <svg
                className="w-3 h-3 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] sm:text-xs text-gray-500">
                MacBook
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-900">
                Expert Repair
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[22%] sm:bottom-32 left-2 sm:left-10 bg-white/80 backdrop-blur-sm px-2 py-1.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-blue-200/50 pointer-events-none block">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md sm:rounded-lg flex items-center justify-center">
              <svg
                className="w-3 h-3 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] sm:text-xs text-gray-500">
                iPhone/iPad
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-900">
                Quick Fix
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[5%] sm:bottom-40 right-2 sm:right-16 bg-white/80 backdrop-blur-sm px-2 py-1.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-amber-200/50 pointer-events-none block">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-md sm:rounded-lg flex items-center justify-center">
              <svg
                className="w-3 h-3 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] sm:text-xs text-gray-500">
                Same Day
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-900">
                Fast Service
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[60%] sm:top-[45%] right-6 sm:right-6 bg-white/80 backdrop-blur-sm px-2 py-1.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-purple-200/50 pointer-events-none block">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md sm:rounded-lg flex items-center justify-center">
              <svg
                className="w-3 h-3 sm:w-6 sm:h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  clipRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] sm:text-xs text-gray-500">
                Original
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-900">
                Genuine Parts
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-20 sm:top-32 left-2 sm:left-16 bg-white/80 backdrop-blur-sm px-2 py-1.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-green-200/50 pointer-events-none block">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-md sm:rounded-lg flex items-center justify-center">
              <svg
                className="w-3 h-3 sm:w-6 sm:h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 12.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] sm:text-xs text-gray-500">
                Certified
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-900">
                Technicians
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[22.5%] sm:bottom-24 right-2 sm:right-1/4 bg-white/80 backdrop-blur-sm px-2 py-1.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-indigo-200/50 pointer-events-none block">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-md sm:rounded-lg flex items-center justify-center">
              <svg
                className="w-3 h-3 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] sm:text-xs text-gray-500">
                90 Days
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-900">
                Warranty
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center w-full max-w-full max-sm:pt-24">
            {/* Text Content - Shows first on mobile */}
            <div className="text-center lg:text-left space-y-3 sm:space-y-5 order-1 lg:order-1">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-900">Expert </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
                    Apple Device{" "}
                  </span>
                  <br />
                  <span className="text-gray-900">Repair Services</span>
                </h1>
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed px-2 sm:px-0">
                Professional repairs for MacBook, iPhone, iPad, iMac & iWatch.
                Same-day service with genuine parts and expert care you can
                trust.
              </p>

              <div className="flex gap-3 justify-center lg:justify-start flex-row pt-1">
                <button
                  className="inline-flex items-center justify-center font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 text-white shadow-lg shadow-violet-500/50 hover:shadow-xl hover:shadow-violet-500/60 hover:from-violet-700 hover:via-purple-700 hover:to-violet-700 transition-all duration-200 text-sm sm:text-base lg:text-lg flex-1 sm:flex-initial"
                  onClick={openBookingModal}
                >
                  Book Repair Now
                </button>

                <Link
                  className="inline-flex items-center justify-center font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white text-violet-600 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base lg:text-lg flex-1 sm:flex-initial group"
                  href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1-555-123-4567"}`}
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                  Call Now
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex gap-3 sm:gap-6 justify-center lg:justify-start flex-wrap pt-3 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      clipRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      fillRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">10+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      clipRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      fillRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">4500+ Repairs Done</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      clipRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      fillRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Same-Day Service</span>
                </div>
              </div>
            </div>

            {/* Devices Image - Shows second on mobile */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-2 mt-6 lg:mt-0">
              <Image
                priority
                alt="Apple Devices - iPhone, iPad, MacBook, iMac Repair"
                className="w-full max-w-[350px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-none lg:w-[740px] h-auto object-contain"
                height={560}
                src="/All_Devices.png"
                width={740}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-20 bg-white w-full">
        {/* About Section */}
        <div
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 mb-8 sm:mb-12 md:mb-16 scroll-mt-24 relative"
          id="about"
        >
          {/* Blurred background for About */}
          <div className="absolute -top-20 right-0 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <p className="text-violet-600 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2">
              We have 5+ years of experience
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Right Partner for your Device Repairs
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-4 sm:space-y-5">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600">
                At Mac Repair Center, we specialize in offering top-notch repair
                services for all Apple devices, including MacBook, iPhone, iMac,
                iPad, and iWatch. Whether it&apos;s a cracked screen, battery
                issue, or software trouble, we&apos;ve got you covered with
                expert solutions and genuine parts. Trust us to restore your
                device to peak performance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
                  <div className="w-fit rounded-lg border border-violet-200 bg-white p-2 sm:p-2.5 md:p-3 mb-3 sm:mb-4">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-violet-600" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                    Experience You Can Count On
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    With years of expertise in Apple device repairs, we&apos;ve
                    built a reputation for reliability and quality. From simple
                    fixes to complex hardware issues, we handle it all with
                    precision and care.
                  </p>
                </div>

                <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="w-fit rounded-lg border border-blue-200 bg-white p-2 sm:p-2.5 md:p-3 mb-3 sm:mb-4">
                    <Headphones className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                    Quick and Reliable Support
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Facing issues with your Apple device? Don&apos;t worry
                    we&apos;re here to help! Our team provides fast and
                    efficient repair services to get you back on track in no
                    time. Your satisfaction is our priority.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6 lg:mt-0">
              <div className="text-center p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-xl shadow-violet-500/20 w-full max-w-xs">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-3">
                  4.5k
                </div>
                <p className="text-base sm:text-lg md:text-xl font-medium">
                  Satisfied Clients
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 md:mt-16 scroll-mt-24 relative"
          id="services"
        >
          {/* Blurred background for Services */}
          <div className="absolute top-0 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-10 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-violet-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <p className="text-violet-600 font-semibold text-xs uppercase tracking-wider mb-2">
              What We Offer
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Wide Variety of Repair Services
            </h2>
            <p className="text-sm sm:text-base text-default-600 max-w-2xl mx-auto px-4">
              Specialized solutions for all your Apple device needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="group p-4 sm:p-6 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
              <div className="w-fit rounded-lg border border-violet-200 bg-white p-2 sm:p-3 mb-3 sm:mb-4">
                <Unlock className="h-5 w-5 sm:h-6 sm:w-6 text-violet-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                Activation Unlock
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Secure and seamless access to your Apple device with our
                specialized unlock services.
              </p>
            </div>

            <div className="group p-4 sm:p-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="w-fit rounded-lg border border-blue-200 bg-white p-2 sm:p-3 mb-3 sm:mb-4">
                <Droplet className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                Water Damage Restoration
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Advanced restoration techniques to bring your water-damaged
                device back to life.
              </p>
            </div>

            <div className="group p-4 sm:p-6 rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
              <div className="w-fit rounded-lg border border-red-200 bg-white p-2 sm:p-3 mb-3 sm:mb-4">
                <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                Dead Motherboard Revival
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Precision repair of non-functional motherboards, restoring full
                functionality.
              </p>
            </div>

            <div className="group p-4 sm:p-6 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="w-fit rounded-lg border border-green-200 bg-white p-2 sm:p-3 mb-3 sm:mb-4">
                <HardDrive className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                Storage Upgrades
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Upgrade or downgrade storage for all MacBook and iMac models to
                meet your needs.
              </p>
            </div>

            <div className="group p-4 sm:p-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
              <div className="w-fit rounded-lg border border-amber-200 bg-white p-2 sm:p-3 mb-3 sm:mb-4">
                <Database className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                Data Recovery
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Recover critical data from your MacBook with our reliable
                recovery services.
              </p>
            </div>

            <div className="group p-4 sm:p-6 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
              <div className="w-fit rounded-lg border border-indigo-200 bg-white p-2 sm:p-3 mb-3 sm:mb-4">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                MDM Lock Removal
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Unlock MDM locks for T2 and M1/M2/M3 models with secure
                solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 md:mt-16 scroll-mt-24 relative"
          id="stats"
        >
          {/* Blurred background for Stats */}
          <div className="absolute -top-10 left-1/4 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-blue-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-violet-500 font-semibold text-xs uppercase tracking-wide mb-2">
              Numbers That Speak
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Our Success in Numbers
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-default-600 max-w-4xl mx-auto">
              At Mac Repair Center, we take pride in our journey of delivering
              high-quality repairs for Apple devices. Over the years, we&apos;ve
              successfully repaired thousands of MacBooks, iPhones, iPads, and
              other Apple devices, earning the trust of over 240 satisfied
              clients. With more than 6,500 issues resolved, our expertise in
              solving complex device problems and using only genuine parts has
              made us a leader in the industry. We are committed to providing
              fast, reliable, and efficient service, helping our customers get
              their devices back in perfect working condition. Our success is
              built on precision, care, and a passion for restoring the best in
              technology.
            </p>
          </div>

          <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-500/10 to-blue-500/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-violet-500">
                  4205+
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-default-600 mt-1 sm:mt-2">
                  Devices Repaired
                </p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-violet-500">
                  245+
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-default-600 mt-1 sm:mt-2">
                  Happy Clients
                </p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-violet-500">
                  3550+
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-default-600 mt-1 sm:mt-2">
                  Repairs Completed
                </p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-violet-500">
                  6545+
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-default-600 mt-1 sm:mt-2">
                  Issues Resolved
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Working Process */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 md:mt-16 relative">
          {/* Blurred background for Process */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-violet-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
              How We Ensure Quality Repairs
            </h2>
            <p className="text-sm sm:text-base text-default-600">
              Our proven 8-step process for excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
              <GlowingEffect
                disabled={false}
                glow={true}
                inactiveZone={0.01}
                proximity={64}
                spread={40}
              />
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                <div className="relative flex flex-1 flex-col justify-between gap-5">
                  <div className="w-fit rounded-lg border border-violet-500/30 bg-violet-500/10 p-2">
                    <MessageCircle className="h-6 w-6 text-violet-500" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-sans text-xl font-semibold md:text-2xl">
                      Inquiry
                    </h3>
                    <p className="font-sans text-sm text-default-600 md:text-base">
                      Initial consultation about your device issue
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
              <GlowingEffect
                disabled={false}
                glow={true}
                inactiveZone={0.01}
                proximity={64}
                spread={40}
              />
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                <div className="relative flex flex-1 flex-col justify-between gap-5">
                  <div className="w-fit rounded-lg border border-violet-500/30 bg-violet-500/10 p-2">
                    <Search className="h-6 w-6 text-violet-500" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-sans text-xl font-semibold md:text-2xl">
                      Diagnosis
                    </h3>
                    <p className="font-sans text-sm text-default-600 md:text-base">
                      Comprehensive diagnosis using advanced tools
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
              <GlowingEffect
                disabled={false}
                glow={true}
                inactiveZone={0.01}
                proximity={64}
                spread={40}
              />
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                <div className="relative flex flex-1 flex-col justify-between gap-5">
                  <div className="w-fit rounded-lg border border-violet-500/30 bg-violet-500/10 p-2">
                    <FileText className="h-6 w-6 text-violet-500" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-sans text-xl font-semibold md:text-2xl">
                      Quotation
                    </h3>
                    <p className="font-sans text-sm text-default-600 md:text-base">
                      Detailed quote with costs and timeline
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
              <GlowingEffect
                disabled={false}
                glow={true}
                inactiveZone={0.01}
                proximity={64}
                spread={40}
              />
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                <div className="relative flex flex-1 flex-col justify-between gap-5">
                  <div className="w-fit rounded-lg border border-violet-500/30 bg-violet-500/10 p-2">
                    <CheckCircle className="h-6 w-6 text-violet-500" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-sans text-xl font-semibold md:text-2xl">
                      Approval
                    </h3>
                    <p className="font-sans text-sm text-default-600 md:text-base">
                      Your confirmation before we proceed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
              <GlowingEffect
                disabled={false}
                glow={true}
                inactiveZone={0.01}
                proximity={64}
                spread={40}
              />
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                <div className="relative flex flex-1 flex-col justify-between gap-5">
                  <div className="w-fit rounded-lg border border-violet-500/30 bg-violet-500/10 p-2">
                    <Wrench className="h-6 w-6 text-violet-500" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-sans text-xl font-semibold md:text-2xl">
                      Repair
                    </h3>
                    <p className="font-sans text-sm text-default-600 md:text-base">
                      Expert repair using genuine parts
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
              <GlowingEffect
                disabled={false}
                glow={true}
                inactiveZone={0.01}
                proximity={64}
                spread={40}
              />
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                <div className="relative flex flex-1 flex-col justify-between gap-5">
                  <div className="w-fit rounded-lg border border-violet-500/30 bg-violet-500/10 p-2">
                    <FlaskConical className="h-6 w-6 text-violet-500" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-sans text-xl font-semibold md:text-2xl">
                      Testing
                    </h3>
                    <p className="font-sans text-sm text-default-600 md:text-base">
                      Thorough testing to verify functionality
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
              <GlowingEffect
                disabled={false}
                glow={true}
                inactiveZone={0.01}
                proximity={64}
                spread={40}
              />
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                <div className="relative flex flex-1 flex-col justify-between gap-5">
                  <div className="w-fit rounded-lg border border-violet-500/30 bg-violet-500/10 p-2">
                    <Package className="h-6 w-6 text-violet-500" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-sans text-xl font-semibold md:text-2xl">
                      Delivery
                    </h3>
                    <p className="font-sans text-sm text-default-600 md:text-base">
                      Device returned with warranty coverage
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
              <GlowingEffect
                disabled={false}
                glow={true}
                inactiveZone={0.01}
                proximity={64}
                spread={40}
              />
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                <div className="relative flex flex-1 flex-col justify-between gap-5">
                  <div className="w-fit rounded-lg border border-violet-500/30 bg-violet-500/10 p-2">
                    <Headphones className="h-6 w-6 text-violet-500" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-sans text-xl font-semibold md:text-2xl">
                      Support
                    </h3>
                    <p className="font-sans text-sm text-default-600 md:text-base">
                      Ongoing assistance after service
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <div
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 md:mt-16 scroll-mt-24 relative"
          id="testimonials"
        >
          {/* Blurred background for Testimonials */}
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
              Our Clients Feedback
            </h2>
            <p className="text-sm sm:text-base text-default-600">
              Hear what our satisfied customers have to say
            </p>
          </div>

          <InfiniteMovingCards
            className="mb-8"
            direction="right"
            items={testimonials}
            pauseOnHover={true}
            speed="slow"
          />
        </div>

        {/* FAQ Section */}
        <div
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 md:mt-16 scroll-mt-24 relative"
          id="faq"
        >
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-br from-violet-400/15 to-purple-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center mb-6 sm:mb-10">
            <p className="text-violet-600 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2">
              Got Questions?
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
              Everything you need to know before booking your repair
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 relative z-10">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-violet-500 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="w-full max-w-[1400px] mx-auto mt-8 sm:mt-12 md:mt-16 mb-8 sm:mb-12 md:mb-16 scroll-mt-24 relative px-4 sm:px-6"
          id="contact"
        >
          {/* Blurred background for Contact */}
          <div className="absolute -top-20 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-1/4 w-72 h-72 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative overflow-hidden p-6 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 text-white text-center shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full mb-3 sm:mb-4 text-xs sm:text-sm font-semibold">
                Get Your Device Fixed Today
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Ready to Restore Your Device?
              </h2>
              <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto opacity-95">
                Contact us 24/7 for fast and reliable Apple device repairs with
                genuine parts
              </p>
              <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
                <Link
                  className="inline-flex items-center justify-center font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-violet-600 shadow-xl text-sm sm:text-base"
                  href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+917700044192"}`}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="hidden sm:inline">
                    Call{" "}
                    {process.env.NEXT_PUBLIC_BUSINESS_PHONE ||
                      "+91-77000-44192"}
                  </span>
                  <span className="sm:hidden">Call Now</span>
                </Link>
                <Link
                  className="inline-flex items-center justify-center font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-white text-white text-sm sm:text-base"
                  href={`https://wa.me/${(process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+917700044192").replace(/[^0-9]/g, "")}`}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of background wrapper */}

      {/* Site Footer */}
      <footer className="w-full bg-gray-50 border-t border-gray-200 mt-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">
                Apple Repair Pro
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Certified Apple device repair — iPhone, iPad, MacBook & iMac.
                <br />
                Genuine parts. 90-day warranty. Same-day service.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-1.5 text-sm text-gray-500">
                <li>
                  <Link
                    className="hover:text-violet-600 transition-colors"
                    href="/#services"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-violet-600 transition-colors"
                    href="/pricing"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-violet-600 transition-colors"
                    href="/#faq"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-violet-600 transition-colors"
                    href="/#testimonials"
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-1.5 text-sm text-gray-500">
                <li>
                  <Link
                    className="hover:text-violet-600 transition-colors"
                    href="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-violet-600 transition-colors"
                    href="/terms"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-violet-600 transition-colors"
                    href="/#contact"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Apple Repair Pro. All rights
              reserved.
            </p>
            <p>Not affiliated with Apple Inc.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-2xl px-4 py-3 flex gap-3">
        <button
          className="flex-1 inline-flex items-center justify-center font-bold px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm shadow-md"
          onClick={openBookingModal}
        >
          Book Repair Now
        </button>
        <a
          className="flex-1 inline-flex items-center justify-center font-bold px-4 py-3 rounded-xl border-2 border-violet-600 text-violet-600 text-sm"
          href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+917700044192"}`}
        >
          <svg
            className="w-4 h-4 mr-1.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
          </svg>
          Call Now
        </a>
      </div>
      {/* Bottom padding for sticky bar on mobile */}
      <div className="h-20 lg:hidden" />

      {/* Enquiry Modal */}
      <Modal
        backdrop="blur"
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm",
          base: "border-none shadow-2xl m-0 !h-screen !w-screen !max-w-none !max-h-none sm:!h-auto sm:!max-h-[95vh] sm:!w-auto sm:!max-w-2xl !mb-0 sm:!mb-auto !rounded-none sm:!rounded-2xl !overflow-hidden !flex !flex-col",
          wrapper:
            "!p-0 sm:!p-4 items-stretch sm:items-center !justify-stretch sm:!justify-center",
          closeButton:
            "hover:bg-gray-100 active:bg-gray-200 text-gray-500 z-50",
          header: "!flex-shrink-0",
          body: "!overflow-y-auto !overscroll-contain !flex-1 !min-h-0 -webkit-overflow-scrolling-touch",
          footer: "!flex-shrink-0 !border-t",
        }}
        isDismissable={true}
        isKeyboardDismissDisabled={false}
        isOpen={isModalOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 50,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        placement="center"
        scrollBehavior="inside"
        size="full"
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent className="bg-white !h-full !flex !flex-col !overflow-hidden !max-h-screen">
          {/* Drag Handle for Mobile */}
          <div className="flex sm:hidden justify-center pt-3 pb-2 flex-shrink-0">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>

          <ModalHeader className="flex flex-col gap-0 pb-3 sm:pb-6 pt-2 sm:pt-8 px-3 sm:px-8 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-start gap-2 sm:gap-4">
              <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <svg
                  className="w-4 h-4 sm:w-7 sm:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-lg sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-0.5 sm:mb-1">
                  {isSuccess ? "Request Received!" : "Schedule Your Repair"}
                </h2>
                <p className="text-xs sm:text-base text-gray-600">
                  {isSuccess
                    ? "We'll get back to you within 24 hours"
                    : "Get your Apple device fixed by certified technicians"}
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className="px-3 sm:px-8 py-4 sm:py-8 !flex-1 !overflow-y-auto !min-h-0">
            {isSuccess ? (
              <div className="text-center py-6 sm:py-12">
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-lg shadow-green-500/30">
                  <svg
                    className="w-7 h-7 sm:w-10 sm:h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-3">
                  Request Submitted Successfully!
                </h3>
                <p className="text-gray-600 text-sm sm:text-lg mb-1.5 sm:mb-2">
                  We&apos;ll contact you shortly with a repair quote.
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Check your email for confirmation details.
                </p>
              </div>
            ) : (
              <form className="space-y-3 sm:space-y-5" onSubmit={handleSubmit}>
                <Input
                  required
                  label="Full Name"
                  placeholder="Enter your name"
                  size="sm"
                  value={formData.name}
                  variant="bordered"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <Input
                  label="Email Address (Optional)"
                  placeholder="your@email.com"
                  size="sm"
                  type="email"
                  value={formData.email}
                  variant="bordered"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <Input
                  required
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  size="sm"
                  type="tel"
                  value={formData.phone}
                  variant="bordered"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <div className="flex flex-col gap-2 w-full">
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="device-type"
                  >
                    Device Type *
                  </label>
                  <Dropdown>
                    <DropdownTrigger className="w-full">
                      <Button
                        className="justify-between w-full text-left"
                        size="sm"
                        variant="bordered"
                      >
                        {devices.find((d) => d.key === formData.device)
                          ?.label || "Select your device"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Device selection"
                      className="min-w-[500px]"
                      onAction={(key) =>
                        setFormData({ ...formData, device: key as string })
                      }
                    >
                      {devices.map((device) => (
                        <DropdownItem key={device.key}>
                          {device.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <Textarea
                  required
                  label="Issue Description"
                  minRows={3}
                  placeholder="Describe the problem with your device..."
                  size="sm"
                  value={formData.issue}
                  variant="bordered"
                  onChange={(e) =>
                    setFormData({ ...formData, issue: e.target.value })
                  }
                />
              </form>
            )}
          </ModalBody>

          {!isSuccess && (
            <ModalFooter className="px-3 sm:px-8 py-4 sm:py-6 border-t border-gray-100 gap-2 sm:gap-3 bg-white !flex-shrink-0 !z-10 shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
              <Button
                className="font-semibold text-gray-700 border-gray-300 hover:bg-gray-50 flex-1 text-sm sm:text-base h-11"
                size="md"
                variant="bordered"
                onPress={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white font-semibold shadow-lg shadow-violet-500/30 flex-1 text-sm sm:text-base h-11 disabled:opacity-50 disabled:cursor-not-allowed"
                isDisabled={!isFormValid() || isSubmitting}
                isLoading={isSubmitting}
                size="md"
                startContent={
                  !isSubmitting && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  )
                }
                onPress={() => handleSubmit()}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
