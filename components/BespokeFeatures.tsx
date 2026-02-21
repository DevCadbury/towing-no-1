"use client";

import { motion } from "framer-motion";
import { ThunderboltIcon, ClockIcon, ShieldIcon, TagIcon } from "@/components/Icons";

interface FeatureCardProps {
    title: string;
    desc: string;
    IconComponent: React.ComponentType<{ className?: string }>;
    index: number;
}

export default function BespokeFeatures() {
    const features = [
        {
            title: "Rapid Response",
            desc: "Our GPS-dispatched fleet ensures we're on-site in 15 mins or less.",
            IconComponent: ThunderboltIcon,
        },
        {
            title: "24/7 Availability",
            desc: "Day or night, rain or shine, we are always ready to help.",
            IconComponent: ClockIcon,
        },
        {
            title: "Safety First",
            desc: "Fully insured, certified operators who prioritize your vehicle's safety.",
            IconComponent: ShieldIcon,
        },
        {
            title: "Fair Pricing",
            desc: "Transparent rates with zero hidden fees. You know what you pay.",
            IconComponent: TagIcon,
        },
    ];

    return (
        <section className="py-28 bg-navy-950 text-white relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] bg-amber-500/8 blur-[120px] rounded-full animate-float" />
                <div className="absolute bottom-[5%] right-[5%] w-[35%] h-[35%] bg-fire/5 blur-[100px] rounded-full" style={{ animationDelay: "3s" }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
                    {/* Left Content */}
                    <div className="lg:w-1/3">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4 block"
                        >
                            Why Choose Us
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
                        >
                            Redefining <br />
                            <span className="text-gradient-gold">Roadside Excellence.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-400 leading-relaxed mb-8"
                        >
                            We don&apos;t just tow cars; we deliver peace of mind. Experience
                            the difference of a service built on speed, safety, and integrity.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <a
                                href="/about"
                                className="inline-flex items-center gap-2 text-amber-400 border-b border-amber-400/40 pb-1 hover:border-amber-400 hover:gap-3 transition-all text-lg font-medium"
                            >
                                Learn more about our story
                                <span>→</span>
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: Bento Grid */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {features.map((feature, idx) => (
                            <FeatureCard key={idx} {...feature} index={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ title, desc, IconComponent, index }: FeatureCardProps) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={`
        relative p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm
        hover:bg-white/[0.07] hover:border-amber-500/20 transition-all duration-500 group
        ${isEven ? "md:translate-y-6" : ""}
      `}
        >
            {/* Gradient glow on hover */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/0 group-hover:from-amber-500/20 group-hover:to-fire/10 transition-all duration-700 opacity-0 group-hover:opacity-100 pointer-events-none" />

            <div className="relative z-10">
                <div className="mb-5 relative w-14 h-14">
                    {/* Icon glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    <div className="relative z-10 w-full h-full bg-navy-800 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-amber-500/30 group-hover:scale-105 transition-all duration-300 shadow-lg">
                        <IconComponent className="w-7 h-7 text-amber-400" />
                    </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
            </div>
        </motion.div>
    );
}
