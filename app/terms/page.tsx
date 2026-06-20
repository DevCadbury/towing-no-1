import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | TowingNo.1",
  description:
    "Read the service terms for TowingNo.1 emergency towing and roadside assistance across Surrey and the Lower Mainland.",
  alternates: {
    canonical: "https://www.towingno1.com/terms",
  },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/terms",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://www.towingno1.com/terms" },
  ],
};

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: April 12, 2026</p>

        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>
            These Terms of Service set out the agreement between you and TowingNo.1 when you request emergency
            towing or roadside assistance from us anywhere in Surrey and the Lower Mainland of British Columbia.
            By calling our dispatch line, submitting our online form, or accepting service from one of our drivers,
            you agree to the terms below. Please read them carefully so you know what to expect from us and what we
            ask of you in return.
          </p>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Scope of Services</h2>
            <p>
              TowingNo.1 offers light- and medium-duty towing, battery boosts, flat-tire changes, fuel delivery,
              lockout assistance, winching and extraction, accident recovery, and vehicle transport. The specific
              service provided depends on what you request and on what our driver can safely perform once on site.
              Some situations, such as a vehicle trapped in an unsafe position or a job requiring heavy-duty
              equipment, may require a specialized provider; in those cases we will tell you and help you find the
              right help.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Dispatch and Arrival Estimates</h2>
            <p>
              Our dispatch line operates around the clock, and we work hard to reach you quickly. Any arrival window
              we give you is a good-faith estimate, not a guarantee. Real-world conditions such as traffic, weather,
              road closures, distance, and how busy the fleet is can change how long it takes a driver to reach you.
              We will keep you informed if an estimate changes, but we are not liable for losses caused by a delay
              that is outside our reasonable control.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Quotes, Pricing, and Payment</h2>
            <p>
              Wherever possible we provide a flat-rate quote before we dispatch, based on the location, vehicle, and
              service you describe. That quote assumes the details you give us are accurate. If conditions on site
              differ materially, for example the vehicle is heavier than described, located somewhere that needs
              winching, or requires additional time or equipment, the final price may be adjusted, and our driver
              will explain any change before proceeding. Payment is due on completion of the job unless we have
              agreed otherwise in writing. Our drivers accept major credit cards, debit, and cash through on-site
              terminals.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Cancellations</h2>
            <p>
              You may cancel a request at any time before the driver arrives. If a driver has already been
              dispatched and is en route or on site when you cancel, a reasonable call-out or cancellation fee may
              apply to cover the time and travel involved. We will always tell you if a cancellation fee applies so
              there are no surprises.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Customer Responsibilities</h2>
            <p>
              To help us serve you safely, you agree to provide accurate location and vehicle details, to confirm
              that you are the owner of the vehicle or are otherwise authorized to request service for it, and to
              remove personal valuables before the vehicle is towed. Please follow any safety instructions our
              dispatcher or driver gives you, stay clear of live traffic while you wait, and disclose any hazards
              such as leaking fluids or a modified or low-clearance vehicle that could affect how the work is done.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Vehicle Handling and Insurance</h2>
            <p>
              TowingNo.1 is licensed and insured, and our drivers are trained to load, secure, and transport
              vehicles with care. We take reasonable steps to avoid damage, but normal towing of a vehicle that is
              already damaged, non-standard, or improperly maintained carries inherent risk. Any concern about the
              condition of your vehicle should be raised with the driver at pickup and reported to us promptly so we
              can document and review it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, TowingNo.1 is not responsible for indirect, incidental, or
              consequential losses arising from a delay, a service limitation, or events beyond our reasonable
              control, including weather, force majeure, unsafe road conditions, or inaccurate information provided
              at the time of the request. Nothing in these terms limits any rights you have under applicable
              consumer-protection law that cannot lawfully be excluded.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Governing Law</h2>
            <p>
              These terms are governed by the laws of the Province of British Columbia and the applicable laws of
              Canada, and any dispute relating to our services will be dealt with in the courts of British Columbia.
              We may update these terms from time to time; the version in effect is the one posted on this page, and
              the date above reflects the most recent revision.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Contact</h2>
            <p>
              If you have questions about these terms or a specific job, email <a href="mailto:info@towingno1.com" className="text-amber-600 font-semibold hover:text-amber-700">info@towingno1.com</a> or call <a href="tel:+17788380014" className="text-amber-600 font-semibold hover:text-amber-700">(778) 838-0014</a> and our team will be glad to help.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
