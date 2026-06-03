"use client";

import Image from "next/image";
import { useState } from "react";

const teamMembers = [
    {
    name: "ahmad issam sammour",
    role: "CEO",
    bio: "Have Dedicated Decades Of Experience In Events And Promotion",
    image: "/assets/ahmed.webp",
  },
  {
    name: "MOHAMMED BAHAA EDIN Boshra",
    role: "Managing Director",
    bio: "Have Dedicated Decades Of Experience In Events And Promotion",
    image: "/assets/about/img1.png",
  },
  
  {
    name: "shujat ali muqri",
    role: "Art Director",
    bio: "Leads The Art Department Team With Enact Knowledge",
    image: "/assets/shujat2.webp",
  },
   {
    name: "Krishna patel",
    role: "Creative Visualiser",
    bio: "Have Dedicated Decades Of Experience In Events And Promotion",
    image: "/assets/krishna.webp",
  },
   {
    name: "zainulabdin shujat ali muqri",
    role: "Design Manager",
    bio: "Have Dedicated Decades Of Experience In Events And Promotion",
    image: "/assets/about/img6.png",
  },
  {
    name: "taher mohamed najeeb al hammami",
    role: "production manager",
    bio: "Leads The Art Department Team With Enact Knowledge",
    image: "/assets/about/img2.png",
  },
 {
    name: "arsalan hussain arbab ali mangi",
    role: "Project Cordinator",
    bio: "Leads The Art Department Team With Enact Knowledge",
    image: "/assets/about/img5.png",
  },
 
  {
    name: "irshad ahmed",
    role: "Finance Manager",
    bio: "Event Enthusiast, Team Builder And Excellent Organizer",
    image: "/assets/about/img4.png",
  },
  {name:"Arjun Viswanath",
  role:"Procurment",
    image:"/assets/about/img7.png" },
  
  {
    name: "Anna Christina Alan Paul",
    role: "Photographer",
    bio: "Event Enthusiast, Team Builder And Excellent Organizer",
    image: "/assets/ana.webp",
  },
  {
    name: "ajay",
    role: "office boy",
    bio: "Event Enthusiast, Team Builder And Excellent Organizer",
       image: "/assets/about/img8.png",

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
      <div className="mx-auto flex max-w-6xl items-start gap-20">
        {/* Left: Stacked image deck (desktop only) */}
        <div className="relative hidden h-72 w-72 shrink-0 md:block">
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
                  transform: `translateY(${i * 50}px)`,
                  transition: "all 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={400}
                  className={`h-full w-full object-cover ${i== 9 ?"object-center" :"object-top"}`}
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
                      className={`relative mx-auto my-3 h-48 w-48 overflow-hidden rounded-2xl transition-transform duration-500 ease-out ${
                        isMobileOpen ? "translate-y-0" : "translate-y-full"
                      }`}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill 
                        sizes="192px"
  className={`object-cover  ${i== 9 ?"object-center" :"object-top"}`}
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
                      className={`text-lg font-semibold transition-colors w-2/3 duration-200 uppercase ${
                        isActive ? "text-blue-500" : "text-gray-400"
                      }`}
                    >
                      {member.name}
                    </span>
                    <span
                      className={`text-sm transition-colors w-1/3 text-center duration-200 ${
                        isActive ? "text-blue-500" : "text-gray-400"
                      }`}
                    >
                      {member.role}
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