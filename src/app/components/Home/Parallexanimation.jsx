"use client"
import HeroSection from "./Herosection"
import Video from "./Video"
import SectionTwo from './Section2'
import SectionThree from './Section3'
import VoicesOfLegacy from "./Voiceoflegacy";
import { useGSAP } from "@gsap/react";
import { useRef } from "react"
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const Parallexanimation = () => {
      const container = useRef()
      const ref1 = useRef()
      const ref2 = useRef()
      const ref3 = useRef()

      useGSAP(() => {
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.normalizeScroll(true);


            // ref3 starts exactly one viewport below — outside the pin container
            gsap.set(ref3.current, { y: "100vh" });

            const tl = gsap.timeline({
                  scrollTrigger: {
                        trigger: container.current,
                        start: "top top",
                        end: `+=2000`,
                        pin: true,
                        pinSpacing: true,
                        scrub: 2,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                  },
            });

            tl.to(ref1.current, {
                  yPercent: -100,
            });

            tl.to(ref2.current, {
                  yPercent: -100,
            }, "+=0.4");

            // ref3 slides up into view — overlaps the pinned container
            tl.to(ref3.current, {
                  y: 0,
            }, "+=0.4");

      }, { scope: container });

      return (
            // outer wrapper — does NOT clip
            <div className="relative w-full">

                  {/* pinned animation container — clips only the hero/video layers */}
                  <div
                        className="relative h-screen w-full overflow-hidden"
                        ref={container}
                  >
                        <div className="absolute inset-0 z-20" ref={ref1}>
                              <HeroSection />
                        </div>
                        <div className="absolute inset-0 z-10" ref={ref2}>
                              <Video />
                        </div>
                        <div className="absolute inset-0 z-[5]">
                              <SectionTwo />
                        </div>
                  </div>

                  {/*
                ref3 lives OUTSIDE the pinned container
                - full natural height (no clipping)
                - starts at y:100vh (below viewport)
                - GSAP slides it up to y:0 during pin
                - scrolls normally after pin ends
                - negative margin pulls it flush against container
            */}


                  <div
                        className="relative w-full z-50 bg-[var(--color-bg-secondary)] pt-12 sm:pt-16 lg:pt-20 -mt-screen translate-y-full"
                        style={{ marginTop: "-100vh" }}
                        ref={ref3}
                  >


                        <div className="flex nd:flex-col sm:flex-row px-4 md:px-16 sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
                              <h2
                                    className={`font-black uppercase text-white text-[clamp(1.8rem,5vw,3rem)]`}
                                    style={{ letterSpacing: "-0.01em", lineHeight: 1.05 }}
                              >
                                    Moments We Created
                              </h2>

                              <button
                                    className="self-start sm:self-auto px-6 py-2.5 bg-[var(--color-primary)] rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:brightness-110 whitespace-nowrap"

                              >
                                    Explore More
                              </button>
                        </div>
                        <SectionThree className="" />
                  </div>

            </div>
      );
}

export default Parallexanimation;
