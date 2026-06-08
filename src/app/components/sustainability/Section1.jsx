"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const allPillars = [
    {
        icon: "/assets/icon-1.svg",
        title: (
            <>
                ECO-CONSCIOUS <br /> DESIGN
            </>
        ),
        titleKey: "ECO-CONSCIOUS DESIGN",
        description:
            "Modular, reusable, and recyclable materials across event structures, décor, and signage.",
    },
    {
        icon: "/assets/icon-2.svg",
        title: "ENERGY EFFICIENCY",
        titleKey: "ENERGY EFFICIENCY",
        description:
            "Integration of LED and solar-powered systems to minimize energy consumption.",
    },
    {
        icon: "/assets/icon-3.svg",
        title: "WASTE MANAGEMENT",
        titleKey: "WASTE MANAGEMENT",
        description:
            "Certified recycling and waste-segregation programs at all event sites.",
    },
    {
        icon: "/assets/icon-2.svg",
        title: "GREEN LOGISTICS",
        titleKey: "GREEN LOGISTICS",
        description:
            "Collaboration with UAE suppliers and artisans to reduce transport emissions and support local industries.",
    },
    {
        icon: "/assets/icon-3.svg",
        title: "Carbon Footprint Reduction",
        titleKey: "Carbon Footprint Reduction",
        description:
            "Partnerships with environmental organizations to measure, offset, and reduce event-related emissions.",
    }

];


// const isTablet = window.innerWidth < 1024





export default function SustainableEventsSection() {



    const [desktopPage, setDesktopPage] = useState(0);
    const [mobilePage, setMobilePage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3); // default SSR-safe value
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    useEffect(() => {
        const update = () => {
            const items = window.innerWidth < 1024 ? 2 : 3
            setItemsPerPage(items)
        }
        update()
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update)

    }, [])

    const MOBILE_ITEMS_PER_PAGE = 1;

    const desktopTotalPages = Math.ceil(allPillars.length / itemsPerPage);
    console.log("desktopTotalPages", desktopTotalPages)
    const mobileTotalPages = Math.ceil(allPillars.length / MOBILE_ITEMS_PER_PAGE);


    const visibleDesktop = allPillars.slice(
        desktopPage * itemsPerPage,
        desktopPage * itemsPerPage + itemsPerPage
    );
    console.log("visibleDesktop", visibleDesktop)
    console.log("Desktoppage", desktopPage)
    // setDesktopPage(2)
    console.log("Desktoppage", desktopPage)
    const visibleMobile = allPillars.slice(
        mobilePage * MOBILE_ITEMS_PER_PAGE,
        mobilePage * MOBILE_ITEMS_PER_PAGE + MOBILE_ITEMS_PER_PAGE
    );

    const handleTouchStart = (e) => {
        touchStartX.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 40) {
            if (diff > 0 && mobilePage < mobileTotalPages - 1) {
                setMobilePage((p) => p + 1);
            } else if (diff < 0 && mobilePage > 0) {
                setMobilePage((p) => p - 1);
            }
        }
    };

    return (
        <section className="bg-primary-gradient w-full px-6 md:px-16 lg:px-24 py-16 md:py-24">
            <div className="max-w-5xl mx-auto">

                {/* Heading + description */}
                <div className="flex flex-col md:items-start md:gap-6 mb-14 md:mb-20 max-w-3xl">
                    <h2 className="font-black uppercase text-3xl lg:text-5xl leading-tight tracking-tight flex-shrink-0 mb-6 md:mb-0">
                        LEAPEVENTS CONTRIBUTION
                        <br /> TO SUSTAINABLE EVENTS
                    </h2>
                    <p className="text-2xl tracking-tighter text-gray leading-[1.2]">
                        LAPA fully applies international best practices in main event
                        production to reduce environmental impact while maintaining creative
                        excellence.
                    </p>
                </div>

                {/* Divider */}
                <div className="relative flex items-center mb-14 md:mb-16">
                    <div className="flex-1 border-t border-white/20" />
                    <div className="flex gap-4 mx-4">
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                className="w-2.5 h-2.5 rounded-full bg-white/40 flex-shrink-0"
                            />
                        ))}
                    </div>
                    <div className="flex-1 border-t border-white/20" />
                </div>

                {/* ── DESKTOP SLIDER ── */}
                <div className="hidden md:block">
                    {/* Slide panel */}
                    <div className="overflow-hidden">
                        <div
                            className="grid grid-cols-2 lg:grid-cols-3 gap-10 md:gap-18 transition-all duration-500 ease-in-out"
                            style={{ minHeight: "320px" }}
                        >
                            {visibleDesktop.map(({ icon, title, titleKey, description }) => (
                                <div
                                    key={titleKey}
                                    className="flex flex-col items-start gap-4"
                                    style={{ minHeight: "300px" }}
                                >
                                    <div className="flex items-center justify-center flex-shrink-0">
                                        <Image
                                            src={icon}
                                            width={120}
                                            height={120}
                                            alt={titleKey}
                                        />
                                    </div>
                                    <div>
                                        <span className="font-black text-(--color-heading) uppercase text-sm md:text-2xl tracking-tighter leading-snug mb-2 block">
                                            {title}
                                        </span>
                                        <p className="text-sm tracking-tighter">{description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop pagination dots */}
                    <div className="flex items-center justify-center w-full gap-3 mt-10">
                        {Array.from({ length: desktopTotalPages }).map((_, i) => {
                            console.log("i", i)
                            return (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setDesktopPage(i)
                                    }
                                    }

                                    style={{ pointerEvents: 'all' }}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={[
                                        "rounded-full flex-shrink-0 transition-all duration-500 cursor-pointer ease-in-out focus:outline-none",
                                        i === desktopPage
                                            ? "w-4 h-4 scale-110 bg-primary shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                                            : "w-4 h-4 bg-[var(--color-primary)]/70 hover:bg-[var(--color-primary)]/70 hover:scale-105",
                                    ].join(" ")}
                                />)
                        })}
                    </div>
                </div>

                {/* ── MOBILE SLIDER ── */}
                <div
                    className="block md:hidden"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Slide panel */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${mobilePage * 100}%)` }}
                        >
                            {allPillars.map(({ icon, title, titleKey, description }) => (
                                <div
                                    key={titleKey}
                                    className="flex flex-col items-center gap-4 flex-shrink-0 w-full px-4"
                                >
                                    <div className="flex items-center justify-center flex-shrink-0">
                                        <Image
                                            src={icon}
                                            width={120}
                                            height={120}
                                            alt={titleKey}
                                        />
                                    </div>
                                    <div className="flex flex-col text-center max-w-[280px]">
                                        <span className="font-black text-(--color-heading) uppercase text-xl tracking-tighter leading-snug mb-2 block">
                                            {title}
                                        </span>
                                        <p className="text-lg tracking-tighter">{description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile pagination dots */}
                    <div className="flex items-center justify-center w-full gap-3 mt-10">
                        {Array.from({ length: mobileTotalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setMobilePage(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={[
                                    "rounded-full flex-shrink-0 transition-all duration-500 cursor-pointer ease-in-out focus:outline-none",
                                    i === mobilePage
                                        ? "w-4 h-4 scale-110 bg-primary shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                                        : "w-4 h-4 bg-[var(--color-primary)]/70 hover:bg-[var(--color-primary)]/70 hover:scale-105",
                                ].join(" ")}
                            />
                        ))}
                    </div>

                    {/* Mobile arrow navigation */}
                    <div className="flex items-center justify-between mt-6 px-4">
                        <button
                            onClick={() => setMobilePage((p) => Math.max(0, p - 1))}
                            disabled={mobilePage === 0}
                            className="text-white/60 hover:text-white disabled:opacity-20 transition-opacity cursor-pointer focus:outline-none"
                            aria-label="Previous"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>

                        <span className="text-white/50 text-sm tracking-widest">
                            {mobilePage + 1} / {mobileTotalPages}
                        </span>

                        <button
                            onClick={() => setMobilePage((p) => Math.min(mobileTotalPages - 1, p + 1))}
                            disabled={mobilePage === mobileTotalPages - 1}
                            className="text-white/60 hover:text-white disabled:opacity-20 transition-opacity cursor-pointer focus:outline-none"
                            aria-label="Next"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}