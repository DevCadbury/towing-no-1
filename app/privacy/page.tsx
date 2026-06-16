import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TowingNo.1",
  description:
    "Read how TowingNo.1 collects, uses, and protects personal information for towing and roadside assistance requests across Surrey and the Lower Mainland.",
  alternates: {
    canonical: "https://www.towingno1.com/privacy",
  },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/privacy",
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
            TowingNo.1 provides 24/7 emergency towing and roadside assistance throughout Surrey and the
            Lower Mainland of British Columbia. We understand that most people reach out to us during a
            stressful moment at the side of the road, and that the details you share with us, your name,
            where you are stranded, and what is wrong with your vehicle, are personal. This Privacy Policy
            explains in plain language what information we collect, why we collect it, how we use and protect
            it, and the choices and rights you have. It applies to information gathered through our website,
            our online contact form, telephone calls to our dispatch line, text messages, and email.
          </p>
          <p>
            We have written this policy to align with the principles of Canada&apos;s Personal Information
            Protection and Electronic Documents Act (PIPEDA) and British Columbia&apos;s Personal Information
            Protection Act (PIPA). In short, we collect only what we genuinely need to dispatch help and run
            our business honestly, we use it only for the purposes described here, and we never sell it.
          </p>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Information We Collect</h2>
            <p>
              When you request service, we typically collect your name, the phone number we can call you back
              on, your email address, your current location or the address where your vehicle is stranded, your
              vehicle&apos;s make, model, and condition, and any message or description of the problem you choose
              to provide. This information reaches us in a few ways: through the contact form on our website,
              when you call or text our dispatch line, and during email correspondence about a quote or a
              completed job. If you pay our driver on site, the payment itself is handled by our card terminal
              or processor; we do not store full card numbers on our systems.
            </p>
            <p>
              We also receive limited technical information automatically when you visit our website, such as your
              approximate region, browser type, the pages you view, and how you arrived at the site. This is
              standard analytics data used to understand which pages are helpful and to keep the site running
              smoothly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">How We Use Your Information</h2>
            <p>
              The information you give us is used to dispatch a tow truck or roadside technician to your location,
              to call or text you with an estimated arrival time, to prepare a flat-rate quote before we send a
              driver, and to follow up after the job if there is an outstanding question, an invoice, or a request
              for feedback. We may also use your contact details to respond to general inquiries, to keep a basic
              service record for warranty or dispute purposes, and to meet our legal, tax, and insurance
              obligations. We do not use your personal details to send unrelated marketing, and we will not add
              you to a promotional list without your agreement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Cookies, Analytics, and Advertising</h2>
            <p>
              Our website uses Google Tag Manager, Google Analytics, and Google AdSense. These services place
              cookies or similar identifiers in your browser so we can measure site traffic, understand how
              visitors use our pages, and display advertising that helps fund the site. Through these tools,
              third parties including Google may use cookies to collect information such as your device type,
              general location, and browsing activity in order to provide analytics and to serve and personalize
              ads. You can control or disable cookies through your browser settings, and you can review or adjust
              the way Google uses data for advertising through Google&apos;s own Ads Settings and the
              privacy controls it provides. Disabling cookies will not stop you from requesting towing service by
              phone or through our form.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">How We Share Information</h2>
            <p>
              Your details are shared only with the people and partners directly involved in getting you help. That
              means the dispatcher who takes your call and the driver or technician assigned to your job, who needs
              your location and vehicle information to reach you. We may share information with our payment processor
              to complete a transaction, and with insurers, regulators, or law enforcement where we are required to
              do so by law or where it is necessary to protect safety or our legal rights. We do not sell, rent, or
              trade your personal information to anyone for their own marketing.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Data Retention and Security</h2>
            <p>
              We keep personal information only for as long as it is needed to deliver the service, to handle any
              follow-up or dispute, and to satisfy accounting, tax, and legal requirements, after which it is
              securely deleted or anonymized. We apply reasonable physical, technical, and organizational
              safeguards, such as restricted access and secure handling of records, to protect your information
              against loss, theft, and unauthorized access, use, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Your Rights and Choices</h2>
            <p>
              You have the right to ask what personal information we hold about you, to request a correction if
              something is inaccurate, and to ask us to delete information we are no longer required to keep. You
              may also withdraw consent to non-essential communications at any time. To make any of these requests,
              contact us using the details below and we will respond within a reasonable timeframe. We may need to
              confirm your identity before acting on a request to protect your privacy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Where We Operate</h2>
            <p>
              TowingNo.1 serves customers across British Columbia, Canada, and your information is handled in
              accordance with applicable Canadian and British Columbia privacy law. If we make material changes to
              this policy, we will update the date shown above and post the revised version on this page.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Contact Us About Privacy</h2>
            <p>
              If you have questions about this policy, or you would like to access, correct, or delete your
              information, email <a href="mailto:info@towingno1.com" className="text-amber-600 font-semibold hover:text-amber-700">info@towingno1.com</a> or call <a href="tel:+17788380014" className="text-amber-600 font-semibold hover:text-amber-700">(778) 838-0014</a>. We are happy to walk you through how your information is used and to
              address any concern you may have.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
