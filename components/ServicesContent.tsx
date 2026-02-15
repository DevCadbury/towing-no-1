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
                <h2 className="text-3xl font-bold mb-4">Emergency Towing (24/7 Service)</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We tow cars, SUVs, and light trucks safely at any time of day. Our operators secure your vehicle properly and transport it with care.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  When your vehicle breaks down unexpectedly, our cheap towing Surrey service provides fast response 24/7, ensuring your vehicle is transported safely to your destination of choice.
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
                <h2 className="text-3xl font-bold mb-4">Flat Tire Help</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We replace or fix flat tires on-site so you can continue driving without delay.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Whether you're on the highway or in a parking lot, our team arrives quickly with the tools needed to get you moving again safely.
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
                <h2 className="text-3xl font-bold mb-4">Battery Boost and Jumpstart</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  If your vehicle won't start, we jump-start it immediately and help you get back on the road.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our technicians safely boost your battery and ensure your vehicle is ready to drive. We also test your battery and charging system to help identify any underlying issues.
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
                <h2 className="text-3xl font-bold mb-4">Accident Recovery</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We handle accident recovery carefully and transport damaged vehicles safely to the right destination.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  From minor fender benders to serious collisions, our Surrey-wide towing team has the skills and equipment to recover your vehicle and transport it securely without causing additional damage.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Professional accident recovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Damaged vehicle transport</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Safe securing techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Insurance coordination available</span>
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
                <h2 className="text-3xl font-bold mb-4">Lockout Service</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  If you lock your keys inside, our team opens your vehicle safely without causing damage.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our experienced technicians use professional tools and techniques to unlock your vehicle quickly, getting you back inside and on your way in no time.
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
                <h2 className="text-3xl font-bold mb-4">Vehicle Transport</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We move vehicles securely between locations with on-time pickup and delivery by professional tow operators.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Whether you're relocating, purchasing a vehicle from another area, or need to transport a non-running vehicle across the province, we provide reliable vehicle transportation for any distance.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Secure vehicle transport</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>On-time pickup and delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Professional tow operators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Province-wide coverage</span>
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
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-primary/80 via-orange-600/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 text-white text-right">
                  <h3 className="text-2xl font-bold">Vehicle Transport</h3>
                </div>
              </motion.div>
            </motion.div>

            {/* Service 7 - Fuel Delivery */}
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
                  src="https://images.unsplash.com/photo-1545262810-77515befe149?q=80&w=1200"
                  alt="Fuel delivery service"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-orange-600/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">Emergency Fuel</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-4">Fuel Delivery</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  If you run out of fuel, we deliver what you need so you can reach the nearest station easily.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our fuel delivery service brings gasoline or diesel directly to your location, getting you back on the road quickly without the need for a tow.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Emergency fuel delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Gasoline and diesel available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Quick roadside service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Available 24/7</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Service 8 - Winching and Extraction */}
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
                <h2 className="text-3xl font-bold mb-4">Winching and Extraction</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  If your vehicle gets stuck in mud, snow, or a ditch, we pull it out safely using proper winching techniques.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our Surrey-wide towing team uses professional winching equipment and techniques to extract your vehicle from challenging situations without causing damage to your vehicle or the surrounding area.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Safe winching techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Mud, snow, and ditch recovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Professional equipment</span>
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
                  src="https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?q=80&w=1200"
                  alt="Winching and extraction service"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-primary/80 via-orange-600/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 text-white text-right">
                  <h3 className="text-2xl font-bold">Expert Extraction</h3>
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
