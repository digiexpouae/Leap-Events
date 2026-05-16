"use client";

import { useState, useCallback, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "D-Tech: Where ideas evolve into innovation, and innovation shapes the future.",
    mainImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
  },
  {
    id: 2,
    title: "Innovation Hub: Connecting minds, building the next generation of solutions.",
    mainImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&q=80",
  },
  {
    id: 3,
    title: "TechForward: Pioneering digital transformation across industries.",
    mainImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80",
  },
  {
    id: 4,
    title: "FutureWave: Empowering communities through cutting-edge technology.",
    mainImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=80",
  },
];

const TOTAL = projects.length;

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

export default function ProjectSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(null);
  const prevIndexRef = useRef(0);

  const goTo = useCallback(
    (nextIndex, dir) => {
      if (animating) return;
      prevIndexRef.current = current;
      setDirection(dir);
      setAnimating(true);

      setCurrent(nextIndex);

      setTimeout(() => {
        setAnimating(false);
        setDirection(null);
      }, 600); // Animation duration
    },
    [animating, current]
  );

  const handleNext = () => {
    const nextIndex = (current + 1) % TOTAL;
    goTo(nextIndex, "next");
  };

  const handlePrev = () => {
    const prevIndex = (current - 1 + TOTAL) % TOTAL;
    goTo(prevIndex, "prev");
  };

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto flex flex-col gap-12">

        <div className="flex lg:flex-row flex-col gap-12 items-start w-full">
          {/* Left-side header text */}
          <div className="pt-4 relative z-30 shrink-0">
            <p className="text-[26px] leading-tight font-extrabold text-black max-w-[180px]">
              Projects you might also be interested in
            </p>
          </div>

          {/* Viewport Frame */}
          <div className="relative w-full h-[450px] md:h-[400px] overflow-visible">
            {projects.map((ele, index) => {
              const isActive = index === current;
              const isPrevious = index === prevIndexRef.current;

              const isNextPreview = index === (current + 1) % TOTAL;
              const isFarPreview = index === (current + 2) % TOTAL;

              let placementClass = "";

              // 1. IDLE STATE (Static display between clicks)
              if (!animating) {
                if (isActive) {
                  placementClass = "w-[600px] h-[400px] translate-x-0 scale-100 opacity-100 z-20";
                } else if (isNextPreview) {
                  placementClass = "w-[200px] h-[200px] translate-x-[640px] translate-y-[100px] scale-100 opacity-100 z-10";
                } else if (isFarPreview) {
                  placementClass = "w-[200px] h-[200px] translate-x-[880px] translate-y-[100px] scale-100 opacity-100 z-0";
                } else {
                  // Keep remaining elements off-screen to the right by default
                  placementClass = "w-[200px] h-[200px] translate-x-[1200px] translate-y-[100px] scale-90 opacity-0 z-0";
                }
              }

              // 2. NEXT CLICK MECHANICS (Right-to-Left movement)
              else if (direction === "next") {
                if (isPrevious) {
                  // Old active card sweeps out hard to the left
                  placementClass = "w-[600px] h-[400px] -translate-x-[1000px] scale-95 opacity-0 z-0";
                } else if (isActive) {
                  // New active card moves inward from its preview spot on the right to center stage
                  placementClass = "w-[600px] h-[400px] translate-x-0 scale-100 opacity-100 z-20";
                } else if (isNextPreview) {
                  placementClass = "w-[200px] h-[200px] translate-x-[640px] translate-y-[100px] scale-100 opacity-100 z-10";
                } else if (isFarPreview) {
                  placementClass = "w-[200px] h-[200px] translate-x-[880px] translate-y-[100px] scale-100 opacity-100 z-0";
                } else {
                  placementClass = "w-[200px] h-[200px] translate-x-[1200px] translate-y-[100px] scale-90 opacity-0 z-0";
                }
              }

              // 3. PREV CLICK MECHANICS (Left-to-Right movement)
              else if (direction === "prev") {
                if (isPrevious) {
                  // Old active card shrinks and shifts over to become the first right preview card
                  placementClass = "w-[200px] h-[200px] translate-x-[640px] translate-y-[100px] scale-100 opacity-100 z-10";
                } else if (isActive) {
                  // New active card sweeps directly from the left out-of-bounds array area straight to the center
                  placementClass = "w-[600px] h-[400px] translate-x-0 scale-100 opacity-100 z-20";
                } else if (isNextPreview) {
                  // Existing preview items shift rightward down the track
                  placementClass = "w-[200px] h-[200px] translate-x-[880px] translate-y-[100px] scale-100 opacity-100 z-0";
                } else {
                  // Force incoming target state calculation to prepare on the left before sweeping right
                  placementClass = "w-[600px] h-[400px] -translate-x-[1000px] scale-95 opacity-0 z-0";
                }
              }

              return (
                <div
                  key={ele.id}
                  className={`absolute top-0 left-0 max-w-full origin-center rounded-[34px] transition-all duration-600 ease-in-out overflow-hidden transform select-none ${placementClass}`}
                >
                  <div className="w-full h-full relative">
                    <img
                      src={ele.mainImage}
                      alt={ele.title}
                      className="w-full h-full object-cover rounded-[34px]"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`} />
                  </div>

                  {/* Slider Progress Index */}
                  <div className="absolute left-6 top-6 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                    {index + 1}/{TOTAL}
                  </div>

                  {/* Title text styling */}
                  <div className={`absolute bottom-8 left-8 right-8 text-white transition-all duration-500 delay-100 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                    <h2 className="text-[20px] md:text-[26px] leading-tight font-extrabold max-w-[520px]">
                      {ele.title}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls Button Row */}
        <div className="flex items-center justify-center lg:justify-end w-full">
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={animating}
              aria-label="Previous project"
              className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-150 flex items-center justify-center shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={animating}
              aria-label="Next project"
              className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-150 flex items-center justify-center shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}