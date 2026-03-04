"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    "Wedding",
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

    return (
        <>

            <div className="w-full "><Image src={'/assets/globe2.png'} alt="globe" width={1920} height={800} /></div>
            <footer
                className="w-full"
                style={{ background: "var(--color-bg-secondary, #0a1628)" }}
            >
                {/* ── Main footer grid ── */}
                <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 pt-4  pb-10 sm:pb-14">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                        {/* ── Col 1: Brand ── */}
                        <div className="lg:col-span-2 flex flex-col gap-6 max-w-sm">
                            {/* Logo */}
                            <div className="flex flex-col leading-none">
                                <Image src="/assets/logo-white.svg" width={120} height={80} alt="logo" />
                            </div>

                            {/* Tagline */}
                            <p className="text-white text-sm sm:text-base ">
                                We are organization of eclectic team of enthusiast with decade and
                                more dedicated to event industries.
                            </p>

                            {/* Email subscribe */}
                            <div
                                className="flex items-stretch overflow-hidden border border-white"
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
                            </div>
                        </div>

                        {/* ── Col 2: Quick Links ── */}
                        <div className="flex flex-col gap-5">
                            <h4
                                className="text-white font-bold text-lg sm:text-xl"
                            >
                                Quick Links
                            </h4>
                            <ul className="flex flex-col gap-3.5">
                                {quickLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-white text-sm sm:text-base hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── Col 3: What We Provide ── */}
                        <div className="flex flex-col gap-5">
                            <h4
                                className="text-white font-bold text-lg sm:text-xl"
                            >
                                What We Provide
                            </h4>
                            <ul className="flex flex-col gap-3.5">
                                {services.map((service) => (
                                    <li key={service}>
                                        <span className="text-white text-sm sm:text-base hover:text-white transition-colors duration-200 cursor-pointer">
                                            {service}
                                        </span>
                                    </li>
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
                    <p className="text-white text-xs sm:text-sm">
                        Copyright © 2026 LeapEvent. All Rights Reserved.
                    </p>
                </div>


            </footer>
        </>
    );
}