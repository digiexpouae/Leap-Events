"use client"
import Image from "next/image"
import FadeUp from "@/app/common/Transition"
const AWARDS = [
  {
    id: 1,
    src: "/assets/aw-1.webp",
    alt: "Excellence Award 2019",
  },
  {
    id: 2,
    src: "/assets/aw-2.webp",
    alt: "International Recognition Plaque",
  },
  {
    id: 3,
    src: "/assets/aw-3.webp",
    alt: "Al Annah Diran 2019 Award",
  },
  {
    id: 4,
    src: "/assets/aw-4.webp",
    alt: "Global Achievement Trophy",
  },
  {
    id: 5,
    src: "/assets/aw-5.webp",
    alt: "Film Festival Reel Award",
  },
  {
    id: 6,
    src: "/assets/aw-6.webp",
    alt: "Crystal Drop Award",
  },
  {
    id: 7,
    src: "/assets/award.webp",
    alt: "Dubai Civil Defense Recognition",
  },
  {
    id: 8,
    src: "/assets/aw-8.webp",
    alt: "Certificate of Appreciation",
  },
  {
    id: 9,
    src: "/assets/aw-9.webp",
    alt: "aw-9",
  },
  {
    id: 10,
    src: "/assets/aw-10.webp",
    alt: "aw-10",
  },
];

export default function Awards() {
  return (
    <section className=" px-4 py-16 md:py-24  hidden   md:block">
      <div className="mx-auto max-w-5xl">
      <FadeUp>
        <h2 className="mb-12 text-center text-4xl  font-bold tracking-tight text-[#363737] md:mb-16 md:text-5xl">
          AWARDS
        </h2>
         </FadeUp>
<div className="flex flex-col md:gap-6 justify-center">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {AWARDS.slice(0,8).map((award,index) => (
            <FadeUp key={index} delay={award.id*0.2}>
            <li
              key={award.alt}
              className="group  overflow-hidden rounded-2xl h-54 lg:h-72    bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Image 
                src={award.src}
                alt={award.src}
                width={300}
                height={300}
                loading="lazy"
                sizes="(min-width:1024px) 25vw, 25vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </li>
            </FadeUp>
          ))}
        </ul>
        <div className="w-full flex items-center justify-center">
          <ul className="grid grid-cols-2 h-full md:gap-6  w-full md:w-1/2 items-center justify-center">
          {AWARDS.slice(8,11).map((award,index) => (
              <FadeUp key={index} delay={award.id*0.2}>
            <li
              key={award.alt}
              className="group  h-72 overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Image 
                src={award.src}
                alt={award.src}
                width={300}
                height={300}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </li>

            </FadeUp>
          ))}
        </ul>
        </div>
      </div>
      </div>
    </section>
  )
}