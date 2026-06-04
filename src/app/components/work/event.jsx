"use client";

import FadeUp from "@/app/common/Transition";
import Image from "next/image";
import { useState } from "react";

const works = [
  { title: "FERJAN FESTIVAL",                    image: "/assets/e-1.png", videoUrl: "/assets/leap.mp4"    },
  { title: "souq ramadan",                       image: "/assets/e-2.png", videoUrl: "/assets/leap.mp4"   },
  { title: "winter garden",                      image: "/assets/e-9.png", videoUrl: "/assets/leap.mp4"   },
  { title: "souq al freej",                      image: "/assets/e-4.png", videoUrl: "/assets/leap.mp4"   },
  { title: "SHARJAH INTERNATIONAL FILM FESTIVAL",image: "/assets/e-3.png", videoUrl: "/assets/leap.mp4"   },
  { title: "university of dubai",                image: "/assets/e-5.png", videoUrl: "/assets/leap.mp4"   },
  { title: "Gems Graduation Event",              image: "/assets/e-6.png", videoUrl: "/assets/leap.mp4"   },
  { title: "du",                                 image: "/assets/e-7.png", videoUrl: "/assets/leap.mp4"   },
  { title: "summer rush",                        image: "/assets/e-8.png", videoUrl: "/assets/leap.mp4"  },
];

const PER_GROUP = 3;

// ── Video Modal ───────────────────────────────────────────────────────────────
function VideoModal({ work, onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-black"
      >
        <video
          src={work.videoUrl}
          controls
          autoPlay
          playsInline
          muted
          className="w-full block max-h-[80vh]"
        />

        {/* Title */}
        <p className="absolute bottom-0 left-0 right-0 px-6 py-4 text-white text-sm font-bold uppercase tracking-wider"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
          {work.title}
        </p>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center text-lg cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ── Work Card ─────────────────────────────────────────────────────────────────
function WorkCard({ title, image, videoUrl, className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <VideoModal work={{ title, videoUrl }} onClose={() => setOpen(false)} />}

      <div
        onClick={() => setOpen(true)}
        className={`group relative overflow-hidden rounded-3xl cursor-pointer ${className}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Play hint on hover */}
    
        {/* Title */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <h3 className="relative text-white text-sm md:text-base font-bold tracking-tighter uppercase">
            {title}
          </h3>
        </div>
      </div>
    </>
  );
}

// ── Work Group ────────────────────────────────────────────────────────────────
function WorkGroup({ items, heroOnLeft }) {
  const [hero, a, b] = items;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 min-h-[500px]">
      {hero && (
        <WorkCard
          {...hero}
          className={`md:row-span-2 aspect-[4/3] md:aspect-auto ${heroOnLeft ? "md:order-1" : "md:order-2"}`}
        />
      )}
      <div className={`flex flex-col gap-5 md:gap-6 ${heroOnLeft ? "md:order-2" : "md:order-1"}`}>
        {a && <WorkCard {...a} className="aspect-[16/9] md:aspect-[4/2] md:flex-1" />}
        {b && <WorkCard {...b} className="aspect-[16/9] md:aspect-[4/2] md:flex-1" />}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function WorkSection() {
  const groups = [];
  for (let i = 0; i < works.length; i += PER_GROUP) {
    groups.push(works.slice(i, i + PER_GROUP));
  }

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">

        <FadeUp>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black mb-10 md:mb-14">
            WORK
          </h2>
        </FadeUp>

        <FadeUp amount={0.1}>
          <div className="flex flex-col gap-10 md:gap-16">
            {groups.map((items, i) => (
              <WorkGroup key={i} items={items} heroOnLeft={i % 2 === 0} />
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}