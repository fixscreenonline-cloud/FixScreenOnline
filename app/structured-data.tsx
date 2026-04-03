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
      {
        "@type": "ListItem",
        position: 2,
        name: "Pricing",
        item: `${siteUrl}/pricing`,
      },
    ],
  };

  // AggregateRating Schema — enables star ratings in Google search results
  const ratingSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: businessName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "247",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Arjun" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "I was amazed by the quick and efficient service for my water-damaged MacBook. The team restored it to perfect working condition, saving me from buying a new one. Highly recommended!",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Priya" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "My iMac had storage issues, and the upgrade service was flawless. The team explained everything clearly, and now my device runs faster than ever.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Rajesh" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "The team successfully removed the MDM lock on my MacBook Pro. I was impressed by their professionalism and the secure handling of my device.",
      },
    ],
  };

  // FAQ Schema — enables FAQ rich results in Google search
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does a typical Apple device repair take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most screen replacements and battery swaps are completed within 1–3 hours while you wait. More complex repairs like motherboard or water damage may take 24–48 hours.",
        },
      },
      {
        "@type": "Question",
        name: "Do you use genuine Apple parts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We use OEM-grade and genuine Apple parts for all repairs to ensure the same quality, fit, and feel as the original.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a warranty on Apple device repairs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every repair comes with a 90-day warranty covering parts and workmanship. If anything goes wrong due to our repair, we'll fix it free of charge.",
        },
      },
      {
        "@type": "Question",
        name: "Can you repair water-damaged iPhones or MacBooks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — water damage is one of our specialties. Using ultrasonic cleaning and micro-soldering techniques, we successfully restore the majority of liquid-damaged Apple devices.",
        },
      },
      {
        "@type": "Question",
        name: "What is the cost of Apple device repair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Costs vary by device and repair type. We offer a free diagnostic assessment before any work begins, so you'll know the exact cost upfront with no hidden fees.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to book an appointment for repair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Walk-ins are welcome! For faster service you can submit a repair request online or call ahead. For MacBook and iMac repairs we recommend calling first.",
        },
      },
    ],
  };

  return {
    organizationSchema,
    websiteSchema,
    serviceSchema,
    breadcrumbSchema,
    ratingSchema,
    faqSchema,
  };
}

export function StructuredData() {
  const {
    organizationSchema,
    websiteSchema,
    serviceSchema,
    breadcrumbSchema,
    ratingSchema,
    faqSchema,
  } = generateStructuredData();

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
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingSchema) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        type="application/ld+json"
      />
    </>
  );
}
