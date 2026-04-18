import { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.deviceservicenyc.com";
const CITY = process.env.NEXT_PUBLIC_BUSINESS_CITY || "New York";

export const metadata: Metadata = {
  title: `Smartphone & Laptop service Pricing in ${CITY} — Tablet, Desktop | Device Service NYC`,
  description: `Transparent, upfront pricing for Smartphone, Tablet, Laptop & Desktop services in ${CITY}. No hidden fees. Free diagnostics. 90-day warranty on all services.`,
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: `Device service Pricing in ${CITY} | Device Service NYC`,
    description: `See our service prices for Smartphone, Laptop, Tablet & Desktop in ${CITY}. Free diagnostics. 90-day warranty.`,
    url: `${SITE_URL}/pricing`,
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
