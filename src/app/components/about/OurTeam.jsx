"use client";

import Image from "next/image";
import { useState } from "react";
import TeamSectionHover from "./TeamHover";

// Sample team data — replace with your real data
const teamMembers = [
  {
    name: "John Doe",
    designation: "Founder & CEO",
    image: "/team/member-1.jpg",
    fact: "Has produced over 200 live events across 12 countries.",
  },
  { name: "Jane Smith", designation: "Creative Director", image: "/team/member-2.jpg", fact: "Started her career designing concert stages at 19." },
  { name: "Alex Carter", designation: "Head of Production", image: "/team/member-3.jpg", fact: "Built a 40-foot LED wall in under 8 hours." },
  { name: "Maria Lopez", designation: "Brand Strategist", image: "/team/member-4.jpg", fact: "Speaks five languages fluently." },
  { name: "David Kim", designation: "Lead Designer", image: "/team/member-5.jpg", fact: "Won three international design awards in 2023." },
  { name: "Sara Ahmed", designation: "Event Manager", image: "/team/member-6.jpg", fact: "Coordinated a 10,000-person festival single-handedly." },
  { name: "Mike Brown", designation: "Tech Lead", image: "/team/member-7.jpg", fact: "Built our entire booking platform from scratch." },
  { name: "Lina Park", designation: "Marketing Head", image: "/team/member-8.jpg", fact: "Grew our social following by 400% in one year." },
  { name: "Omar Hassan", designation: "Operations", image: "/team/member-9.jpg", fact: "Knows every venue manager in three cities by name." },
  { name: "Emma Wilson", designation: "Client Relations", image: "/team/member-10.jpg", fact: "Has never lost a client in 8 years." },
  { name: "Ravi Patel", designation: "Logistics Lead", image: "/team/member-11.jpg", fact: "Moved 50 tons of equipment overnight, twice." },
  { name: "Zoe Chen", designation: "Content Lead", image: "/team/member-12.jpg", fact: "Former journalist turned event storyteller." },
];

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFact, setShowFact] = useState(false);

  const active = teamMembers[activeIndex];

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-12">
      {/* Header */}
      <div className="relative max-w-7xl mx-auto">
        {/* Floating brand icon (hidden on mobile) */}
      
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight">
            WHAT SETS US APART?
            <br />
            THE TEAM
          </h2>
          <p className="mt-4 text-sm sm:text-base ">
            a team that&apos;s been delivering standout events for over a decade.
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="mt-12 lg:mt-16 max-w-7xl mx-auto">
        <div className="flex flex-row gap-8 lg:gap-10 justify-between items-start">
          {/* SHOW FACT — hidden on mobile */}
          <div className="hidden md:flex w-1/4  items-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowFact((s) => !s)}
              aria-pressed={showFact}
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform shadow-md focus:outline-none focus:ring-2 focus:ring-black/30"
            >
              {/* Eye icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <span className="text-xs font-bold tracking-wider text-black">
              SHOW FACT
            </span>
          </div>
                 

          {/* Active member photo */}
 <div className="w-full">
 <TeamSectionHover /></div>
          {/* Team table */}
        
        </div>
        
      </div>
    </section>
  );
}