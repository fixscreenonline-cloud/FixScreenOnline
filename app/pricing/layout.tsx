import { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://applerepairpro.com";
const CITY = process.env.NEXT_PUBLIC_BUSINESS_CITY || "Hicksville";

export const metadata: Metadata = {
  title: `Apple Repair Pricing in ${CITY} — iPhone, MacBook, iPad | Apple Repair Pro`,
  description: `Transparent, upfront pricing for iPhone, iPad, MacBook & iMac repairs in ${CITY}. No hidden fees. Free diagnostics. 90-day warranty on all repairs.`,
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: `Apple Device Repair Pricing in ${CITY} | Apple Repair Pro`,
    description: `See our affordable repair prices for iPhone, MacBook, iPad & iMac. Free diagnostics. 90-day warranty.`,
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
