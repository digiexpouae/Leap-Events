// components/AboutSection.tsx
import Image from "next/image";
import Link from "next/link";
export default function AboutSection() {
  return (
    <section className="relative w-full bg-white h-screen px-4 md:py-14 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-5xl flex flex-col h-full items-center justify-center md:justify-start  gap-8 lg:flex-row ">
        <div className="relative h-[220px] lg:w-1/2  w-full overflow-hidden rounded-[30px] shadow-lg sm:h-[280px] lg:h-[320px]">
          <Image
            src="/assets/about/about.jpeg"
            
            alt="About us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>

        <div className="flex flex-col justify-between  h-[280px] items-start lg:ml-16">
          

          <h2 className="md:text-4xl font-extrabold uppercase tracking-tight text-[#363737] text-3xl">
            About Us
          </h2>

          <p className="mt-4 text-[#363737]  max-w-md md:text-2xl  md:leading-7 sm:text-base">
            We are a passionate team with over a decade of experience in the
            event industry, delivering exceptional events through expertise,
            innovation, and mdern technology.
          </p>
        
          <Link  className="mt-6 rounded-full bg-[#5686DA] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#5686DA]/50"
          href="/about" > 
           Read Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}