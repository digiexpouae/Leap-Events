"use client"
import Image from "next/image";
import Event from './event'
// import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { forwardRef, useEffect } from "react";
const events = [
    {
        id: 1,
        title: "Ferjaan Festival",
        category: "Family Festivals",
        year: "2026",
        // Replace with your actual image path:
        image: '/assets/home/2.png',
        placeholder: "Event Image 1",
    },
    {
        id: 2,
        title: "University of Dubai",
        category: "Students Festival",
        year: "2026",
        image: '/assets/home/4.png',
        placeholder: "Event Image 2",
    },
    {
        id: 3,
        title: "D-Tech",
        category: "Tech Festival",
        year: "2026",
        image: '/assets/home/5.png',
        placeholder: "Event Image 3",
    },
    {
        id: 4,
        title: "Ferjaan Festival",
        category: "Family Festival",
        year: "2026",
        image: '/assets/home/6.png',
        placeholder: "Event Image 4",
    },
];


export default function MomentsWeCreated({ className }) {
    return (
        <>
            {/* ── Moments We Created Section ── */}
            <section
                className={`w-full relative  py-4 ${className}`}
            >
                <div className="mx-auto ">

                    {/* Header row */}


                    {/* 2×2 grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>


                {/* <Event /> */}
            </section >

            {/* ── What We Do teaser ── */}



        </>
    );
}



export const EventCard = forwardRef(({ event }, ref) => {
    const ref1 = useRef();
    const mainContainer = useRef();

    useEffect(() => {
        if (!ref1.current || !mainContainer.current) return;
        console.log("main")

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                // When the card appears in the viewport
                if (entry.isIntersecting) {
                    const tl = gsap.timeline();
                    tl.to(ref1.current, {
                        clipPath:
                            "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 100% 100%, 100% 0%)",
                        duration: 1.6,
                        ease: "power3.inOut",
                    }).call(() => {
                        gsap.set(ref1.current, { autoAlpha: 0 }); // hide curtain after animation
                    });

                    // Only run once
                    observer.unobserve(mainContainer.current);
                }
            },
            {
                root: null,           // viewport
                rootMargin: "0px",
                threshold: 0.2,       // 20% of card must be visible
            }
        );

        observer.observe(mainContainer.current);

        return () => {
            if (mainContainer.current) observer.unobserve(mainContainer.current);
        };
    }, []);

    return (
        <div
            className="group relative overflow-hidden"
            ref={mainContainer}
            style={{ aspectRatio: "16/9" }}
        >
            {/* ── CURTAIN (clipped overlay) ── */}
            <div
                className="absolute inset-0 bg-primary z-[99]"
                ref={ref1}
                style={{
                    clipPath:
                        "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)",
                }}
            ></div>

            <div
                className="absolute inset-0 flex items-center justify-center text-xs font-mono tracking-widest uppercase"
                style={{
                    background:
                        "linear-gradient(135deg, #1a2d5a 0%, #0d1b3e 60%, #162244 100%)",
                    color: "rgba(255,255,255,0.18)",
                }}
            >
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)",
                }}
            />

            {/* Text overlay — top */}
            <div className="absolute top-0 left-0 text-white right-0 flex flex-col items-center justify-center p-4 sm:p-5 z-10">
                <h3 className="font-black uppercase text-base sm:text-xl leading-tight tracking-wide">
                    {event.title}
                </h3>
                <p className="text-xs sm:text-sm mt-0.5">{event.category} / {event.year}</p>
            </div>

            {/* Hover shimmer */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(120deg, transparent 30%, rgba(86,134,218,0.12) 50%, transparent 70%)",
                }}
            />
        </div>
    );
});

