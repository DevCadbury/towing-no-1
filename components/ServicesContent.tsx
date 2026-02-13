"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicesContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white">
        <Image
          src="/service.jpg"
          alt="Our Services"
          fill
          sizes="100vw"
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl drop-shadow-md">
            Comprehensive roadside assistance and towing solutions
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-16">
            {/* Service 1 - Emergency Towing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative h-[400px] overflow-hidden shadow-xl group cursor-pointer"
              >
                <Image
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200"
                  alt="Emergency towing service"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-orange-600/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">24/7 Available</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-4">Emergency Towing</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  When your vehicle breaks down unexpectedly, our emergency towing service is here to help. We provide fast response 24/7, ensuring your vehicle is transported safely to your destination of choice.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our modern tow trucks can handle vehicles of all sizes, from compact cars to larger SUVs and trucks. We use proper securing techniques to protect your vehicle during transport.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>24/7 emergency response</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Safe vehicle transport</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Towing to repair shop or home</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>All vehicle types accepted</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Service 2 - Flat Tire */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-2 md:order-1"
              >
                <h2 className="text-3xl font-bold mb-4">Flat Tire Assistance</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Got a flat tire? Our team can help you get back on the road. We'll either change your tire on-site using your spare, or tow your vehicle to the nearest tire shop if needed.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Whether you're on the highway or in a parking lot, we'll arrive quickly with the tools needed to get you moving again safely.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>On-site tire changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Towing to tire shop if needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Professional tire installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Quick response time</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative h-[400px] overflow-hidden shadow-xl group cursor-pointer order-1 md:order-2"
              >
                <Image
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200"
                  alt="Flat tire assistance"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/80 via-orange-600/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 text-white text-right">
                  <h3 className="text-2xl font-bold">Fast Service</h3>
                </div>
              </motion.div>
            </motion.div>

            {/* Service 3 - Battery Boost */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative h-[400px] overflow-hidden shadow-xl group cursor-pointer"
              >
                <Image
                  src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1200"
                  alt="Battery boost and jumpstart service"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-orange-600/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">Quick Boost</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-4">Battery Boost & Jumpstart</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Dead battery? Don't worry - we provide fast jumpstart service to get your vehicle running again. Our technicians will safely boost your battery and ensure your vehicle is ready to drive.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We'll also test your battery and charging system to help identify any underlying issues that may have caused the problem.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Quick jumpstart service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Battery testing available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Safe boosting procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Available 24/7</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Service 4 - Vehicle Recovery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-2 md:order-1"
              >
                <h2 className="text-3xl font-bold mb-4">Vehicle Recovery</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Stuck in a ditch, snow bank, or difficult position? Our vehicle recovery service can help. We have the equipment and experience to safely extract your vehicle from challenging situations.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  From minor incidents to complex recovery operations, our team has the skills to get your vehicle back on solid ground without causing additional damage.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Ditch and off-road recovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Accident scene assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Professional winching service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Minimal vehicle damage</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative h-[400px] overflow-hidden shadow-xl group cursor-pointer order-1 md:order-2"
              >
                <Image
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200"
                  alt="Vehicle recovery service"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-primary/80 via-orange-600/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 text-white text-right">
                  <h3 className="text-2xl font-bold">Expert Recovery</h3>
                </div>
              </motion.div>
            </motion.div>

            {/* Service 5 - Lockout Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative h-[400px] overflow-hidden shadow-xl group cursor-pointer"
              >
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200"
                  alt="Lockout service"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-orange-600/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">Locked Out?</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-4">Lockout Services</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Locked your keys in the car? We've all been there. Our lockout service can help you regain access to your vehicle quickly and without damage.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our experienced technicians use professional tools and techniques to unlock your vehicle safely, getting you back inside in no time.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Fast lockout response</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>No damage to vehicle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Professional tools and techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Available day or night</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Service 6 - Long Distance Towing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-2 md:order-1"
              >
                <h2 className="text-3xl font-bold mb-4">Long Distance Towing</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Need to transport your vehicle across the province or to another city? Our long distance towing service provides reliable vehicle transportation for any distance.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Whether you're relocating, purchasing a vehicle from another area, or need to transport a non-running vehicle, we can help get it to its destination safely.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Province-wide service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Towing to repair shop or home</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Competitive distance rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Scheduled or emergency service</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative h-[400px] overflow-hidden shadow-xl group cursor-pointer order-1 md:order-2"
              >
                <Image
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200"
                  alt="Long distance towing"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-primary/80 via-orange-600/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 text-white text-right">
                  <h3 className="text-2xl font-bold">Long Haul</h3>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Any of These Services?
          </h2>
          <p className="text-xl mb-8">
            Call us now - we're available 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+16045551234"
              className="inline-block bg-white text-primary hover:bg-gray-100 font-bold py-4 px-12 text-lg transition-colors"
            >
              Call (604) 555-1234
            </a>
            <Link
              href="/contact"
              className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-4 px-12 text-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
