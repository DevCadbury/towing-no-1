"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";

export default function HomeContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <Image
          src="/background_home.jpg"
          alt="Emergency Towing Service"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            24/7 Emergency Towing in Surrey, BC
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            Fast, Reliable, and Professional Roadside Assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+16045551234"
              className="btn-primary inline-block"
            >
              Call Now: (604) 555-1234
            </a>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 transition-colors inline-block"
            >
              Request Service
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">
              Professional towing and roadside assistance when you need it most
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative h-[320px] overflow-hidden shadow-lg cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800"
                alt="Emergency Towing"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-2xl font-bold mb-2">Emergency Towing (24/7 Service)</h3>
                  <p className="text-gray-200 leading-relaxed">
                    We tow cars, SUVs, and light trucks safely at any time. Fast response 24/7.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative h-[320px] overflow-hidden shadow-lg cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800"
                alt="Flat Tire Assistance"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-2xl font-bold mb-2">Flat Tire Help</h3>
                  <p className="text-gray-200 leading-relaxed">
                    We replace or fix flat tires on-site so you can continue your trip.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative h-[320px] overflow-hidden shadow-lg cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800"
                alt="Battery Boost"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-2xl font-bold mb-2">Battery Boost and Jumpstart</h3>
                  <p className="text-gray-200 leading-relaxed">
                    If your vehicle won't start, we jump-start it immediately.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group relative h-[320px] overflow-hidden shadow-lg cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800"
                alt="Vehicle Recovery"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-2xl font-bold mb-2">Accident Recovery</h3>
                  <p className="text-gray-200 leading-relaxed">
                    We handle accident recovery carefully with safety and efficiency.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group relative h-[320px] overflow-hidden shadow-lg cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800"
                alt="Lockout Service"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-2xl font-bold mb-2">Lockout Service</h3>
                  <p className="text-gray-200 leading-relaxed">
                    If you lock your keys inside, our team opens your vehicle safely.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="group relative h-[320px] overflow-hidden shadow-lg cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800"
                alt="Long Distance Towing"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-2xl font-bold mb-2">Vehicle Transport</h3>
                  <p className="text-gray-200 leading-relaxed">
                    We move vehicles securely between locations with on-time pickup.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="group relative h-[320px] overflow-hidden shadow-lg cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1585574701537-7bbed9a60757?q=80&w=800"
                alt="Fuel Delivery"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-2xl font-bold mb-2">Fuel Delivery</h3>
                  <p className="text-gray-200 leading-relaxed">
                    If you run out of fuel, we deliver what you need to reach the nearest station.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="group relative h-[320px] overflow-hidden shadow-lg cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800"
                alt="Winching and Extraction"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <h3 className="text-2xl font-bold mb-2">Winching and Extraction</h3>
                  <p className="text-gray-200 leading-relaxed">
                    If your vehicle gets stuck in mud, snow, or a ditch, we pull it out safely.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary inline-block">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TowingNo.1?</h2>
            <p className="text-xl text-gray-600">
              Your trusted partner for roadside emergencies in Surrey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-primary text-5xl md:text-6xl font-bold mb-3">
                24/7
              </div>
              <h3 className="text-xl font-bold mb-2">Always Available</h3>
              <p className="text-gray-600">
                Round-the-clock service every day of the year
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-primary text-5xl md:text-6xl font-bold mb-3">
                &lt;<Counter value={30} duration={2} />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Response</h3>
              <p className="text-gray-600">
                Average response time under 30 minutes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-primary text-5xl md:text-6xl font-bold mb-3">
                <Counter value={15} duration={2} suffix="+" />
              </div>
              <h3 className="text-xl font-bold mb-2">Years Experience</h3>
              <p className="text-gray-600">
                Over 15 years serving Surrey communities
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-primary text-5xl md:text-6xl font-bold mb-3">
                $
              </div>
              <h3 className="text-xl font-bold mb-2">Affordable Rates</h3>
              <p className="text-gray-600">
                Fair pricing with no hidden fees
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">
              Real experiences from satisfied customers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex gap-1 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "Called TowingNo.1 at 2 AM when my car broke down on the highway. They arrived in 20 minutes and had me home safely. Excellent service!"
              </p>
              <p className="font-bold">- Sarah M.</p>
            </div>
            <div className="card">
              <div className="flex gap-1 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "Professional, friendly, and fast. The driver took great care with my vehicle. Will definitely use them again if needed."
              </p>
              <p className="font-bold">- Michael T.</p>
            </div>
            <div className="card">
              <div className="flex gap-1 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4 italic">
                "Best towing company in Surrey! Fair prices and they really care about helping people. Highly recommend."
              </p>
              <p className="font-bold">- Jennifer L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Emergency Assistance?
          </h2>
          <p className="text-xl mb-8">
            We're available 24/7 - Call us now!
          </p>
          <a
            href="tel:+16045551234"
            className="inline-block bg-white text-primary hover:bg-gray-100 font-bold py-4 px-12 text-lg transition-colors"
          >
            (604) 555-1234
          </a>
        </div>
      </section>
    </>
  );
}
