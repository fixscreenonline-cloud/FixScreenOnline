import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://applerepairpro.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep Ads LP and API routes out of Google's index
        disallow: ["/lp", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
