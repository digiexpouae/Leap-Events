
"use client"
import React, { useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
    const mainContainer = useRef()
    const ref1 = useRef()
    const ref2 = useRef()

    // const navRef = useRef(null);

    // useEffect(() => {
    //     navRef.current = document.querySelector("nav");
    // }, []);
    useLayoutEffect(() => {
        // const nav = document.querySelector("nav");
    }, []);
    useGSAP(() => {
        // const nav = document.querySelector("nav");
        // gsap.set(nav, { opacity: 0 })
        const tl = gsap.timeline();

        tl.set(ref2.current, { translateY: 400 })

        // 
        tl.to(ref1.current, {
            translateY: '-120vh', duration: 1,
            // clipPath: "inset(0 0 100% 0)", // 
        });

        tl.to(ref2.current, { translateY: 0, duration: 2, opacity: 1 }, "<");
        // tl.to(nav, { opacity: 1 }, "<+2")
    }, { scope: mainContainer })
    return (
        <section
            className="relative w-full bg-white z-[120]  h-screen " ref={mainContainer}
        >
            {/* Subtle grid overlay */}
            <div
                className="absolute -top-[20vh]  bg-primary z-[120] w-full h-[140vh] overflow-visible"
                ref={ref1}
            >
                <div
                    className="absolute -bottom-28 left-0  right-0 w-full  h-[220px] w-full "
                    style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
                // style={{
                //     borderTopLeftRadius: "100% 100%",
                //     borderTopRightRadius: "100% 100%",
                // }}
                // }}
                >
                    <div className="bg-white h-[50%]"></div>
                    <div className="bg-transparent h-[50%]"></div>

                </div>
            </div>


            <div className=" h-full max-w-5xl mx-auto absolute inset-0 z-[40] opacity-0  flex flex-col items-center justify-between" ref={ref2}>



                {/* Content */}
                <div className="relative z-10  md:h-[40%] h-[50%] flex flex-col items-center px-4 md:px-0 justify-end text-center w-full">
                    {/* Eyebrow */}
                    <h2
                        className=" leading-[1.2] tracking-tight uppercase text-[clamp(2rem,4vw,2.5rem)] font-semibold mb-3 "

                    >
                        <span className="text-[var(--color-primary)]"> Crafting Legacies</span>
                        <br />
                        <span>Through</span>

                        <span>Extraordinary</span>
                        <br />
                        <span> Experiences</span>
                    </h2>

                    {/* Headline */}
                    <h1
                        className="font-black uppercase leading-none text-[clamp(2.5rem,8vw,6rem)] text-gray-900"
                        style={{ letterSpacing: "-0.01em", lineHeight: "1.05" }}
                    >

                    </h1>

                    {/* CTA */}

                </div>

                {/* 3D Device illustration */}
                <div
                    className="relative z-10 w-full  flex items-end justify-center overflow-hidden"
                >
                    <div className="relative h-[clamp(300px,45vh,650px)] w-full">
                        <Image src="/assets/home/cubes.png" alt="cube"
                            fill
                            priority
                            className="object-contain object-bottom"

                        />
                    </div>

                </div>
            </div>


        </section >
    );
}