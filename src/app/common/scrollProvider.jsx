"use client"
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";

export default function SmoothScrollProvider({ children }) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        const isMobile = window.innerWidth < 768

        let lenis = null;
        import("gsap/ScrollTrigger").then((module) => {

            const ScrollTrigger = module.ScrollTrigger;
            gsap.registerPlugin(ScrollTrigger);

            lenis = new Lenis({
                lerp: 0.06,
                // touchMultiplier: 2,
                syncTouch: true,
                syncTouchLerp: 0.03,    // ← easing when finger lifts (momentum)

                // smoothTouch: true,
            });
            // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
            lenis.on('scroll', ScrollTrigger.update);

            // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
            // This ensures Lenis's smooth scroll animation updates on each GSAP tick
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000); // Convert time from seconds to milliseconds
            });

            // Disable lag smoothing in GSAP to prevent any delay in scroll animations
            gsap.ticker.lagSmoothing(0);



        });

        return () => {
            lenis.destroy();
            ScrollTrigger.kill();
        };
    }, []);

    return children;
}
