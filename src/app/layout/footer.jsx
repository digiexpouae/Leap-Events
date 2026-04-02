"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion'
const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "What We Do", href: "/what-we-do" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
];

const services = [
    "Corporate Events",
    "Mall Decor & Activation",
    // "Wedding",
    "Digital Print & Branding",
    "Exhibition",
    "Entertainment",
];

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        console.log("Subscribe:", email);
        setEmail("");
    };
    const footerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 1
            }
        }
    }
    const itemVariants = {
        hidden: { y: 20, opacity: 0 }
        ,
        visible: {
            y: 0, opacity: 1, transition: {
                duration: 0.5
            }
        }
    }



    return (
        <section >

            <div className="w-full overflow-hidden"><Image src={'/assets/globe2.png'} alt="globe" width={1920} height={800} /></div>
            <motion.footer
                className="w-full h-auto"
                style={{ background: "var(--color-bg-secondary, #0a1628)" }}
                variants={footerVariants}
                initial="hidden"
                whileInView="visible"  // ✅ not animate="visible"
                viewport={{ once: true }}            >
                {/* ── Main footer grid ── */}
                <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 pt-4  pb-10 sm:pb-14">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                        {/* ── Col 1: Brand ── */}
                        <div className="lg:col-span-2 flex flex-col gap-6 max-w-sm">
                            {/* Logo */}
                            <motion.div className="flex flex-col leading-none"
                                variants={itemVariants}
                            >
                                <Image src="/assets/logo-white.svg" width={120} height={80} alt="logo" />
                            </motion.div>

                            {/* Tagline */}
                            <motion.p className="text-white text-sm sm:text-base "
                                variants={itemVariants}>
                                We are organization of eclectic team of enthusiast with decade and
                                more dedicated to event industries.
                            </motion.p>

                            {/* Email subscribe */}
                            <motion.div
                                className="flex items-stretch overflow-hidden border border-white"
                                variants={itemVariants}
                            >
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 min-w-0 bg-transparent px-4 py-3 text-sm text-white placeholder-white/40 outline-none"
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="px-5 py-3 text-sm font-semibold bg-white text-[var(--color-primary)] shrink-0 transition-all duration-200 hover:brightness-110"
                                >
                                    Submit
                                </button>
                            </motion.div>
                        </div>

                        {/* ── Col 2: Quick Links ── */}
                        <div className="flex flex-col gap-5">
                            <motion.h4
                                className="text-white font-bold text-lg sm:text-xl"
                                variants={itemVariants}
                            >
                                Quick Links
                            </motion.h4>
                            <ul className="flex flex-col gap-3.5">
                                {quickLinks.map((link) => (
                                    <motion.li key={link.label}
                                        variants={itemVariants}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-white text-sm sm:text-base hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* ── Col 3: What We Provide ── */}
                        <div className="flex flex-col gap-5">
                            <motion.h4
                                className="text-white font-bold text-lg sm:text-xl"
                                variants={itemVariants}

                            >
                                What We Provide
                            </motion.h4>
                            <ul className="flex flex-col gap-3.5">
                                {services.map((service) => (
                                    <motion.li key={service}
                                        variants={itemVariants}
                                    >
                                        <span className="text-white text-sm sm:text-base hover:text-white transition-colors duration-200 cursor-pointer">
                                            {service}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>


                {/* ── Divider ── */}
                <div
                    className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
                />

                {/* ── Copyright ── */}
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-5 text-center">
                    <motion.p className="text-white text-xs sm:text-sm"
                        variants={itemVariants}
                    >
                        Copyright © 2026 LeapEvent. All Rights Reserved.
                    </motion.p>
                </div>


            </motion.footer >
        </section>
    );
}