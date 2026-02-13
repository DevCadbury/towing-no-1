"use client";

import { useState } from "react";
import type { Metadata } from "next";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Thank you for your message! We'll get back to you shortly.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200">
            Available 24/7 for emergency roadside assistance
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible. For immediate assistance, please call us directly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary"
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-bold mb-2">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary"
                  >
                    <option value="">Select a service</option>
                    <option value="emergency-towing">Emergency Towing</option>
                    <option value="flat-tire">Flat Tire Assistance</option>
                    <option value="battery-boost">Battery Boost & Jumpstart</option>
                    <option value="vehicle-recovery">Vehicle Recovery</option>
                    <option value="lockout">Lockout Services</option>
                    <option value="long-distance">Long Distance Towing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary"
                    placeholder="Tell us about your situation or question"
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="text-primary text-2xl">📞</div>
                  <div>
                    <p className="font-bold mb-1">Emergency Hotline (24/7)</p>
                    <a href="tel:+16045551234" className="text-xl text-primary hover:underline">
                      (604) 555-1234
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      Call anytime for immediate assistance
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-primary text-2xl">✉️</div>
                  <div>
                    <p className="font-bold mb-1">Email</p>
                    <a href="mailto:info@towing-no-1.com" className="text-primary hover:underline">
                      info@towing-no-1.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      For non-urgent inquiries
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-primary text-2xl">📍</div>
                  <div>
                    <p className="font-bold mb-1">Service Area</p>
                    <p className="text-gray-700">Surrey, British Columbia</p>
                    <p className="text-gray-700">Canada</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Serving all of Surrey and surrounding areas
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-primary text-2xl">🕐</div>
                  <div>
                    <p className="font-bold mb-1">Business Hours</p>
                    <p className="text-gray-700 font-semibold">24/7 - Always Open</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Available every day of the year
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 h-[350px] flex items-center justify-center shadow-md">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600 font-bold">Surrey, BC Service Area</p>
                  <p className="text-sm text-gray-500 mt-1">Proudly serving the community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Right Now?
          </h2>
          <p className="text-xl mb-8">
            Don't wait - call us immediately for emergency assistance
          </p>
          <a
            href="tel:+16045551234"
            className="inline-block bg-white text-primary hover:bg-gray-100 font-bold py-4 px-12 text-lg transition-colors"
          >
            Call (604) 555-1234 Now
          </a>
        </div>
      </section>
    </>
  );
}
