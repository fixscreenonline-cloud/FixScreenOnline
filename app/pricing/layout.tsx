import { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.fixmydevicenyc.com";
const CITY = process.env.NEXT_PUBLIC_BUSINESS_CITY || "New York";

export const metadata: Metadata = {
  title: `iPhone & MacBook Repair Pricing in ${CITY} — iPad, iMac | FixMyDevice NYC`,
  description: `Transparent, upfront pricing for iPhone, iPad, MacBook & iMac repairs in ${CITY}. No hidden fees. Free diagnostics. 90-day warranty on all repairs.`,
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: `Device Repair Pricing in ${CITY} | FixMyDevice NYC`,
    description: `See our repair prices for iPhone, MacBook, iPad & iMac in ${CITY}. Free diagnostics. 90-day warranty.`,
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
