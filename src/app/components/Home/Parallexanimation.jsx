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
import { motion } from 'framer-motion'
const Parallexanimation = () => {
      const container = useRef()
      const ref1 = useRef()
      const ref2 = useRef()
      const ref3 = useRef()
      const videoRef = useRef();
      gsap.registerPlugin(ScrollTrigger);

      useGSAP(() => {
            const isMobile = window.innerWidth < 768;

            const endDistance = window.innerHeight;

            ScrollTrigger.normalizeScroll(true);
            if (ref2.current && videoRef.current) {
                  console.log("Creating video ScrollTrigger");
                  ScrollTrigger.create({
                        trigger: ref2.current,
                        start: "+=400",
                        end: "+=800",

                        onEnter: () => videoRef.current?.play(),
                        // onLeave: () => videoRef.current?.pause(),
                        // onEnterBack: () => videoRef.current?.play(),
                        // onLeaveBack: () => videoRef.current?.pause(),
                  })
            }


            // ref3 starts exactly one viewport below — outside the pin container
            gsap.set(ref3.current, { y: "100vh" });

            const tl = gsap.timeline({
                  scrollTrigger: {
                        trigger: container.current,
                        start: "top top",
                        end: `+=${isMobile ? endDistance * 4 : endDistance * 2} `,
                        pin: true,
                        pinSpacing: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                  },
            })

            // Separate ScrollTrigger for video

            tl.to(ref1.current, {
                  yPercent: -100,
                  duration: 1
            });

            tl.to(ref2.current, {
                  yPercent: -100,
                  duration: 1




            });
            // 
            // ref3 slides up into view — overlaps the pinned container

            tl.to(ref2.current, { duration: 0.15 })
            tl.to(ref3.current, {
                  y: 0,
                  duration: `${isMobile ? 2 : 1}`

            });



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
                              <Video ref={videoRef} />
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
                              <motion.h2
                                    className={`font-black uppercase text-white text-[clamp(1.8rem,5vw,3rem)]`}
                                    style={{ letterSpacing: "-0.01em", lineHeight: 1.05 }}
                                    initial={{ y: 50 }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                              >
                                    Moments We Created
                              </motion.h2>

                              <motion.button
                                    className="self-start sm:self-auto px-6 py-2.5 bg-[var(--color-primary)] rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:brightness-110 whitespace-nowrap"
                                    initial={{ y: 50 }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                              >
                                    Explore More
                              </motion.button>
                        </div>

                        <motion.div
                              initial={{ y: 250 }}
                              whileInView={{ y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut" }}
                        >
                              <SectionThree className="" />
                        </motion.div>
                  </div>

            </div >
      );
}

export default Parallexanimation;
