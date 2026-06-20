"use client";

import FadeUp from "@/app/common/Transition";
import Image from "next/image";
import { useState } from "react";

const works = [
  { title: "FERJAN FESTIVAL",                    image: "/assets/w-ferjan-festival.webp", videoUrl: "https://youtu.be/VnZ5EkXupHQ"  },
  { title: "SOUQ RAMADAN",                       image: "/assets/souq-ramadan.webp", videoUrl: "https://youtu.be/p0v3EM14Jv4" },
  { title:   "WINTER GARDEN",                      image: "/assets/w-winter-garden.webp",  videoUrl: "https://youtu.be/Z02w0ts5FLI"   },
  { title:  "SOUQ AL FAREEJ",                     image: "/assets/w-souq-al-freej.webp",  videoUrl: "https://youtu.be/Z02w0ts5FLI"     },
  { title: "SHARJAH INTERNATIONAL FILM FESTIVAL",image: "/assets/w-international-film-festival.webp", videoUrl: "https://youtu.be/TOl8VrXGkmY"   },
  { title:  "UNIVERSITY OF DUBAI",              image: "/assets/w-dubai-universtity.webp",  videoUrl: "https://youtu.be/nDCbXoRmB_Q"  },
  { title:   "GEMS GRADUATION EVENT",
             image: "/assets/w-gems-achool.webp", videoUrl: "https://youtu.be/j1ZwWgsQDN0"  },
  { title: "du",                                 image: "/assets/w-du.webp",  videoUrl: "https://youtu.be/UrkUYgpevQE"   },
  { title:   "SUMMER RUSH",                     image: "/assets/summer-rush.webp", videoUrl: "https://youtu.be/UrkUYgpevQE"  },
];

const PER_GROUP = 3;

// ── Video Modal ───────────────────────────────────────────────────────────────
function VideoModal({ work, onClose }) {
    const getYouTubeId = (url) => {
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : null;
};
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
        {/* <video
          src={work.videoUrl}
          controls
          autoPlay
          playsInline
          muted
          className="w-full block max-h-[80vh]"
        /> */}


        <iframe
  width="100%"
  height="480"
  //  ref={videoRef}
  src={`https://www.youtube.com/embed/${getYouTubeId(work.videoUrl)}?autoplay=1&mute=1&rel=0`}


  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  style={{ display: "block", maxHeight: "80vh" }}
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

        {/* Play icon overlay - always visible */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" />
          <Image
            src={'/assets/play-icon.svg'}
            alt="Play"
            className="relative w-15 h-15 drop-shadow-lg"
            width={15}
            height={15}
          />
        </div>

        {/* Title */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <h3 className="relative text-white text-sm md:text-base font-bold tracking-tighter">
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