"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";

const projects = [
  { id: 1,  title: "FERJAN FESTIVAL",            mainImage: "/assets/ferjan-festival-logo.webp",       videoUrl: "/assets/leap.mp4" },
  { id: 2,  title: "souq ramadan",               mainImage: "/assets/souq-ramadan-logo.webp",          videoUrl: "/assets/leap.mp4" },
  { id: 3,  title: "university of dubai",        mainImage: "/assets/dubai-universtity-logo.webp",     videoUrl: "/assets/leap.mp4" },
  { id: 4,  title: "winter garden",              mainImage: "/assets/winter-garden.webp",              videoUrl: "/assets/leap.mp4" },
  { id: 5,  title: "international film festival",mainImage: "/assets/internationalfilmfestival.webp",  videoUrl: "/assets/leap.mp4" },
  { id: 6,  title: "souqal freej",               mainImage: "/assets/souqalfreej.webp",                videoUrl: "/assets/leap.mp4" },
  { id: 7,  title: "summer rush",                mainImage: "/assets/summerrush.webp",                 videoUrl: "/assets/leap.mp4" },
  { id: 8,  title: "gems school",                mainImage: "/assets/gemsachool.webp",                 videoUrl: "/assets/leap.mp4" },
  { id: 9,  title: "mastermind",                 mainImage: "/assets/master-mind-logo.webp",           videoUrl: "/assets/leap.mp4" },
  { id: 10, title: "du",                         mainImage: "/assets/du.webp",                         videoUrl: "/assets/leap.mp4" },
];

const TOTAL          = projects.length;
const AUTO_INTERVAL  = 3000;
const DRAG_THRESHOLD = 50;

// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({ project, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => { videoRef.current?.play(); }, []);

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
        <video
          ref={videoRef}
          src={project.videoUrl}
          controls autoPlay playsInline muted
          style={{ width: "100%", display: "block", maxHeight: "80vh" }}
        />

        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "32px 28px 20px",
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          pointerEvents: "none",
        }}>
          <p style={{ margin: 0, color: "#fff", fontSize: "20px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {project.title}
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
        >
          ✕
        </button>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { transform: scale(0.92); opacity: 0 } to { transform: scale(1); opacity: 1 } }
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

  const autoTimer    = useRef(null);
  const currentRef   = useRef(0);
  const animatingRef = useRef(false);

  // Per-card drag state — lives in refs, no re-renders
  const dragStartX = useRef(null);
  const dragMoved  = useRef(false);

  useEffect(() => {
    if (window.innerWidth < 768) setIsMobile(true);
  }, []);

  const goTo = useCallback((nextIndex) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setCurrent(nextIndex);
    currentRef.current = nextIndex;
    setTimeout(() => { animatingRef.current = false; }, 600);
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
  }, [activeVideo]); // eslint-disable-line

  // ── Drag handlers — attached directly to each card ─────────────────────────
  // Mouse
  const onMouseDown = (e) => {
    dragStartX.current = e.clientX;
    dragMoved.current  = false;
    // Capture mouse globally so drag works even when leaving the card
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
  };

  const onMouseMove = useCallback((e) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > DRAG_THRESHOLD) {
      dragMoved.current = true;
    }
  }, []);

  const onMouseUp = useCallback((e) => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup",   onMouseUp);
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) >= DRAG_THRESHOLD) {
      if (diff > 0) goNext(); else goPrev();
      resetAutoTimer();
    }
    dragStartX.current = null;
    // Keep dragMoved true briefly so onClick doesn't fire
    setTimeout(() => { dragMoved.current = false; }, 0);
  }, [goNext, goPrev, resetAutoTimer, onMouseMove]);

  // Touch
  const onTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
    dragMoved.current  = false;
  };

  const onTouchMove = (e) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.touches[0].clientX - dragStartX.current) > DRAG_THRESHOLD) {
      dragMoved.current = true;
    }
  };

  const onTouchEnd = (e) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) >= DRAG_THRESHOLD) {
      if (diff > 0) goNext(); else goPrev();
      resetAutoTimer();
    }
    dragStartX.current = null;
    setTimeout(() => { dragMoved.current = false; }, 0);
  };

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
        <div className="max-w-5xl mx-auto">
          <div className="flex lg:flex-row flex-col gap-12 items-start w-full">

            {/* Left header */}
            <div className="pt-4 relative z-30 shrink-0">
              <p className="text-[26px] leading-tight font-bold text-black max-w-[180px]">
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
                    onMouseDown={onMouseDown}
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
                      transition:   "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                      borderRadius: "34px",
                      overflow:     "hidden",
                      userSelect:   "none",
                      cursor:       isActive ? "grab" : isNext ? "pointer" : "default",
                    }}
                  >
                    <div className="w-full h-full relative">
                      <Image
                        src={ele.mainImage}
                        alt={ele.title}
                        width={600}
                        height={400}
                        draggable={false}
                        className="w-full h-full object-cover pointer-events-none select-none"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-50"}`} />
                    </div>

                    {/* Next hint arrow on preview card */}
                    {isNext && (
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: "6px", pointerEvents: "none",
                      }}>
                        <svg
                          width="32" height="32" viewBox="0 0 24 24"
                          fill="none" stroke="white" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"
                          style={{ animation: "nudge 1.2s ease-in-out infinite" }}
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                        <span style={{
                          color: "white", fontSize: "10px", fontWeight: 600,
                          letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.9,
                        }}>
                          next
                        </span>
                      </div>
                    )}

                    {/* Badge */}
                    <div className="absolute left-5 top-5 bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium">
                      {index + 1}/{TOTAL}
                    </div>

                    {/* Title — active only */}
                    {isActive && (
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h2 className={`text-[20px] md:text-[26px] ${ele.id === 10 ? "lowercase" : "uppercase"} leading-tight font-medium max-w-[520px]`}>
                          {ele.title}
                        </h2>
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
          0%, 100% { transform: translateX(0px);  }
          50%       { transform: translateX(7px);  }
        }
      `}</style>
    </>
  );
}