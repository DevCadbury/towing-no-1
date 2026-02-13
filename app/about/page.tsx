import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - TowingNo.1 Surrey BC",
  description: "Learn about TowingNo.1, Surrey's trusted 24/7 emergency towing and roadside assistance provider. Serving Surrey, BC since 2026 with professional, reliable service.",
  openGraph: {
    title: "About TowingNo.1 - Emergency Towing Surrey BC",
    description: "Learn about our team and commitment to providing fast, reliable roadside assistance in Surrey.",
  },
};

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2000"
            alt="TowingNo.1 team"
            fill
            className="object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 container-custom text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About TowingNo.1</h1>
          <p className="text-xl text-gray-200">
            Serving Surrey with reliable roadside assistance since 2026
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                TowingNo.1 was founded in 2026 with a simple mission: to provide Surrey drivers with fast, reliable, and affordable emergency towing and roadside assistance.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We understand how stressful it can be when your vehicle breaks down unexpectedly. Whether you're stranded on the highway at 2am or stuck in a parking lot during rush hour, our team is ready to help you get back on the road safely.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our operators have over 15 years of combined experience in the towing and roadside assistance industry. We take pride in our professionalism, quick response times, and commitment to customer satisfaction.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Based in Surrey, British Columbia, we serve drivers throughout the region with 24/7 availability, 365 days a year.
              </p>
            </div>
            <div className="relative h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200"
                alt="Professional tow truck service"
                fill
                className="object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg">
              What drives us to provide the best service possible
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-md text-center">
              <div className="text-primary text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Fast Response</h3>
              <p className="text-gray-600">
                We know every minute counts in an emergency. Our team is trained to respond quickly and efficiently to get you back on the road as soon as possible.
              </p>
            </div>

            <div className="bg-white p-8 shadow-md text-center">
              <div className="text-primary text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Safety First</h3>
              <p className="text-gray-600">
                Your safety and the safety of your vehicle are our top priorities. We use proper equipment and techniques to ensure safe towing and recovery.
              </p>
            </div>

            <div className="bg-white p-8 shadow-md text-center">
              <div className="text-primary text-5xl mb-4">💯</div>
              <h3 className="text-xl font-bold mb-3">Honest Service</h3>
              <p className="text-gray-600">
                We believe in transparent pricing with no hidden fees. You'll know exactly what to expect before we start any work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TowingNo.1</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="text-primary text-3xl">✓</div>
              <div>
                <h3 className="font-bold mb-2">24/7 Availability</h3>
                <p className="text-gray-600">
                  We're always here when you need us, day or night, weekends and holidays.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-primary text-3xl">✓</div>
              <div>
                <h3 className="font-bold mb-2">Experienced Operators</h3>
                <p className="text-gray-600">
                  Our team has the skills and experience to handle any roadside emergency.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-primary text-3xl">✓</div>
              <div>
                <h3 className="font-bold mb-2">Modern Equipment</h3>
                <p className="text-gray-600">
                  We use well-maintained, professional-grade tow trucks and equipment.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-primary text-3xl">✓</div>
              <div>
                <h3 className="font-bold mb-2">Competitive Pricing</h3>
                <p className="text-gray-600">
                  Fair rates with no surprise charges. We believe in honest, transparent pricing.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-primary text-3xl">✓</div>
              <div>
                <h3 className="font-bold mb-2">Local Knowledge</h3>
                <p className="text-gray-600">
                  As a Surrey-based company, we know the area and can reach you quickly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-primary text-3xl">✓</div>
              <div>
                <h3 className="font-bold mb-2">Customer Focused</h3>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We're not happy until you're safely back on the road.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Our Service?
          </h2>
          <p className="text-xl mb-8">
            We're available 24/7 to assist you
          </p>
          <a
            href="tel:+16045551234"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-12 text-lg transition-colors"
          >
            Call (604) 555-1234
          </a>
        </div>
      </section>
    </>
  );
}
