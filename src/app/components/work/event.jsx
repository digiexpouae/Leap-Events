"use client";

import Image from "next/image";

const works = [
  { title: "FERJAN FESTIVAL",    image: "/assets/work-1.png"  },
  { title: "RAMADAN SOUQ",        image: "/assets/work-2.png"      },
  { title: "SOUQ ALFREEJ",    image: "/assets/work-3.png"   },
  { title: "CORPORATE EVENT",   image: "/assets/work-4.png" },
  { title: "WINTER FESTIVAL",   image: "/assets/work-5.png" },
  { title: "WONDERLAND",        image: "/assets/work-6.png" },
  { title: "SHOPPING FESTIVAL", image: "/assets/work-7.png" },
  { title: "GAMING FESTIVAL",   image: "/assets/work-8.png" },
  { title: "HOARDING DESIGN",   image: "/assets/work-9.png" },];


const PER_GROUP = 3;

function WorkCard({ title, image, className = "" }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl cursor-pointer ${className}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <h3 className="relative text-white text-sm md:text-base font-bold tracking-widest uppercase">
          {title}
        </h3>
      </div>
    </div>
  );
}

function WorkGroup({ items, heroOnLeft }) {
  const [hero, a, b] = items;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 min-h-[500px]">
      {/* Hero card — spans both rows */}
      {hero && (
        <WorkCard
          {...hero}
          className={`md:row-span-2 aspect-[4/3] md:aspect-auto ${
            heroOnLeft ? "md:order-1" : "md:order-2"
          }`}
        />
      )}

      {/* Stack column */}
      <div
        className={`flex flex-col gap-5 md:gap-6  ${
          heroOnLeft ? "md:order-2" : "md:order-1"
        }`}
      >
        {a && <WorkCard {...a} className="aspect-[16/9] md:aspect-[4/2] md:flex-1" />}
        {b && <WorkCard {...b} className="aspect-[16/9] md:aspect-[4/2] md:flex-1" />}
      </div>
    </div>
  );
}

export default function WorkSection() {
  // Chunk works into groups of 3
  const groups = [];
  for (let i = 0; i < works.length; i += PER_GROUP) {
    groups.push(works.slice(i, i + PER_GROUP));
  }

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black mb-10 md:mb-14">
          WORK
        </h2>

        {/* All groups stacked vertically, alternating sides */}
        <div className="flex flex-col gap-10 md:gap-16">
          {groups.map((items, i) => (
            <WorkGroup key={i} items={items} heroOnLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}