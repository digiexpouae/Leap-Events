"use client";

import { useState, useCallback, useRef, useEffect } from "react";

const projects = [
  {
    id: 1,
    title: "D-Tech: Where ideas evolve into innovation, and innovation shapes the future.",
    mainImage: "/assets/home/img-1.png",
  },
  {
    id: 2,
    title: "Innovation Hub: Connecting minds, building the next generation of solutions.",
    mainImage: "/assets/home/im-2.png",
  },
  {
    id: 3,
    title: "TechForward: Pioneering digital transformation across industries.",
    mainImage: "/assets/home/im-3.png",
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

// Converts any index into a signed offset relative to current.
// e.g. with TOTAL=4 and current=0:
//   index 0 → offset  0  (active)
//   index 1 → offset +1  (one to the right)
//   index 3 → offset -1  (one to the left, wraps)



function getOffset(index, current, total) {
  let offset = index - current;
  // Wrap so offset is always in range [-(total/2), total/2]
  if (offset > total / 2)  offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

// Maps an offset to a CSS transform + size + opacity.
// offset  0  → active (large, center)
// offset +1  → right small preview
// offset +2  → far right small preview (faded)
// offset -1  → left (hidden, ready to sweep in)
// anything else → hidden far off-screen
function getStyle(offset) {
 
  switch (offset) {
    case 0:
      return {
        transform: "translateX(0px) translateY(0px)",
        width: "600px", height:"400px",
        opacity: 1, zIndex: 20,
      };
    case 1:
      return {
        transform: "translateX(640px) translateY(100px)",
        width: "200px", height: "200px",
        opacity: 1, zIndex: 10,
      };
    case 2:
      return {
        transform: "translateX(880px) translateY(100px)",
        width: "200px", height: "200px",
        opacity: 0, zIndex: 5,
      };
    case -1:
      return {
        transform: "translateX(-300px) translateY(100px)",
        width: "200px", height: "200px",
        opacity: 0, zIndex: 5,
      };
    default:
      // Positive offsets (unseen future) park far right
      // Negative offsets (further past) park far left
      return offset > 0
        ? { transform: "translateX(1200px) translateY(100px)", width: "200px", height: "200px", opacity: 0, zIndex: 0 }
        : { transform: "translateX(-600px) translateY(100px)", width: "200px", height: "200px", opacity: 0, zIndex: 0 };
  }
}

export default function ProjectSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
const [isMobile,setIsMobile]=useState()
  const goTo = useCallback(
    (nextIndex) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(nextIndex);
      setTimeout(() => setAnimating(false), 600);
    },
    [animating]
  );



useEffect(()=>{

if(window.innerWidth<768){
  setIsMobile(window.innerWidth)
}

},[])




  const handleNext = () => goTo((current + 1) % TOTAL);
  const handlePrev = () => goTo((current - 1 + TOTAL) % TOTAL);

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto flex flex-col gap-12">

        <div className="flex lg:flex-row flex-col gap-12 items-start w-full">
          {/* Left-side header text */}
          <div className="pt-4 relative z-30 shrink-0">
            <p className="text-[26px] leading-tight font-bold text-black max-w-[180px]">
              Projects you might also be interested in
            </p>
          </div>

          {/* Viewport Frame */}
          <div className="relative w-full h-[350px] md:h-[400px] overflow-visible">
            {projects.map((ele, index) => {
              const offset = getOffset(index, current, TOTAL);
              const style = getStyle(offset);
              const isActive = offset === 0;

              return (
                <div
                  key={ele.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: isMobile?"330px":style.width,
                    height:isMobile?"230px": style.height,
                    transform: style.transform,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    transition: "all 900ms cubic-bezier(0.4, 0, 0.2, 1)",
                    borderRadius: "34px",
                    overflow: "hidden",
                  }}
                >
                  <div className="w-full h-full relative">
                    <img
                      src={ele.mainImage}
                      alt={ele.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-40"
                      }`}
                    />
                  </div>

                  {/* Badge */}
                  <div className="absolute left-6 top-6 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                    {index + 1}/{TOTAL}
                  </div>

                  {/* Title */}
                  <div
                    className={`absolute bottom-8 left-8 right-8 text-white transition-all duration-500 delay-100 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <h2 className="text-[20px] md:text-[26px] leading-tight font-medium max-w-[520px]">
                      {ele.title}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center lg:justify-end w-full">
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={animating}
              aria-label="Previous project"
              className="w-14 h-14 rounded-full bg-[var(--color-primary)] cursor-pointer hover:bg-blue-400 active:scale-95 transition-all duration-150 flex items-center justify-center shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={animating}
              aria-label="Next project"
              className="w-14 h-14 rounded-full bg-[var(--color-primary)]  cursor-pointer hover:bg-blue-400 active:scale-95 transition-all duration-150 flex items-center justify-center shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}