"use client"
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
export default function WhereLeagciesBegin() {
    const sectionRef = useRef(null);
    const headlineRef = useRef(null);
    const buttonRef = useRef(null);
    const bodyRef = useRef(null);

    const hasPlayed = useRef(false);

    useGSAP(() => {
        gsap.set([headlineRef.current, buttonRef.current, bodyRef.current], {
            autoAlpha: 0,
            y: 20,
        });

        const tl = gsap.timeline({ paused: true });

        tl.to(headlineRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
        })
            .to(
                buttonRef.current,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                },
                "-=0.5"
            )
            .to(
                bodyRef.current,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                },

            );
        const checkVisibility = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const midX = rect.left + rect.width / 2;
            const midY = rect.top + rect.height / 2;

            const topEl = document.elementFromPoint(midX, midY);
            const isVisible = sectionRef.current.contains(topEl);

            if (isVisible) {
                tl.play();
                window.removeEventListener("scroll", checkVisibility); //
            }
        };

        window.addEventListener("scroll", checkVisibility, { passive: true });

        return () => window.removeEventListener("scroll", checkVisibility);
    }, { scope: sectionRef });

    return (
        <section className="bg-primary-gradient h-screen w-full py-34 w-full relative" ref={sectionRef}
        >
            {/* ── Main content grid ── */}
            <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col items-center justify-center px-6  ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-6 items-start">

                    {/* LEFT — headline */}
                    <div className="flex gap-6">
                        <h2
                            className="font-black uppercase leading-none text-[clamp(2.8rem,4vw,4rem)]"
                            ref={headlineRef}

                        >
                            Where
                            <br />
                            Legacies Begin
                        </h2>

                    </div>
                    <div className="flex justify-start md:justify-end">
                        <button
                            className="px-6 py-2.5 rounded-full text-md tracking-tight font-semibold bg-[var(--color-primary)] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap"

                            ref={buttonRef}

                        >
                            Read Our Story
                        </button>
                    </div>
                    {/* RIGHT — button + body copy */}

                </div>
                <div className="flex items-end justify-end  gap-5 md:pt-2">
                    {/* CTA button aligned top-right on md+ */}

                    <div className="lg:w-2/3 ">
                        {/* Body text */}
                        <p className="text-[clamp(1rem,2vw,2rem)] tracking-tight  leading-[1.2] text-gray-600 max-w-prose"

                            ref={bodyRef}

                        >
                            We are organization of eclectic team of enthusiast with decade and
                            more dedicated to event industries. Our Previous experience and
                            enhance knowledge enable us to excel in event industry from
                            inception to execution. With our spectacular profile in event
                            industries trough years of work experience, involvement in latest
                            technology and state of art build facilities which keep us up to
                            date with present and future event requirements.
                        </p>
                    </div>
                </div>
            </div>


            <div
                className="absolute bottom-0 left-0 w-full pointer-events-none"
                style={{ height: "clamp(140px, 28vw, 220px)" }}
                aria-hidden="true"
            >
                {/* ↓↓↓ REPLACE THIS DIV WITH YOUR IMAGE ↓↓↓ */}
                <div
                    className="w-full h-full flex items-end justify-center"

                >
                    {/* Placeholder silhouette hint */}
                    <Image src={'/assets/home/3.png'} height={200} width={1920} alt="skylines" />
                </div>
                {/* ↑↑↑ REPLACE THIS DIV WITH YOUR IMAGE ↑↑↑ */}
            </div>
        </section>
    );
}