// components/TrustedByLeaders.tsx
// Next.js 14+ "use client" | Tailwind CSS | Zero extra dependencies
// Background color is driven by the --color-primary CSS variable.
// Swap the placeholder logo nodes for real <Image /> components in production.

"use client";

import Image from "next/image";
import React from "react";

const LOGOS = [
  {
    id: 1,
    name: "Dubai Chamber",
    logo: '/assets/logo8.png'
  },
  {
    id: 2,
    name: "DM",
    logo: '/assets/logo-9.png'
  },
  {
    id: 3,
    name: "Majid Al Futtaim",
    logo: '/assets/du-logo.png'
  },
  {
    id: 4,
    name: "Tejan Dubai",
    logo: '/assets/logo-11.png'
  },
  {
    id: 5,
    name: "Emirates NBD",
    logo: '/assets/logo13.png'
  },
  {
    id: 6,
    name: "Emaar",
    logo: '/assets/logo14.png'
  },
  {
    id: 7,
    name: "Government of Dubai",
    logo: '/assets/logo1.png'
  },

  {
    id: 8,
    logo: '/assets/logo2.png'
  }, {
    id: 9,
    logo: '/assets/logo3.png'


  }, {
    id: 10,
    logo: '/assets/logo4.png'
  }, {

    id: 11,
    logo: '/assets/logo5.png'
  }, {
    id: 12,
    logo: '/assets/logo6.png'
  },

 {
    id: 13,
    logo: '/assets/dubai-publicpark.png'
  },
 {
    id: 14,
    logo: '/assets/vox.png'
  },
   {
    id: 15,
    logo: '/assets/sharjah_internal-removebg-preview-2.png'
  },
  
];


// ─── Marquee ──────────────────────────────────────────────────────────────────
// Renders 3× the logo list so the seam is always off-screen.
// Animation shifts exactly −33.333% (one full copy) → seamless loop.
function LogoMarquee() {
  const items = [...LOGOS, ...LOGOS];

  return (
    <div
      className="relative overflow-hidden  bg-white shadow-xl py-2 md:py-6"
      aria-label="Trusted partner logos"
      role="marquee"
    >
      {/* Edge feather masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-white to-transparent" />

      {/* Scrolling track */}
      <div className="flex" dir="ltr">
      <div
        className="flex will-change-transform marquee"

      >
        {items.map((elem, idx) => (
          <div
            key={`${elem.id}-${idx}`}
            className="flex-shrink-0 flex items-center justify-center mx-4"
            style={{ width: 120, height: 48 }}   // fixed height for every slot
          >
            <Image
              src={elem.logo}
              alt={elem.name ?? "Partner logo"}
              width={120}
              height={48}
              className="object-contain w-full h-full"  // scales inside the box
            />
          </div>
        ))}
      </div>

    <div
        className="flex will-change-transform marquee translate-x-1"

      >
        {items.map((elem, idx) => (
          <div
            key={`${elem.id}-${idx}`}
            className="flex-shrink-0 flex items-center justify-center mx-4"
            style={{ width: 120, height: 48 }}   // fixed height for every slot
          >
            <Image
              src={elem.logo}
              alt={elem.name ?? "Partner logo"}
              width={120}
              height={48}
              className="object-contain w-full h-full"  // scales inside the box
            />
          </div>
        ))}
      </div>
      </div>
      {/* Scoped keyframe — name-spaced to avoid collisions */}

    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function TrustedByLeaders() {
  return (
    <section
      className="relative w-full py-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-primary, #4A90D9)" }}
    >
      {/* Subtle depth highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 85% at 60% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Decorative "d" badge — top-right, matches screenshot */}

      {/* Heading */}
      <h2 className="text-center text-white font-extrabold text-2xl md:text-5xl tracking-[0.25em] tracking-tight uppercase mb-12 md:mb-16 px-4">
        Trusted By Leaders
      </h2>

      {/* Marquee strip */}
      <div className="">
        <LogoMarquee />
  
      </div>
    </section>
  );
}