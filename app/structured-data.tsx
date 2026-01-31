export function generateStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";
  const businessName =
    process.env.NEXT_PUBLIC_BUSINESS_NAME || "Apple Repair Pro";
  const businessEmail =
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "contact@example.com";
  const businessPhone =
    process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1-555-123-4567";
  const businessAddress =
    process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ||
    "123 Tech Street, San Francisco, CA 94102, USA";
  const businessCity = process.env.NEXT_PUBLIC_BUSINESS_CITY || "San Francisco";
  const businessState = process.env.NEXT_PUBLIC_BUSINESS_STATE || "CA";
  const businessPostalCode =
    process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE || "94102";
  const businessCountry =
    process.env.NEXT_PUBLIC_BUSINESS_COUNTRY || "United States";

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: businessName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.png`,
    description:
      "Expert Apple device repair services with certified technicians. Same-day repairs available.",
    telephone: businessPhone,
    email: businessEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessAddress,
      addressLocality: businessCity,
      addressRegion: businessState,
      postalCode: businessPostalCode,
      addressCountry: businessCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: process.env.NEXT_PUBLIC_BUSINESS_LATITUDE || "37.7749",
      longitude: process.env.NEXT_PUBLIC_BUSINESS_LONGITUDE || "-122.4194",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$",
    sameAs: [
      process.env.NEXT_PUBLIC_FACEBOOK_URL,
      process.env.NEXT_PUBLIC_TWITTER_URL,
      process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      process.env.NEXT_PUBLIC_LINKEDIN_URL,
    ].filter(Boolean),
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: businessName,
    description: "Professional Apple device repair services",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Apple Device Repair",
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    areaServed: {
      "@type": "City",
      name: businessCity,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Apple Device Repair Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "iPhone Repair",
            description:
              "Screen replacement, battery replacement, and other iPhone repairs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "iPad Repair",
            description:
              "Screen replacement, battery replacement, and other iPad repairs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "MacBook Repair",
            description:
              "Hardware repair, software troubleshooting, and MacBook maintenance",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "iMac Repair",
            description:
              "Hardware repair, software troubleshooting, and iMac maintenance",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Apple Watch Repair",
            description:
              "Screen replacement, battery replacement, and other Apple Watch repairs",
          },
        },
      ],
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
    ],
  };

  return {
    organizationSchema,
    websiteSchema,
    serviceSchema,
    breadcrumbSchema,
  };
}

export function StructuredData() {
  const { organizationSchema, websiteSchema, serviceSchema, breadcrumbSchema } =
    generateStructuredData();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        type="application/ld+json"
      />
    </>
  );
}
