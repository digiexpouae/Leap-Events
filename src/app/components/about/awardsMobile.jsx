"use client"
import Image from "next/image"
import { useState, useCallback } from "react"

const AWARDS = [
  { src: "/assets/about/aw-1.png", alt: "Excellence Award 2019" },
  { src: "/assets/about/aw-2.png", alt: "International Recognition Plaque" },
  { src: "/assets/about/aw-3.png", alt: "Al Annah Diran 2019 Award" },
  { src: "/assets/about/aw-4.png", alt: "Global Achievement Trophy" },
  { src: "/assets/about/aw-5.png", alt: "Film Festival Reel Award" },
  { src: "/assets/about/aw-6.png", alt: "Crystal Drop Award" },
  { src: "/assets/about/aw-7.png", alt: "Dubai Civil Defense Recognition" },
  { src: "/assets/about/aw-8.png", alt: "Certificate of Appreciation" },
]

export default function Awards() {
  const [index, setIndex] = useState(0)

  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), [])
  const next = useCallback(() => setIndex((i) => Math.min(i + 1, AWARDS.length - 1)), [])

  return (
    <section className="bg-[#001028] px-4 py-12 md:hidden block">
      <div className="mx-auto  max-w-[260px]">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-white">
          AWARDS
        </h2>

        {/* Slider track */}
        <div className="overflow-hidden">
         <ul
  className="flex gap-3 transition-transform duration-500 ease-in-out"
  style={{ transform: `translateX(calc(-${index} * (100% + 0.75rem)))` }}
>
            {AWARDS.map((award) => (
              <li
                key={award.alt}
                className="group aspect-square w-full flex-none  overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5"
              >
                <Image
                  src={award.src}
                  alt={award.alt}
                  width={300}
                  height={300}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Dot indicators */}
       

        {/* Bottom arrows */}
        <div className="mt-5 flex justify-center gap-4">
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous award"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={index >= AWARDS.length - 1}
            aria-label="Next award"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}