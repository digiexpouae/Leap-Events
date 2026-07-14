"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";


const projects = [
  {
    id: 1,
    title: "FERJAN FESTIVAL",
    year: "2025",
    image: "/assets/w-ferjan-festival.webp",
    videoUrl: "https://youtu.be/VnZ5EkXupHQ",
  },
  {
    id: 2,
    title: "RAMADAN SOUQ",
    year: "2025",
    image: "/assets/souq-ramadan.webp",
    videoUrl: "https://youtu.be/p0v3EM14Jv4",
  },
  {
    id: 4,
    title: "CITY CENTRE AL ZAHIA",
    year: "2024",
    image: "/assets/city-al-zahia.webp",
    videoUrl: "https://youtu.be/Z02w0ts5FLI",
  },
  {
    id: 5,
    title: "SHARJAH INTERNATIONAL FILM FESTIVAL",
    year: "2025",
    image: "/assets/w-international-film-festival.webp",
    videoUrl: "https://youtu.be/TOl8VrXGkmY",
  },
  {
    id: 6,
    title: "UNIVERSITY OF DUBAI",
    year: "2024",
    image: "/assets/w-dubai-universtity.webp",
    videoUrl: "https://youtu.be/nDCbXoRmB_Q",
  },
  {
    id: 7,
    title: "GEMS GRADUATION EVENT",
    year: "2024",
    image: "/assets/w-gems-achool.webp",
    videoUrl: "https://youtu.be/j1ZwWgsQDN0",
  },
  {
    id: 8,
    title: "du",
    year: "2024",
    image: "/assets/w-du.webp",
    videoUrl: "https://youtu.be/UrkUYgpevQE",
  },
];




const TOTAL         = projects.length;
const AUTO_INTERVAL = 3000;

// Velocity threshold (px/ms) to trigger a slide on quick flick
const VELOCITY_THRESHOLD = 0.3;
// Distance threshold (px) to trigger a slide on slow drag
const DISTANCE_THRESHOLD = 60;

// Custom play cursor (your SVG encoded)
const PLAY_CURSOR = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 130 130' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='mask0' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='130' height='130'%3E%3Cpath d='M130 0H0V130H130V0Z' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23mask0)'%3E%3Cpath d='M64.8389 14.334C92.8214 14.3342 115.505 37.0186 115.505 65.001C115.505 92.9829 92.8213 115.667 64.8389 115.667C36.8567 115.667 14.172 92.983 14.1719 65.001C14.1719 37.0185 36.8565 14.334 64.8389 14.334Z' stroke='white' stroke-width='7'/%3E%3Cpath d='M81.0869 55.4141L65.3786 46.3684C61.4786 44.0934 56.7661 44.0934 52.8659 46.3684C48.9659 48.6434 46.6367 52.6517 46.6367 57.2016V75.3474C46.6367 79.8433 48.9659 83.9058 52.8659 86.1808C54.8161 87.3183 56.9828 87.8599 59.0953 87.8599C61.2619 87.8599 63.3744 87.3183 65.3244 86.1808L81.0328 77.1349C84.9328 74.8599 87.2619 70.8516 87.2619 66.3016C87.3703 61.7516 85.0411 57.6891 81.0869 55.4141Z' fill='%23FFFCFC'/%3E%3C/g%3E%3C/svg%3E") 20 20, pointer`;

// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({ project, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // useEffect(() => { videoRef.current?.play(); }, []);

  const getYouTubeId = (url) => {
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : null;
};
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(6px)",
        animation: "fadeIn 200ms ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", width: "100%", maxWidth: "900px",
          borderRadius: "24px", overflow: "hidden", background: "#000",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          animation: "scaleIn 250ms cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* <video
          ref={videoRef}
          src={project.videoUrl}
          controls autoPlay playsInline muted
          style={{ width: "100%", display: "block", maxHeight: "80vh" }}
        /> */}


        <iframe
  width="100%"
  height="480"
   ref={videoRef}
  src={`https://www.youtube.com/embed/${getYouTubeId(project.videoUrl)}?autoplay=1&mute=1&rel=0`}


  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  style={{ display: "block", maxHeight: "80vh" }}
/>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "32px 28px 20px",
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          pointerEvents: "none",
        }}>
          <p 
          className=" text-sm md:text-[20px]"
          style={{ margin: 0, color: "#fff",fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {project.title}
          </p>
          <p className="mt-2 inline-flex rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
      {project.year}
</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close video"
          style={{
            position: "absolute", top: "16px", right: "16px",
            width: "40px", height: "40px", borderRadius: "50%",
            background: "rgba(0,0,0,0.5)", border: "none",
            color: "#fff", fontSize: "20px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)", transition: "background 150ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
        >✕</button>
      </div>
      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes scaleIn { from { transform:scale(0.92);opacity:0 } to { transform:scale(1);opacity:1 } }
      `}</style>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getOffset(index, current, total) {
  let offset = index - current;
  if (offset > total / 2)  offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function getStyle(offset) {
  switch (offset) {
    case  0: return { transform: "translateX(0px) translateY(0px)",      width: "600px", height: "400px", opacity: 1, zIndex: 20 };
    case  1: return { transform: "translateX(640px) translateY(100px)",  width: "200px", height: "200px", opacity: 1, zIndex: 10 };
    case  2: return { transform: "translateX(880px) translateY(100px)",  width: "200px", height: "200px", opacity: 0, zIndex: 5  };
    case -1: return { transform: "translateX(-300px) translateY(100px)", width: "200px", height: "200px", opacity: 0, zIndex: 5  };
    default:
      return offset > 0
        ? { transform: "translateX(1200px) translateY(100px)", width: "200px", height: "200px", opacity: 0, zIndex: 0 }
        : { transform: "translateX(-600px) translateY(100px)", width: "200px", height: "200px", opacity: 0, zIndex: 0 };
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProjectSlider() {
  const [current, setCurrent]         = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMobile, setIsMobile]       = useState(false);
  const [isDragging, setIsDragging]   = useState(false);

  const autoTimer    = useRef(null);
  const currentRef   = useRef(0);
  const animatingRef = useRef(false);

  // Drag tracking
  const dragStartX   = useRef(null);
  const dragStartT   = useRef(null);   // timestamp for velocity
  const dragLastX    = useRef(null);   // last position for velocity
  const dragLastT    = useRef(null);
  const dragMoved    = useRef(false);
  const dragFired    = useRef(false);  // slide already fired this drag

  useEffect(() => {
    if (window.innerWidth < 768) setIsMobile(true);
  }, []);

  const goTo = useCallback((nextIndex) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setCurrent(nextIndex);
    currentRef.current = nextIndex;
    setTimeout(() => { animatingRef.current = false; }, 500);
  }, []);

  const goNext = useCallback(() => goTo((currentRef.current + 1) % TOTAL), [goTo]);
  const goPrev = useCallback(() => goTo((currentRef.current - 1 + TOTAL) % TOTAL), [goTo]);

  // ── Auto-slide ──────────────────────────────────────────────────────────────
  const resetAutoTimer = useCallback(() => {
    clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      goTo((currentRef.current + 1) % TOTAL);
    }, AUTO_INTERVAL);
  }, [goTo]);

  useEffect(() => {
    resetAutoTimer();
    return () => clearInterval(autoTimer.current);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (activeVideo) clearInterval(autoTimer.current);
    else resetAutoTimer();
  }, [activeVideo]); 
  // ── Mouse drag ──────────────────────────────────────────────────────────────
  const onMouseMove = useCallback((e) => {
    if (dragStartX.current === null) return;

    const now  = performance.now();
    const x    = e.clientX;
    const diff = dragStartX.current - x;

    // Track velocity with last two points
    dragLastX.current = x;
    dragLastT.current = now;

    if (Math.abs(diff) > 8) dragMoved.current = true;

    // Fire immediately on velocity flick — no waiting for mouseup
    if (!dragFired.current) {
      const dt = now - dragStartT.current;
      const velocity = dt > 0 ? Math.abs(diff) / dt : 0; // px/ms

      const quickFlick = velocity > VELOCITY_THRESHOLD && Math.abs(diff) > 20;
      const slowDrag   = Math.abs(diff) >= DISTANCE_THRESHOLD;

      if (quickFlick || slowDrag) {
        dragFired.current = true;
        if (diff > 0) { goNext(); } else { goPrev(); }
        resetAutoTimer();
      }
    }
  }, [goNext, goPrev, resetAutoTimer]);

  const onMouseUp = useCallback((e) => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup",   onMouseUp);
    document.body.style.cursor = "";
    setIsDragging(false);

    // If no slide fired yet, do a final check on total distance
    if (!dragFired.current && dragStartX.current !== null) {
      const diff = dragStartX.current - e.clientX;
      if (Math.abs(diff) >= 30) {
        if (diff > 0) goNext(); else goPrev();
        resetAutoTimer();
      }
    }

    dragStartX.current = null;
    dragFired.current  = false;
    setTimeout(() => { dragMoved.current = false; }, 0);
  }, [goNext, goPrev, resetAutoTimer, onMouseMove]);

  const onMouseDown = useCallback((e) => {
    dragStartX.current = e.clientX;
    dragStartT.current = performance.now();
    dragLastX.current  = e.clientX;
    dragLastT.current  = performance.now();
    dragMoved.current  = false;
    dragFired.current  = false;

    document.body.style.cursor = "grabbing";
    setIsDragging(true);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup",   onMouseUp);
  }, [onMouseMove, onMouseUp]);

  // ── Touch ───────────────────────────────────────────────────────────────────
  const touchStartX = useRef(null);
  const touchStartT = useRef(null);
  const touchFired  = useRef(false);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartT.current = performance.now();
    touchFired.current  = false;
    dragMoved.current   = false;
  };

  const onTouchMove = (e) => {
    if (touchStartX.current === null || touchFired.current) return;
    const now  = performance.now();
    const x    = e.touches[0].clientX;
    const diff = touchStartX.current - x;
    const dt   = now - touchStartT.current;
    const velocity = dt > 0 ? Math.abs(diff) / dt : 0;

    if (Math.abs(diff) > 8) dragMoved.current = true;

    const quickFlick = velocity > VELOCITY_THRESHOLD && Math.abs(diff) > 20;
    const slowDrag   = Math.abs(diff) >= DISTANCE_THRESHOLD;

    if (quickFlick || slowDrag) {
      touchFired.current = true;
      if (diff > 0) goNext(); else goPrev();
      resetAutoTimer();
    }
  };

  const onTouchEnd = (e) => {
    if (!touchFired.current && touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) >= 30) {
        if (diff > 0) goNext(); else goPrev();
        resetAutoTimer();
      }
    }
    touchStartX.current = null;
    touchFired.current  = false;
    setTimeout(() => { dragMoved.current = false; }, 0);
  };

  // ── Click ───────────────────────────────────────────────────────────────────
  const handleCardClick = (ele, offset) => {
    if (dragMoved.current) return;
    if (offset === 0)  setActiveVideo(ele);
    if (offset === 1)  { goNext(); resetAutoTimer(); }
    if (offset === -1) { goPrev(); resetAutoTimer(); }
  };

  return (
    <>
      {activeVideo && (
        <VideoModal project={activeVideo} onClose={() => setActiveVideo(null)} />
      )}

      <section className="w-full bg-white py-18 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="max-w-5xl mx-auto ">
          <div className="flex lg:flex-row flex-col gap-12 items-start w-full">

            {/* Left header */}
            <div className="pt-4 relative z-30 shrink-0">
              <p className="text-[26px] leading-tight font-bold text-[#363737] max-w-[180px]">
                Projects you might also be interested in
              </p>
            </div>

            {/* Viewport */}
            <div className="relative w-full h-[350px] md:h-[400px] overflow-visible">
              {projects.map((ele, index) => {
                const offset   = getOffset(index, current, TOTAL);
                const st       = getStyle(offset);
                const isActive = offset === 0;
                const isNext   = offset === 1;

                return (
                  <div
                    key={ele.id}
                    onMouseDown={isActive ? onMouseDown : undefined}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onClick={() => handleCardClick(ele, offset)}
                    style={{
                      position:     "absolute",
                      top:          0,
                      left:         0,
                      width:        isMobile ? "330px" : st.width,
                      height:       isMobile ? "230px" : st.height,
                      transform:    st.transform,
                      opacity:      st.opacity,
                      zIndex:       st.zIndex,
                      transition:   "transform 480ms cubic-bezier(0.25, 0.46, 0.45, 0.94), width 480ms cubic-bezier(0.25, 0.46, 0.45, 0.94), height 480ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 350ms ease",
                      borderRadius: "34px",
                      overflow:     "hidden",
                      userSelect:   "none",
                      cursor:       isActive
                        ? (isDragging ? "grabbing" : PLAY_CURSOR)
                        : isNext ? "pointer" : "default",
                    }}
                  >
                    <div className="w-full h-full relative">
                      <Image
                        src={ele.image}
                        alt={ele.title}
                        width={600}
                        height={400}
                        draggable={false}
                        className="w-full h-full object-cover pointer-events-none select-none"
                      />
                      {isMobile &&
                        (<div className="absolute inset-0 z-30 flex items-center justify-center "
                
                 ><span className=" h-[30%] w-[20%] transition-transform duration-300 hover:scale-110" style={{backgroundImage:`url("/assets/play-icon.svg")`,
                  backgroundSize:"cover",backgroundPosition:'center'}}></span></div>
                   
                 )}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-50"}`} />
               
                    </div>

                    {/* Next hint */}
                    {isNext && (
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: "6px", pointerEvents: "none",
                      }}>
                        <svg width="32" height="32" viewBox="0 0 24 24"
                          fill="none" stroke="white" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"
                          style={{ animation: "nudge 1.2s ease-in-out infinite" }}
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                        <span style={{
                          color: "white", fontSize: "10px", fontWeight: 600,
                          letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.9,
                        }}>next</span>
                      </div>
                    )}

                    {/* Badge */}
                    <div className="absolute left-5 top-5 bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium">
                      {index + 1}/{TOTAL}
                    </div>

                    {/* Title */}
                    {isActive && (
                      <div className="absolute bottom-2 md:bottom-8 left-8 right-8 text-white">
                        <h2 className={`text-sm md:text-[26px] ${ele.title == "du" ? "lowercase" : "uppercase"} leading-tight font-medium max-w-[520px]`}>
                          {ele.title}
                        </h2>
                           <p className="mt-2 inline-flex rounded-full bg-black/20 px-3 py-1 text-xs md:text-base font-medium text-white"
                       style={{
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
}}>
      {ele.year}
</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes nudge {
          0%, 100% { transform: translateX(0px); }
          50%       { transform: translateX(7px); }
        }
      `}</style>
    </>
  );
}