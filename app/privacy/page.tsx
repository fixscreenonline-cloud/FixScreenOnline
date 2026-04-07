import { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.fixmydevicenyc.com";

export const metadata: Metadata = {
  title: "Privacy Policy | FixMyDevice NYC",
  description:
    "Read our privacy policy to understand how FixMyDevice NYC collects, uses, and protects your personal information.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  const lastUpdated = "April 3, 2026";
  const businessName =
    process.env.NEXT_PUBLIC_BUSINESS_NAME || "FixMyDevice NYC";
  const businessEmail =
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "contact@example.com";

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Last updated: {lastUpdated}
        </p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              1. Who We Are
            </h2>
            <p>
              {businessName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) provides Apple device repair
              services. This policy explains what data we collect when you use
              our website or services, how we use it, and your rights regarding
              that data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Contact information</strong> — name, email address,
                phone number when you submit a repair enquiry.
              </li>
              <li>
                <strong>Device information</strong> — device type and
                description of the issue you provide.
              </li>
              <li>
                <strong>Usage data</strong> — pages visited, referring URL,
                browser type, and IP address collected automatically via
                analytics tools.
              </li>
              <li>
                <strong>Cookies</strong> — we use cookies for site functionality
                and Google Analytics / Google Ads tracking.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond to repair enquiries and provide quotes.</li>
              <li>To process and complete your repair.</li>
              <li>
                To send you service updates and follow-up communications related
                to your repair.
              </li>
              <li>
                To improve our website and services through aggregated
                analytics.
              </li>
              <li>
                To run targeted advertisements via Google Ads (conversion
                tracking only — no personal data shared with Google beyond what
                Google&apos;s own policies permit).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              4. Sharing of Information
            </h2>
            <p>
              We do <strong>not</strong> sell, rent, or trade your personal
              information to third parties. We may share information with:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <strong>Email service providers</strong> (e.g., Resend) strictly
                to deliver repair confirmation emails.
              </li>
              <li>
                <strong>Analytics providers</strong> (Google Analytics) under
                appropriate data processing agreements.
              </li>
              <li>
                <strong>Law enforcement</strong> when required by law.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">5. Cookies</h2>
            <p>
              We use essential cookies to operate the website and analytical
              cookies (Google Analytics, Google Ads) to understand traffic and
              measure ad performance. You may disable cookies in your browser
              settings; however, some features may stop working correctly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              6. Data Retention
            </h2>
            <p>
              We retain enquiry data for up to 2 years for record-keeping and
              warranty purposes. You may request deletion at any time by
              contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              7. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data.</li>
              <li>Opt out of marketing communications at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              8. Security
            </h2>
            <p>
              We implement industry-standard security measures including HTTPS
              encryption and access controls to protect your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              9. Contact Us
            </h2>
            <p>
              For any privacy-related questions or requests, please email us at{" "}
              <a
                className="text-violet-600 underline"
                href={`mailto:${businessEmail}`}
              >
                {businessEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
