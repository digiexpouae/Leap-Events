
import React from "react";
import Image from "next/image";
export default function HeroSection() {
    return (
        <section
            className="relative w-full bg-white  h-screen overflow-hidden"
        >
            {/* Subtle grid overlay */}
            <div className=" h-full max-w-5xl mx-auto  flex flex-col items-center justify-between">



                {/* Content */}
                <div className="relative z-10  md:h-[40%] h-[50%] flex flex-col items-center px-4 md:px-0 justify-end text-center w-full">
                    {/* Eyebrow */}
                    <h2
                        className=" leading-[1] tracking-tight uppercase text-4xl font-semibold mb-3 "

                    >
                        <span className="text-[var(--color-primary)]"> Crafting Legacies</span>
                        <br />
                        Through

                        Extraordinary
                        <br />
                        Experiences
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
                    <div className="">
                        <Image src="/assets/home/cubes.png" alt="cube" width={550} height={500} />
                    </div>

                </div>
            </div>


        </section >
    );
}