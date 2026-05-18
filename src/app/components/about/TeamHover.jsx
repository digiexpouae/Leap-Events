"use client";

import Image from "next/image";
import { useState } from "react";

const teamMembers = [
  { name: "John Doe", designation: "Founder & CEO",   image: "/assets/about/person.png",
},
  { name: "Jane Smith", designation: "Creative Director",    image: "/assets/about/person.png",
 },
  { name: "Alex Carter", designation: "Head of Production",    image: "/assets/about/person.png",
 },
  { name: "Maria Lopez", designation: "Brand Strategist",    image: "/assets/about/person.png",
},
  { name: "David Kim", designation: "Lead Designer",     image: "/assets/about/person.png",
},
  { name: "Sara Ahmed", designation: "Event Manager",    image: "/assets/about/person.png",
},
  { name: "Mike Brown", designation: "Tech Lead",     image: "/assets/about/person.png",
 },
  { name: "Lina Park", designation: "Marketing Head",     image: "/assets/about/person.png",
},
  { name: "Omar Hassan", designation: "Operations",    image: "/assets/about/person.png",
},
  { name: "Emma Wilson", designation: "Client Relations",     image: "/assets/about/person.png",
 },
];

export default function TeamSectionHover() {
  const [activeIndex, setActiveIndex] = useState(0);
  // mobile: which row's image is currently revealed (null = none)
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null);

  const handleRowClick = (i) => {
    setActiveIndex(i);
    // toggle on mobile: tap same row again to close
    setMobileOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="min-h-screen px-6 md:px-16">
      <div className="mx-auto flex max-w-6xl items-center gap-20">
        {/* Left: Stacked image deck (desktop only) */}
        <div className="relative hidden h-[460px] w-72 shrink-0 md:block">
          {teamMembers.map((member, i) => {
            const isActive = activeIndex === i;
            const distance = i - activeIndex;
            const absDist = Math.abs(distance);

            return (
              <div
                key={i}
                className="absolute inset-0 overflow-hidden rounded-2xl"
                style={{
                  zIndex: isActive ? 20 : teamMembers.length - absDist,
                  opacity: isActive ? 1 : 0,
                  transform: `translateY(${i * 20}px)`,
                  transition: "all 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={400}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {/* Right: Name / Designation list */}
        <div className="flex-1">
          <div className="mb-2 flex justify-between border-b border-black/15 pb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-900">
              Name
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-900">
              Designation
            </span>
          </div>

          <ul>
            {teamMembers.map((member, i) => {
              const isActive = activeIndex === i;
              const isMobileOpen = mobileOpenIndex === i;

              return (
                <li key={i} className="border-b border-black/10">
                  {/* Mobile image — slides up from bottom, sits above the text */}
                  <div
                    className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
                      isMobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div
                      className={`relative mx-auto my-3 h-64 w-48 overflow-hidden rounded-2xl transition-transform duration-500 ease-out ${
                        isMobileOpen ? "translate-y-0" : "translate-y-full"
                      }`}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="192px"
                        className="object-cover"
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Row */}
                  <div
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => handleRowClick(i)}
                    className="flex cursor-pointer items-baseline justify-between py-3.5 transition-all duration-200"
                  >
                    <span
                      className={`text-lg font-semibold transition-colors duration-200 md:text-xl ${
                        isActive ? "text-blue-500" : "text-gray-400"
                      }`}
                    >
                      {member.name}
                    </span>
                    <span
                      className={`text-sm transition-colors duration-200 ${
                        isActive ? "text-blue-500" : "text-gray-400"
                      }`}
                    >
                      {member.designation}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}