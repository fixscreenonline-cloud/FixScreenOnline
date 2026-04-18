import { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.deviceservicenyc.com";

export const metadata: Metadata = {
  title: "Terms & Conditions | Device Service NYC",
  description:
    "Read our Terms & Conditions before using Device Service NYC's service services.",
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  const lastUpdated = "April 3, 2026";
  const businessName =
    process.env.NEXT_PUBLIC_BUSINESS_NAME || "Device Service NYC";
  const businessEmail =
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "contact@example.com";

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Last updated: {lastUpdated}
        </p>

        <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By using the {businessName} website or submitting a service
              request, you agree to be bound by these Terms &amp; Conditions. If
              you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              2. service Services
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                All service work is carried out by our certified technicians
                using genuine or OEM-grade parts.
              </li>
              <li>
                A free diagnostic assessment is performed before any service
                begins. The final cost is communicated and approved by the
                customer before work commences.
              </li>
              <li>
                We reserve the right to refuse a service if the device is deemed
                irreparable, or if proceeding would pose a health or safety
                risk.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              3. Warranty
            </h2>
            <p>
              All completed services carry a <strong>90-day warranty</strong>{" "}
              covering the specific service performed and the parts used. This
              warranty does not cover:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>New physical damage, liquid damage, or accidental damage.</li>
              <li>Damage caused by unauthorised third-party services.</li>
              <li>Software issues unrelated to the service performed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              4. No restore – No Fee
            </h2>
            <p>
              If we are unable to service your device, you will not be charged
              for labour. Diagnostic fees (if any) will be communicated upfront.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              5. Customer Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                You confirm you are the rightful owner of the device submitted
                for service, or have authorisation from the owner.
              </li>
              <li>
                You are responsible for backing up your data before handing in
                the device. We are not liable for any data loss during service.
              </li>
              <li>
                Devices not collected within 60 days of completion may be
                disposed of at our discretion.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              Our liability is limited to the cost of the service performed. We
              are not liable for any indirect, consequential, or incidental
              damages arising from our services or the unavailability of your
              device during service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              7. Intellectual Property
            </h2>
            <p>
              {businessName} is an independent service service and is{" "}
              <strong>not affiliated with Premium Brand Inc.</strong> All product names,
              trademarks, and brand names belong to their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              8. Changes to Terms
            </h2>
            <p>
              We reserve the right to update these terms at any time. Continued
              use of our services after changes constitutes acceptance of the
              revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">9. Contact</h2>
            <p>
              Questions about these terms? Email us at{" "}
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
