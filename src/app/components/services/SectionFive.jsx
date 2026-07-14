"use client";

import FadeUp from "@/app/common/Transition";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


const SERVICES = [
  {
    title: "Cultural Events",
 image: "/assets/ev-1.webp" ,
    bullets: [
      "Authentic cultural experiences",
      "Heritage-inspired event concepts",
      "Traditional performances and entertainment",
      "Community-focused celebrations",
      "Immersive themed environments",
      "End-to-end event management",
    ],
  },
  {
    title: "Community Events",
    image: "/assets/ev-4.webp",
    bullets: [
      "Family-friendly experiences",
      "Interactive community activations",
      "Engaging entertainment programs",
      "Inclusive audience participation",
      "Safe and seamless event execution",
      "Memorable neighborhood celebrations",
    ],
  },
  {
    title: "Mall Activations",
   image: "/assets/ev-3.webp",
    bullets: [
      "High-footfall brand activations",
      "Interactive customer experiences",
      "Seasonal retail campaigns",
      "Product launch activations",
      "Shopper engagement solutions",
      "Measurable brand visibility",
    ],
  },
  {
    title: "Exhibition Stall",
image:"/assets/ev-6.webp",
    bullets: [
      "Custom exhibition stand design",
      "Premium booth fabrication",
      "Interactive product displays",
      "Brand-focused visitor experiences",
      "End-to-end installation services",
      "Functional and impactful layouts",
    ],
  },
  {
    title: "Educational Events",
image:"/assets/ev-2.webp",
    bullets: [
      "Interactive learning experiences",
      "Student engagement activities",
      "Educational workshops and exhibitions",
      "STEM and innovation programs",
      "Creative knowledge-sharing environments",
      "Seamless event coordination",
    ],
  },
  {
    title: "Road Shows",
   image:"/assets/ev-5.webp",
    bullets: [
      "Mobile brand activations",
      "Multi-location campaign execution",
      "High-impact promotional experiences",
      "Audience engagement on the move",
      "Fast setup and operations",
      "Maximum brand reach and visibility",
    ],
  },
];

export default function SpacesBuiltToMove() {
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    if (!items.length) return;

    // rootMargin makes the "active zone" a thin horizontal band across the
    // middle of the viewport. Top/bottom = -45% means only the middle 10%
    // counts as "in view". This gives a clear single active item without
    // flicker between adjacent items.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex((prev) => (prev === idx ? prev : idx));
            break;
          }
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full bg-[#DEF6FF] px-6 py-16 md:px-12 md:py-24 hidden  md:block"
      aria-label="Our services"
    >
     
      <div className="mx-auto max-w-7xl">
        {/* Heading + intro */}
          <FadeUp>
        <div className="flex flex-col gap-6 md:items-start md:justify-between">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-[#363737] sm:text-5xl ">
           Leap events,
            the standard of <br /> the extraordinary
          </h2>
          <p className=" text-sm w-full flex text-[#363737]  justify-center md:mt-4">
           Redefining event experiences through bold creativity, immersive storytelling,<br /> and future-forward execution that goes beyond conventional expectations. 

          </p>
        </div>
        </FadeUp>
        {/* Body: three columns. Image is sticky, text scrolls. */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-10">
          {/* LEFT — sticky image stack */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-24">
              <div className="relative h-[280px] w-full max-w-sm overflow-hidden rounded-3xl bg-slate-900 shadow-xl ring-1 ring-slate-200">
                {SERVICES.map((s, i) => (
                  <Image
                    key={s.title}
                    src={s.image}
                    alt={s.title}
                    draggable={false}
                    fill
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out"
                    style={{
                      opacity: i === activeIndex ? 1 : 0,
                      transform:
                        i === activeIndex ? "scale(1)" : "scale(1.02)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CENTER — scrolling service list */}
          <ul className="md:col-span-5 flex flex-col">
            {SERVICES.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <li
                  key={s.title}
                  ref={(el) => (itemsRef.current[i] = el)}
                  data-index={i}
                  className={` text-lg transition-all duration-300 py-8 font-bold md:text-base  ${
                    isActive
                      ? "  text-[#363737] opacity-100"
                      : "text-slate-400 opacity-50"
                  }`}
                >
                  {s.title}
                </li>
              );
            })}
          </ul>

          {/* RIGHT — sticky sub-bullets that match active */}
          <div className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <div className="relative min-h-[220px]">
                {SERVICES.map((s, i) => (
                  <ul
                    key={s.title}
                    className="absolute inset-0 space-y-2 text-xs leading-tighter  text-[#363737] transition-opacity duration-300 "
                    style={{
                      opacity: i === activeIndex ? 1 : 0,
                      pointerEvents: i === activeIndex ? "auto" : "none",
                    }}
                  >
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </section>
  );
}