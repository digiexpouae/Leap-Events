"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

const STATS = [
  {
    number: "200",
    suffix: "+",
    label: "Clients\nServed",
    description: "From boutique launches to brand activations — trust, earned one room at a time.",
    image: "/assets/eventsdelivered.jpg",
  },
  {
    number: "600",
    suffix: "+",
    label: "Events\nDelivered",
    description: "Big stages, small details. Each one designed to leave a mark.",
    image: "/assets/home/4.png",
  },
  {
    number: "21",
    suffix: "+",
    label: "Years of\nCraft",
    description: "Two decades of refining what live experiences can actually feel like.",
    image: "/assets/home/4.png",
  },
];

const VISIBLE = 1.3;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function StatsSlider() {
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const updateProgress = (p) => {
    progressRef.current = p;
    setProgress(p);
  };

  const getTranslateX = useCallback((p) => {
    if (!viewportRef.current) return 0;
    const cardW = viewportRef.current.offsetWidth / VISIBLE;
    const maxScroll = cardW * (STATS.length - VISIBLE);
    return -p * maxScroll;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let startX = 0, startY = 0, startProgress = 0;
    let decided = false, horizontal = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startProgress = progressRef.current;
      decided = false;
      horizontal = false;

  e.preventDefault();
  e.stopPropagation()
    };

    const handleTouchMove = (e) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      if (!decided && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        horizontal = Math.abs(dx) > Math.abs(dy);
        decided = true;
      }

      if (!horizontal) return; // vertical → let page scroll

      
  e.preventDefault();
  e.stopPropagation()// horizontal → block scroll, move slider

      const cardW = viewportRef.current.offsetWidth / VISIBLE;
      const maxScroll = cardW * (STATS.length - VISIBLE);
      updateProgress(clamp(startProgress + (-dx / maxScroll), 0, 1));
    };

    track.addEventListener("touchstart", handleTouchStart, { passive: false });
    track.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      track.removeEventListener("touchstart", handleTouchStart);
      track.removeEventLisetener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section
      className="w-full max-w-3xl mx-auto px-6 py-16 select-none md:hidden block"
      ref={viewportRef}
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4 transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${mounted ? getTranslateX(progress) : 0}px)` }}
        >
          {STATS.map((slide, i) => (
            <div key={i} className="flex-shrink-0" style={{ width: `${100 / VISIBLE}%` }}>
              <div className="text-[clamp(3rem,8vw,5rem)] font-medium leading-none tracking-tighter text-neutral-900 text-right">
                {slide.number}
                <sup className="text-[0.4em] font-semibold align-super">{slide.suffix}</sup>
              </div>

              <div className="mt-3 rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src={slide.image}
                  alt={slide.label}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
              </div>

              <h3 className="mt-4 text-base font-bold text-neutral-900">{slide.label}</h3>
              <p className="mt-1 text-sm text-neutral-500 leading-relaxed">{slide.description}</p>
            </div>
          ))}
        </div>
      </div>

      <ProgressBar progress={progress} onScrub={updateProgress} />
    </section>
  );
}

function ProgressBar({ progress, onScrub }) {
  const barRef = useRef(null);
  const dragging = useRef(false);

  const scrub = useCallback((clientX) => {
    if (!barRef.current) return;
    const { left, width } = barRef.current.getBoundingClientRect();
    onScrub(Math.min(1, Math.max(0, (clientX - left) / width)));
  }, [onScrub]);

  return (
    <div className="mt-10">
      <div
        ref={barRef}
        className="relative h-[2px] bg-neutral-200 cursor-pointer"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          scrub(e.clientX);
        }}
        onPointerMove={(e) => { if (dragging.current) scrub(e.clientX); }}
        onPointerUp={() => (dragging.current = false)}
        onPointerLeave={() => (dragging.current = false)}
      >
        <div
          className="absolute inset-y-0 left-0 bg-neutral-900 transition-all duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}