import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TowingNo.1",
  description:
    "Read how TowingNo.1 collects, uses, and protects personal information for towing and roadside assistance requests across Surrey and the Lower Mainland.",
  alternates: {
    canonical: "https://towing-no-1.com/privacy",
  },
  openGraph: {
    type: "website",
    url: "https://towing-no-1.com/privacy",
    title: "Privacy Policy | TowingNo.1",
    description:
      "How TowingNo.1 collects and protects customer information for 24/7 towing and roadside service dispatch.",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | TowingNo.1",
    description:
      "How TowingNo.1 collects and protects customer information for dispatch and roadside service.",
  },
};

export default function PrivacyPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: April 12, 2026</p>

        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>
            TowingNo.1 values your privacy. This policy explains how we collect, use, and protect information when
            you contact us for towing and roadside assistance services.
          </p>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Information We Collect</h2>
            <p>
              We may collect your name, phone number, vehicle details, service location, and any information you
              provide through phone calls, forms, email, or chat.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">How We Use Information</h2>
            <p>
              We use this information to dispatch roadside services, communicate ETAs, provide quotes, process
              payments, improve service quality, and comply with legal obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Information Sharing</h2>
            <p>
              We only share information with trusted staff or partners needed to deliver service, and with legal
              authorities when required by law. We do not sell personal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Data Security</h2>
            <p>
              We apply reasonable technical and organizational safeguards to protect your data from unauthorized
              access, disclosure, or misuse.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Contact</h2>
            <p>
              For privacy questions, contact us at <a href="mailto:info@towing-no-1.com" className="text-amber-600 font-semibold hover:text-amber-700">info@towing-no-1.com</a> or call <a href="tel:+17788380014" className="text-amber-600 font-semibold hover:text-amber-700">(778) 838-0014</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
