import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Script from "next/script";

import { Providers } from "./providers";
import { StructuredData } from "./structured-data";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { ScrollToHash } from "@/components/scroll-to-hash";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.deviceservicenyc.com";
const BUSINESS_CITY = process.env.NEXT_PUBLIC_BUSINESS_CITY || "Hicksville";
const BUSINESS_STATE = process.env.NEXT_PUBLIC_BUSINESS_STATE || "NY";
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Smartphone & Laptop service Services in New York | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `Professional Smartphone, Tablet, Laptop & Desktop service in ${BUSINESS_CITY}, ${BUSINESS_STATE}. Experienced technicians, quality parts, 90-day warranty & same-day service. Request a free quote today.`,
  keywords: [
    "Smartphone service New York",
    "Tablet service NYC",
    "Laptop service New York",
    "Desktop service NYC",
    "Premium Brand Watch service New York",
    "screen replacement NYC",
    "battery replacement",
    "water damage service",
    "device service technician",
    "same day device service",
    `Smartphone service ${BUSINESS_CITY}`,
    `Laptop service ${BUSINESS_CITY}`,
    "phone service near me",
    "independent service service",
  ],
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: SITE_URL,
  },
  ...(GSC_VERIFICATION && {
    verification: {
      google: GSC_VERIFICATION,
    },
  }),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `Smartphone & Laptop service Services in ${BUSINESS_CITY} | ${siteConfig.name}`,
    description: `Professional Smartphone, Tablet, Laptop & Desktop service in ${BUSINESS_CITY}, ${BUSINESS_STATE}. Experienced technicians. 90-day warranty. Request a quote online.`,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Smartphone & Laptop service in ${BUSINESS_CITY}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Smartphone & Laptop service Services in ${BUSINESS_CITY} | ${siteConfig.name}`,
    description: `Professional Smartphone, Tablet, Laptop & Desktop service in ${BUSINESS_CITY}. 90-day warranty. Request a free quote online.`,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {GTM_ID && (
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      {/* GA4 direct — only loaded when GTM is not configured */}
      {GA_ID && !GTM_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
          </Script>
        </>
      )}
      <head>
        <StructuredData />
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {GTM_ID && (
          <noscript>
            <iframe
              height="0"
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
              width="0"
            />
          </noscript>
        )}
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <ScrollToHash />
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
