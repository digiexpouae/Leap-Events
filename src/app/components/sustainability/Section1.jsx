"use client";

import Image from "next/image";
import { useState } from "react";

// Extend pillars to demonstrate multi-page slider (add more as needed)
const allPillars = [
    {
        icon: '/assets/icon-1.svg',
        title: <>ECO-CONSCIOUS <br /> DESIGN</>,
        titleKey: "ECO-CONSCIOUS DESIGN",
        description:
            "Modular, reusable, and recyclable materials across event structures, décor, and signage.",
    },
    {
        icon: '/assets/icon-2.svg',
        title: "ENERGY EFFICIENCY",
        titleKey: "ENERGY EFFICIENCY",
        description:
            "Integration of LED and solar-powered systems to minimize energy consumption.",
    },
    {
        icon: '/assets/icon-3.svg',
        title: "WASTE MANAGEMENT",
        titleKey: "WASTE MANAGEMENT",
        description:
            "Certified recycling and waste-segregation programs at all event sites.",
    },

    {
        icon: '/assets/icon-2.svg',
        title: "GREEN LOGISTICS",
        titleKey: "Local Sourcing",
        description:
            "Collaboration with UAE suppliers and artisans to reduce transport emissions and support local industries.",
    },
    {
        icon: '/assets/icon-3.svg',
        title: "Carbon Footprint Reduction",
        titleKey: "WATER CONSERVATION",
        description:
            "Partnerships with environmental organizations to measure, offset, and reduce event-relatedemissions.",
    },
];

const ITEMS_PER_PAGE = 3;
const totalPages = Math.ceil(allPillars.length / ITEMS_PER_PAGE);

export default function SustainableEventsSection() {
    const [activePage, setActivePage] = useState(0);

    const visiblePillars = allPillars.slice(
        activePage * ITEMS_PER_PAGE,
        activePage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    return (
        <section className="bg-primary-gradient w-full px-6 md:px-16 lg:px-24 py-16 md:py-24">
            <div className="max-w-5xl mx-auto">

                {/* Top: heading + description */}
                <div className="flex flex-col md:items-start md:gap-6 mb-14 md:mb-20 max-w-3xl">
                    <h2 className="font-black uppercase text-2xl md:text-3xl lg:text-5xl leading-tight tracking-tight flex-shrink-0 mb-6 md:mb-0">
                        LEAPEVENTS CONTRIBUTION
                        <br /> TO SUSTAINABLE EVENTS
                    </h2>
                    <p className="text-sm md:text-2xl tracking-tighter text-gray leading-[1.2]">
                        LAPA fully applies international best practices in main event production
                        to reduce environmental impact while maintaining creative excellence.
                    </p>
                </div>

                {/* Divider line with interactive dots — desktop only */}
                <div className="relative hidden md:flex items-center mb-14 md:mb-16">
                    <div className="flex-1 border-t border-white/20" />

                    <div className="flex-1 border-t border-white/20" />
                </div>

                {/* Mobile: static divider dots (no interactivity) */}
                <div className="relative flex md:hidden items-center mb-14">
                    <div className="flex-1 border-t border-white/20" />
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="w-2.5 h-2.5 rounded-full bg-white/40 mx-4 flex-shrink-0"
                        />
                    ))}
                    <div className="flex-1 border-t border-white/20" />
                </div>


                {/* Desktop: paginated 3-column grid */}
                <div className="hidden md:grid grid-cols-3 gap-10 md:gap-18 transition-all duration-300">
                    {visiblePillars.map(({ icon, title, titleKey, description }) => (
                        <div key={titleKey} className="flex flex-col min-h-[300px] items-start gap-4">
                            <div className="flex items-center justify-center flex-shrink-0">
                                <Image
                                    src={icon}
                                    width={120}
                                    height={120}
                                    alt={titleKey}
                                />
                            </div>
                            <div>
                                <span className="font-black text-[var(--color-heading)] uppercase text-sm md:text-2xl tracking-tighter leading-snug mb-2 block">
                                    {title}
                                </span>
                                <p className="text-xs md:text-sm tracking-tighter">
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="hidden md:flex items-center  justify-center w-full gap-3 px-4">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActivePage(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={[
                                "rounded-full flex-shrink-0 transition-all duration-500 cursor-pointer ease-in-out focus:outline-none",
                                i === activePage
                                    ? "w-4 h-4  scale-110 bg-primary shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                                    : "w-4 h-4 bg-[var(--color-primary)]/70 hover:bg-[var(--color-primary)]/70 hover:scale-105",
                            ].join(" ")}
                        />
                    ))}
                </div>

                {/* Mobile: all pillars stacked (no slider) */}
                <div className="grid md:hidden grid-cols-1 sm:grid-cols-3  gap-10">
                    {allPillars.map(({ icon, title, titleKey, description }) => (
                        <div key={titleKey} className="flex flex-col items-center md:items-start  gap-4">
                            <div className="flex items-center justify-center flex-shrink-0">
                                <Image
                                    src={icon}
                                    width={120}
                                    height={0}
                                    alt={titleKey}
                                />
                            </div>
                            <div className="flex flex-col  text-center md:text-start  max-w-[250px]">
                                <span className="font-black text-[var(--color-heading)] uppercase text-sm md:text-2xl tracking-tighter leading-snug mb-2 block">
                                    {title}
                                </span>
                                <p className="text-sm tracking-tighter">
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}