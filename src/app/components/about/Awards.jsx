"use client"
import Image from "next/image"
const AWARDS = [
  {
    src: "/assets/aw-1.webp"
,
    alt: "Excellence Award 2019",
  },
  {
   src: "/assets/aw-2.webp",
    alt: "International Recognition Plaque",
  },
  {
     src: "/assets/aw-3.webp",
    alt: "Al Annah Diran 2019 Award",
  },
  {
    src: "/assets/aw-4.webp",
    alt: "Global Achievement Trophy",
  },
  {
 src: "/assets/aw-5.webp",    alt: "Film Festival Reel Award",
  },
  {
 src: "/assets/aw-6.webp",    alt: "Crystal Drop Award",
  },
  {
 src: "/assets/aw-7.webp",    alt: "Dubai Civil Defense Recognition",
  },
  {
 src: "/assets/aw-8.webp",    alt: "Certificate of Appreciation",
  },
   {
 src: "/assets/aw-9.webp",    alt: "aw-9",
  },
   {
 src: "/assets/aw-10.webp",   alt: "aw-10",
  },
   {
 src: "/assets/aw-11.webp",   alt: "aw-11",
  },
]

export default function Awards() {
  return (
    <section className=" px-4 py-16 md:py-24 md:block hidden">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-4xl  font-bold tracking-tight text-slate-900 md:mb-16 md:text-5xl">
          AWARDS
        </h2>
<div className="flex flex-col md:gap-6 justify-center">
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:gap-6">
          {AWARDS.slice(0,8).map((award) => (
            <li
              key={award.alt}
              className="group  overflow-hidden rounded-2xl  w-[calc(100%-1.5rem)]   bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
          ))}
        </ul>
        <div className="w-full flex items-center justify-center">
          <ul className="grid grid-cols-2 grid lg:grid-cols-3  md:gap-6  w-full lg:w-[75%] items-center justify-center">
          {AWARDS.slice(8,11).map((award) => (
            <li
              key={award.alt}
              className="group  w-[calc(100%-1.5rem)]  overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
          ))}
        </ul>
        </div>
      </div>
      </div>
    </section>
  )
}