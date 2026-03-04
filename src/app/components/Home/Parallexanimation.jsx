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
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                  },
            });

            tl.to(ref1.current, {
                  yPercent: -100,
                  ease: "power2.out",
            });

            tl.to(ref2.current, {
                  yPercent: -120,
                  ease: "power2.out",
            });

            // ref3 slides up into view — overlaps the pinned container
            tl.to(ref3.current, {
                  y: 0,
                  ease: "power2.out",
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
                        className="relative w-full z-50 -mt-screen translate-y-full"
                        style={{ marginTop: "-100vh" }}
                        ref={ref3}
                  >
                        <SectionThree />
                  </div>

            </div>
      );
}

export default Parallexanimation;
