"use client";

import Image from "next/image";
import { useState } from "react";
import TeamSectionHover from "./TeamHover";
import FadeUp from "@/app/common/Transition";

// Sample team data — replace with your real data


const teamMembers = [
    {
    name: "ahmad issam sammour",
    role: "CEO",
    bio: "Have Dedicated Decades Of Experience In Events And Promotion",
    image: "/assets/ahmed.png",
  },
  {
    name: "MOHAMMED BAHAA EDIN Boshra",
    role: "Managing Director",
    bio: "Have Dedicated Decades Of Experience In Events And Promotion",
    image: "/assets/about/img1.png",
  },
  {
    name: "taher mohamed najeeb al hammami",
    role: "production manager",
    bio: "Leads The Art Department Team With Enact Knowledge",
    image: "/assets/about/img2.png",
  },

  {
    name: "shujat ali muqri",
    role: "Art Director",
    bio: "Leads The Art Department Team With Enact Knowledge",
    image: "/assets/shujat2.webp",
  },
  {
    name: "irshad ahmed",
    role: "Finance Manager",
    bio: "Event Enthusiast, Team Builder And Excellent Organizer",
    image: "/assets/about/img4.png",
  },
  {
    name: "arsalan hussain arbab ali mangi",
    role: "Project Cordinator",
    bio: "Leads The Art Department Team With Enact Knowledge",
    image: "/assets/about/img5.png",
  },
  {
    name: "zainulabdin shujat ali muqri",
    role: "Design Manager",
    bio: "Have Dedicated Decades Of Experience In Events And Promotion",
    image: "/assets/about/img6.png",
  },

   {
    name: "Krishna patel",
    role: "Creative Visualiser",
    bio: "Have Dedicated Decades Of Experience In Events And Promotion",
    image: "/assets/krishna.png",
  },
  {
    name: "arjun viswanath",
    role: "Procurment Manager",
    bio: "Event Enthusiast, Team Builder And Excellent Organizer",
    image: "/assets/about/img7.png",
  },
    {
    name: "Anna Christina Alan Paul",
    role: "Photography Intern",
    bio: "Event Enthusiast, Team Builder And Excellent Organizer",
    image: "/assets/ana.jpeg",
  },
  {
    name: "ajay",
    role: "office boy",
    bio: "Event Enthusiast, Team Builder And Excellent Organizer",
       image: "/assets/about/img8.png",

  },
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
         <FadeUp> 
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
        </FadeUp> 
      </div>

      {/* Main content grid */}
               <FadeUp> 

      <div className="mt-12 lg:mt-16 max-w-7xl mx-auto">
        <div className="flex flex-row gap-8 lg:gap-10 justify-between items-start">
          {/* SHOW FACT — hidden on mobile */}
          <div className="hidden lg:flex w-1/4  items-center gap-3 pt-4">
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
      </FadeUp> 

    </section>
  );
}