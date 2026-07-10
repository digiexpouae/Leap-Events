"use client";

import FadeUp from "@/app/common/Transition";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * SpacesBuiltToMove
 *
 * Tech: Next.js (App Router) + Tailwind CSS + IntersectionObserver API
 *
 * Behavior:
 * - Right column scrolls naturally; left column is `sticky` so the image
 *   stays in view while the user reads through the service list.
 * - A single IntersectionObserver watches every service block. The block
 *   closest to the configured "active line" (middle of viewport) becomes active.
 * - Active service: bold, full-opacity. Inactive: dimmed.
 * - The left image cross-fades to match the active index.
 * - The right-side sub-bullet list swaps to the active service's bullets.
 *
 * Performance:
 * - One observer, not N. Threshold tuned so callbacks are cheap.
 * - State only updates when the active index actually changes.
 * - Images all rendered once and toggled via opacity (GPU-accelerated, no remount).
 * - No GSAP, no ScrollTrigger — pure CSS transitions + a single observer.
 */

  const SERVICES = [
  {
    title: "Creating Immersive Brand Experiences",
    image:
      "/assets/creative.jpg",
    bullets: [
      "Interactive and experiential event environments",
      "High-impact visual storytelling ","Dynamic LED, lighting, and digital content integration",
      "Technology-driven customer journeys",
      "Instagrammable and shareable moments ",
    ],
  },
  {
    title: "Customer Engagement Strategy",
    image:
      "/assets/Spatial_and_Experiential_Design.jpg",
    bullets: [
'Connecting with Diverse Audiences',
'Family-friendly activations',
'Youth-focused entertainment experiences ',
'Enterprise networking environments',
'Personalized engagement activities ',
'Social media integrated experiences ',
    ],
  },
  {
    title: "Market-Ready Event Solutions",
    image:
      "/assets/Technical_Production_and_Execution.jpg",
    bullets: [
     
'Building Scalable & High-Impact Events ',
'Modular and adaptable event systems ',
'Fast deployment and efficient operations ',
'Scalable infrastructure for different event sizes ',
'Cost-effective and sustainable solutions',
'Strong operational and technical planning ',

    ],
  },
  {
    title: "Future Ready Event Infrastructure",
    image: "/assets/Venue_and_Management.jpg",
    bullets: [
      "Modular event structures",
      "Smart LED integrations",
      "Efficient power and connectivity systems",
      "Sustainable and reusable setups",
      "Hybrid event capabilities"
    ],
  },
  {
    title: "Enhancing Audience Engagement",
    image: "/assets/Event_Operations_and_Safety.jpg",
    bullets: [
      "AI-powered activations",
      "Smart kiosks",
      "Gamification AR/VR experiences",
      "Real-time engagement systems",
      "Interactive digital screens"
    ],
  },
  {
    title: "Creative Strategy",
    image: "/assets/Marketing_and_Sponsorship.jpg",
    bullets: [
      "Three creative repetitions",
      "Brand guardian review",
      "2D / 3D design",
      "Content requirements",
      "Experience flow"
    ],
  },
  {
    title: "Enhancing Brand Visibility",
    image: "/assets/Innovative_Properties.jpg",
    bullets: [
      "Premium event branding",
      "High-visibility activation zones",
      "Innovative stage and environment design",
      "Strategic audience flow and engagement planning",
      "Strong media and content opportunities"
    ],
  },
  {
    title: "Digital And Social Engagement",
    image: "/assets/Experience_and_Entertainment_Management.jpg",
    bullets: [
      "Extending Event Impact Beyond the Venue",
      "Live social media engagement",
      "Shareable content moments",
      "Influencer and creator integration",
      "Interactive digital campaigns",
      "Real-time audience participation"
    ],
  }
]

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
          <h2 className="text-4xl font-bold uppercase tracking-tight text-slate-900 sm:text-5xl ">
           Leap events,
            the standard of <br /> the extraordinary
          </h2>
          <p className=" text-sm w-full flex  justify-center md:mt-4">
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
                  className={` text-lg transition-all duration-300 py-8  md:text-base  ${
                    isActive
                      ? "font-bold opacity-100"
                      : "font-medium text-slate-400 opacity-50"
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
                    className="absolute inset-0 space-y-2 text-xs leading-tighter  transition-opacity duration-300 "
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