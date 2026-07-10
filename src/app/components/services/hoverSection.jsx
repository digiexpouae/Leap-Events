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
    title: "Technology-Driven Business Growth ",
    image:
      "/assets/creative.jpg",
    bullets: [
      "Creative Strategy",
      "Branding Services",
      "Graphic Design and Art Direction",
      "Content Creation",
      "Photo, Video and Animation",
    ],
  },
  {
    title: "Strong Brand Connection & Expansion",
    image:
      "/assets/Spatial_and_Experiential_Design.jpg",
    bullets: [
'Spatial Design',
'Experiential Design',
'Interior Design',
'3d design services',
'Multi-Sensory Experiences',
'Augmented Reality',
'Interactive Experiences',
    ],
  },
  {
    title: "Brand Connection & Human Engagement",
    image:
      "/assets/Technical_Production_and_Execution.jpg",
    bullets: [
     
'AV, Staging and Fabrication',
'Synchronized Audio to Video',
'Computer-aide ddesign (CAD)',
'3D Projections services',
'Robotics services',
'Drone Show Production',
'Motion Tracking Technology',
'Data Visualization and Creative Coding'
    ],
  },
  {
    title: "Major events ",
    image:
      "/assets/Venue_and_Management.jpg",
    bullets: [
     "Venue Sourcing and Management", "Temporary Structures", "Food and beverage", "Signage services", "Ticketing services", "Permits and Permissions", "Hostesses services",
    ],
  },
  {
    title: "Minor events",
    image:
      "/assets/Event_Operations_and_Safety.jpg",
    bullets: [
      "Security and Protocol", "Health and Safety", "Entertainment services", "Traffic Management"
    ],
  },
  {
    title: "Cultural events",
    image:
      "/assets/Marketing_and_Sponsorship.jpg",
    bullets: [
     "Marketing Strategy and Campaign Management", "Sponsorship Acquisition and Management", "Public Relations and Media Outreach", "Digital Marketing and Social Media Promotion", "Content Creation and Brand Storytelling",
    ],
  },
  {
    title: "Community events",
    image:
      "/assets/Innovative_Properties.jpg",
    bullets: [
     "Brand Activation and Engagement Campaigns", "Interactive and Immersive Experiences", "Digital and Virtual Event Solutions", "Custom Event Properties for Unique Audience Engagement",
    ],
  },
  {
    title: "Mall activation ",
    image:
      "/assets/Experience_and_Entertainment_Management.jpg",
    bullets: [
    "Content Curation", "Food and Beverage Curation", "Stage and Production Management", "Exhibition and Vendor Management", "Entertainment and Talent Booking",


    ],
  },
];
  return (
    <div className='md:hidden block  w-full px-6  py-16'>


              <div className="flex flex-col gap-6 md:items-start md:justify-between py-8">
                <h2 className="text-3xl font-bold uppercase tracking-tight text-[#363737] sm:text-5xl ">
                 Leap events,
                  the standard of <br /> the extraordinary
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
                      className={`relative mx-auto my-3 h-48 w-48 overflow-hidden rounded-2xl transition-transform duration-500 ease-out ${
                        isMobileOpen ? "translate-y-0" : "translate-y-full"
                      }`}
                    >
                      <Image
                        src={member.image}
                        alt={member.title}
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
