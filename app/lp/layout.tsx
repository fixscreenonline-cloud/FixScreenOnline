import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Independent Smartphone & Laptop service – Same Day Service | Device Service NYC",
  description:
    "Cracked screen, battery issue, or water damage? Our professional technicians service iPhones, MacBooks, iPads & iMacs — same day in New York. Request a free quote.",
  robots: { index: false, follow: false }, // Keep Ads LP off organic index
};

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
