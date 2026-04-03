import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple Device Repair – Same Day Service | Apple Repair Pro",
  description:
    "Broken iPhone, cracked MacBook screen, or water damage? Get it fixed today. Certified technicians. Free diagnostics. 90-day warranty. Book now.",
  robots: { index: false, follow: false }, // Keep Ads LP off organic index
};

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
