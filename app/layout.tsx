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
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.fixmydevicenyc.com";
const BUSINESS_CITY = process.env.NEXT_PUBLIC_BUSINESS_CITY || "Hicksville";
const BUSINESS_STATE = process.env.NEXT_PUBLIC_BUSINESS_STATE || "NY";
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Apple Device Repair in ${BUSINESS_CITY}, ${BUSINESS_STATE} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `Expert iPhone, iPad, MacBook & iMac repair in ${BUSINESS_CITY}, ${BUSINESS_STATE}. Certified technicians, genuine parts, 90-day warranty & same-day service. Get a free quote today.`,
  keywords: [
    "Apple repair",
    "iPhone repair",
    "iPad repair",
    "MacBook repair",
    "iMac repair",
    "Apple Watch repair",
    "screen replacement",
    "battery replacement",
    "water damage repair",
    "certified Apple technicians",
    "same day Apple repair",
    `Apple repair ${BUSINESS_CITY}`,
    `iPhone repair ${BUSINESS_CITY}`,
    `MacBook repair ${BUSINESS_CITY}`,
    "phone repair near me",
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
    title: `Apple Device Repair in ${BUSINESS_CITY} | ${siteConfig.name}`,
    description: `Fast, affordable Apple repairs in ${BUSINESS_CITY}, ${BUSINESS_STATE}. iPhone, iPad, MacBook & iMac. Certified techs. 90-day warranty. Book online.`,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Apple Device Repair in ${BUSINESS_CITY}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Apple Device Repair in ${BUSINESS_CITY} | ${siteConfig.name}`,
    description: `Fast, affordable Apple repairs in ${BUSINESS_CITY}. iPhone, iPad, MacBook & iMac. 90-day warranty. Book online.`,
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
