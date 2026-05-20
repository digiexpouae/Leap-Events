"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TextRevealSection() {
  const sectionRef = useRef(null);
  const linesRef = useRef([]);

  // Reset refs array on each render
  linesRef.current = [];
  const addToLines = (el) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };

  const lines = [
    "Crafting digital experiences",
    "that inspire, engage, and",
    "deliver lasting impact.",
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(linesRef.current, {
        yPercent: 100,
        ease: "power3.out",
        duration: 1.2,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-32 px-8 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-black text-[#5b8bf5] leading-[1.05]"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <div ref={addToLines} className="inline-block will-change-transform">
                {line}
              </div>
            </div>
          ))}
        </h2>
      </div>
    </section>
  );
}