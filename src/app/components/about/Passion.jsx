"use client";

import FadeUp from "@/app/common/Transition";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Data for each step in the stack. Replace `image` URLs with files in /public
 * (e.g. "/event-1.jpg") for production.
 */
const STATS = [

 
  {
    number: "75",
    suffix: "+",
    label: "Clients\nServed",
    description:
      "From boutique launches to brand activations — trust, earned one room at a time.",
    image:
      "/assets/eventsdelivered.jpg",
  },
  {
    number: "600",
    suffix: "+",
    label: "Events\nDelivered",
    description: "Big stages, small details. Each one designed to leave a mark.",
    image:
      "/assets/home/4.png",
  },
  {
    number: "12",
    suffix: "+",
    label: "Years of\nCraft",
    description:
      "Two decades of refining what live experiences can actually feel like.",
    image:
      "/assets/home/4.png",
  },
];

export default function PassionPrecisionSection() {
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Map scroll progress through the tall wrapper to an active index.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const total = wrapper.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      // Divide the 0→1 range into equal segments, one per stat.
      const idx = Math.min(
        STATS.length - 1,
        Math.floor(progress * STATS.length)
      );
      setActiveIndex(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = STATS[activeIndex];

  return (
    <section
      ref={wrapperRef} 
      className="hidden md:block relative"
      style={{ height: `${STATS.length * 100}vh` }}
      aria-label="Where passion meets precision"
    >
      {/* Sticky stage — pinned while the user scrolls through the wrapper */}
 
      <div className="sticky top-0 h-screen w-full overflow-hidden">
       
    

        {/* Left label — changes with active stat */}
      {/* Label + description — one map, both fade together per active stat */}
{STATS.map((s, i) => {
  const isActive = i === activeIndex;
  return (
    <div
      key={s.number}
      aria-hidden={!isActive}
      className={`transition-opacity duration-[100ms] ease-out ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Left label */}
      <p className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 max-w-[200px] text-[#0b1220] font-bold leading-[1.05] text-2xl md:text-3xl whitespace-pre-line">
        {s.label}
      </p>

      {/* Right description */}
      <p className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 max-w-[180px] text-[#0b1220]/80 text-sm md:text-base leading-snug">
        {s.description}
      </p>
    </div>
  );
})}

        {/* CENTER stack of numbers + image card */}
        <div className="absolute inset-0 grid place-items-center">
          <FadeUp>
          <div className="relative w-[min(640px,85vw)] h-[min(560px,80vw)] md:h-[520px] md:w-[680px]">
            {STATS.map((s, i) => {
              const offset = i - activeIndex; // -1 prev, 0 active, +1 next
              const isActive = offset === 0;
              const translateY = offset * 180; // vertical gap between stacked numbers
              const scale = isActive ? 1 : 1;
              const colorClass = isActive ? "text-white" : "text-[#000000]/5";
              const z = isActive ? 20 : 5;

              return (
                <div
                  key={s.number}
                  className="absolute inset-0 grid place-items-center transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    zIndex: z,
                  }}
                  aria-hidden={!isActive}
                >
                  <div
                    className={`relative  font-bold tracking-tight leading-none ${colorClass} transition-colors duration-[700ms]`}
                    style={{ fontSize: "clamp(120px, 22vw, 180px)" }}
                  >
                    {s.number}
                    {s.suffix && (
                      <span
                        className="absolute -top-2 md:-top-4 text-[0.35em] font-black"
                        style={{ right: "-0.35em" }}
                      >
                        {s.suffix}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Image card — sits on top of the ACTIVE number, cross-fades */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rotate-[-5deg]  w-[68%] aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(11,18,32,0.45)]  ring-1 ring-black/5" >
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-[700ms]  ease-out ${
                    i === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Plain <img> so this is drop-in without next.config domain config.
                      Swap to next/image when you move images to /public. */}
                  <Image
                    src={s.image}
                    alt={s.label.replace("\n", " ")}
                    width={350}
                    height={300}
                    className="h-full w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>

            {/* Decorative purple flower over the right edge of the card */}
          
          </div>
          </FadeUp>
        </div>

        {/* Bottom CTA */}
       
        {/* Subtle scroll-progress dots */}
        {/* <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {STATS.map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex ? "bg-[#0b1220] scale-125" : "bg-[#0b1220]/20"
              }`}
            />
          ))}
        </div> */}
      </div>

      {/* Local keyframes for the label/description fade-in */}
   
    </section>
  );
}

