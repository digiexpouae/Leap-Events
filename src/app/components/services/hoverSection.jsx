"use client"

import Image from 'next/image';
import React, { useState } from 'react'
const hoverSection = () => {
      const [activeIndex, setActiveIndex] = useState(0);
  // mobile: which row's image is currently revealed (null = none)
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null);
const handleRowClick = (i) => {
    setActiveIndex(i);
    // toggle on mobile: tap same row again to close
    setMobileOpenIndex((prev) => (prev === i ? null : i));
  };

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
    image: "/assets/e-w-ferjan-festival-resized.webp",
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
image:"/assets/e-w-dubai-universtity.webp",
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
  return (
    <div className='md:hidden block  w-full px-6  py-16'>


              <div className="flex flex-col gap-6 md:items-start md:justify-between py-8">
                <h2 className="text-3xl font-bold uppercase tracking-tight text-[#363737] sm:text-5xl ">
                 Leap events,
                  the standard of the <br />  extraordinary
                </h2>
                <p className=" text-sm w-full flex text-[#363737]  justify-center md:mt-4 text-[#363737]">
                 Redefining event experiences through bold creativity, immersive storytelling,<br /> and future-forward execution that goes beyond conventional expectations. 
      
                </p>
              </div>
          <ul>
            {SERVICES.map((member, i) => {
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
                      className={`relative mx-auto my-3 h-48 w-64 overflow-hidden rounded-2xl transition-transform duration-500 ease-out ${
                        isMobileOpen ? "translate-y-0" : "translate-y-full"
                      }`}
                    >
                      <Image
                        src={member.image}
                        alt={member.title}
                        fill 
                        sizes="192px"
  className={`object-cover  ${member.title == "Community Events" ? "object-[100%_0%]":member.title == "Educational Events"  ? "object-[100%_0%]":"object-center"}`}
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Row */}
                  <div
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => handleRowClick(i)}
                    className="flex cursor-pointer items-baseline justify-between gap-4 py-3.5 transition-all duration-200"
                  >
                    <span
                      className={`text-base font-semibold transition-colors w-2/3 duration-200 uppercase ${
                        isActive ? "text-blue-500" : "text-[#363737]"
                      }`}
                    >
                      {member.title}
                    </span>
                    <span
                      className={`text-[8px] transition-colors w-1/3 text-center duration-200 ${
                        isActive ? "text-blue-500" : "text-[#363737]"
                      }`}
                    >
                      {member.bullets}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
    </div>
  )
}

export default hoverSection
