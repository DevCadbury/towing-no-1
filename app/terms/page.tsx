import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | TowingNo.1",
  description:
    "Read the service terms for TowingNo.1 emergency towing and roadside assistance across Surrey and the Lower Mainland.",
  alternates: {
    canonical: "https://towing-no-1.com/terms",
  },
  openGraph: {
    type: "website",
    url: "https://towing-no-1.com/terms",
    title: "Terms of Service | TowingNo.1",
    description:
      "Service terms, dispatch conditions, and customer responsibilities for TowingNo.1 roadside services.",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | TowingNo.1",
    description:
      "Service terms and dispatch conditions for TowingNo.1 towing and roadside assistance.",
  },
};

export default function TermsPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: April 12, 2026</p>

        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>
            These Terms of Service govern your use of TowingNo.1 towing and roadside assistance services. By
            requesting service, you agree to these terms.
          </p>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Service Availability</h2>
            <p>
              We provide 24/7 dispatch, but arrival times are estimates and may vary due to traffic, weather,
              location, or demand.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Quotes and Pricing</h2>
            <p>
              Upfront quotes are based on details available at dispatch. Final charges may change if on-site
              conditions differ materially from the initial request.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Customer Responsibilities</h2>
            <p>
              You are responsible for providing accurate service location details, vehicle information, and lawful
              authorization to request towing or roadside support.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Limitations</h2>
            <p>
              TowingNo.1 is not liable for delays or service limitations caused by force majeure events, road
              closures, unsafe conditions, or inaccurate request details.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Contact</h2>
            <p>
              For questions about these terms, email <a href="mailto:info@towing-no-1.com" className="text-amber-600 font-semibold hover:text-amber-700">info@towing-no-1.com</a> or call <a href="tel:+17788380014" className="text-amber-600 font-semibold hover:text-amber-700">(778) 838-0014</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
