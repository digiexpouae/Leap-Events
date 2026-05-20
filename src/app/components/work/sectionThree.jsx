import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen md:h-[220vh] min-h-[300px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/34f0f76fbb95f41988f848484d1cd551efce1ff7.jpg"
        alt="Live cultural performance"
        fill
        priority
        quality={90}
        sizes="100vw"

        style={{objectPosition:"40% 20%"}}
        className="object-cover object-[40%_35%] md:object-center -z-10"

      />

      {/* Dark overlay */}

      {/* Top gradient for headline legibility */}
      {/* <div
        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/60 via-black/30 to-transparent -z-10"
        aria-hidden="true"
      /> */}

      {/* Headline */}
      <div className="flex items-start justify-center h-full px-6 pt-16 sm:pt-20 md:pt-24">
        <h1 className="max-w-5xl text-center font-bold uppercase tracking-tighter text-white leading-[1.1] text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
          Crafting Unforgettable
          <br />
          Experiences from Ambitious
          <br />
          Briefs.
        </h1>
      </div>
    </section>
  );
}