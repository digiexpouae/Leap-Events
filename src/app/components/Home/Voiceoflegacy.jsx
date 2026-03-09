"use client"
import React, { useState } from "react";
import Image from "next/image";
const testimonials = [
    {
        id: 1,
        quote:
            "Dubai Run Was Nothing Short Of Exceptional. The Coverage And Positivity And Happiness Around It All Is Next Level. Thank You!",
        name: "Kara Watson",
        role: "Client",
        company: "DAMAAC",
        logo: '/assets/home/Damaclogo.png', // Replace with your logo path e.g. "/logos/damaac.svg"
        logoText: "DAMAC", // Fallback text if no logo
    },
    {
        id: 2,
        quote:
            "Working with the team was an absolute pleasure. Every detail was handled with precision and creativity. We couldn't have asked for more.",
        name: "James Al Farsi",
        role: "Client",
        company: "Emaar",
        logo: null,
        logoText: "EMAAR",
    },
    {
        id: 3,
        quote:
            "The event exceeded all expectations. Their ability to bring our vision to life while managing every logistical challenge was remarkable.",
        name: "Sara Mahmoud",
        role: "Client",
        company: "Dubai Expo",
        logo: null,
        logoText: "EXPO",
    },
];

export default function VoicesOfLegacy() {
    const [active, setActive] = useState(0);
    const current = testimonials[active];

    return (
        <section
            className="w-full bg-primary-gradient py-14 sm:py-20 relative "
        >
            <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">

                {/* Heading */}
                <h2
                    className="text-center font-black uppercase text-[clamp(2rem,7vw,4.5rem)] text-gray-900 mb-10 sm:mb-14"
                    style={{ letterSpacing: "-0.01em", lineHeight: 1.0 }}
                >
                    Voices Of Legacy
                </h2>

                {/* Card */}
                <div
                    className="relative w-full rounded-2xl sm:rounded-3xl px-7 sm:px-12 pt-10 sm:pt-14 pb-8 sm:pb-10 bg-[#EEF4FF]"

                >


                    {/* Quote text */}
                    <p
                        className="relative z-10 text-gray-800 tracking-tighter font-medium text-[clamp(1rem,2.5vw,3rem)] leading-relaxed mb-8 sm:mb-10 max-w-3xl"
                        style={{ lineHeight: "1.65" }}
                    >
                        {current.quote}
                    </p>

                    {/* Footer row */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <h5
                                className="font-black uppercase tracking-wider text-[clamp(1rem,3vw,2rem)]"
                                style={{ color: "var(--color-primary, #5686DA)" }}
                            >
                                {current.name}
                            </h5>
                            <p className="text-xs sm:text-lg uppercase tracking-tighter  mt-0.5 font-medium">
                                Client : {current.company}
                            </p>
                        </div>

                        {/* Logo / fallback */}
                        <div className="shrink-0">
                            {current.logo ? (
                                /* Replace with Next.js Image when logo available:
                                   <Image src={current.logo} alt={current.company} width={120} height={40} className="object-contain" /> */
                                <Image
                                    src={current.logo}
                                    alt={current.company}
                                    height={30} width={160}
                                />
                            ) : (
                                <span
                                    className="font-black uppercase tracking-[0.15em] text-xl sm:text-2xl"
                                    style={{ color: "#0d1b3e", fontStyle: "italic" }}
                                >
                                    {current.logoText}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pagination dots */}
                <div className="flex items-center justify-center gap-2.5 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: i === active ? "28px" : "10px",
                                height: "10px",
                                background:
                                    i === active
                                        ? "var(--color-primary, #5686DA)"
                                        : "rgba(86,134,218,0.25)",
                            }}
                            aria-label={`Testimonial ${i + 1}`}
                        />
                    ))}
                </div>

            </div>


        </section>
    );
}