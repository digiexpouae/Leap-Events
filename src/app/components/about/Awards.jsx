"use client"

const AWARDS = [
  {
    src: "/assets/about/aw-1.png"
,
    alt: "Excellence Award 2019",
  },
  {
   src: "/assets/about/aw-2.png",
    alt: "International Recognition Plaque",
  },
  {
     src: "/assets/about/aw-3.png",
    alt: "Al Annah Diran 2019 Award",
  },
  {
    src: "/assets/about/aw-4.png",
    alt: "Global Achievement Trophy",
  },
  {
 src: "/assets/about/aw-5.png",    alt: "Film Festival Reel Award",
  },
  {
 src: "/assets/about/aw-6.png",    alt: "Crystal Drop Award",
  },
  {
 src: "/assets/about/aw-7.png",    alt: "Dubai Civil Defense Recognition",
  },
  {
 src: "/assets/about/aw-8.png",    alt: "Certificate of Appreciation",
  },
]

export default function Awards() {
  return (
    <section className="bg-[#001028] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-tight text-slate-900 md:mb-16 md:text-5xl">
          AWARDS
        </h2>

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {AWARDS.map((award) => (
            <li
              key={award.alt}
              className="group aspect-square overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={award.src}
                alt={award.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}