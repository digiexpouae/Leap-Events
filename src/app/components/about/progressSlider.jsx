"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

const slides = [
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





export default function MobileSlider() {
  const sliderRef = useRef(null);

 const scrollByCard = ( direction) => {
    const el = sliderRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild?.clientWidth || 0;
    const gap = 16;
    const amount = cardWidth + gap;

    el.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
   <div className="relative w-full overflow-hidden">
  <div
    ref={sliderRef}
    className="flex snap-x  snap-mandatory gap-4 w-full overflow-x-auto scroll-smooth pb-2 px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    {slides.map((slide) => (
      <div
        key={slide.number}
        className="shrink-0 w-[80%] snap-center rounded-3xl p-4 text-[#111] "
      >
        <div className="text-6xl font-semibold leading-none tracking-tight sm:text-7xl">
          {slide.number}
          <span className="align-top text-3xl sm:text-4xl">{slide.suffix}</span>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl">
          <Image
            src={slide.image}
            alt={slide.label.replace('\n', ' ')}
            width={600}
            height={420}
            className="h-auto w-full object-cover"
          />
        </div>

        <h3 className="mt-4 whitespace-pre-line text-2xl font-semibold leading-tight">
          {slide.label}
        </h3>

        <p className="mt-2 text-base leading-relaxed text-zinc-700">
          {slide.description}
        </p>
      </div>
    ))}
  </div>
</div>
  );
}