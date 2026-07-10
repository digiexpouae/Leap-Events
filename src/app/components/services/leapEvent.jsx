"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function LeapEventsStats() {
  const sectionRef = useRef(null);

  const stats = [
    { value: "600+", label: "Event Delivered" },
    { value: "5M+", label: "Footfall Attracted" },
    { value: "75", label: "Clients Served" },
    { value: "22", label: "Awards Received" },
    { value: "12", label: "Years in Business" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate every line marked with data-line
      const lines = sectionRef.current.querySelectorAll("[data-line]");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Stagger-in the stat rows (number + label)
    //   const rows = sectionRef.current.querySelectorAll("[data-stat-row]");
    //   gsap.fromTo(
    //     rows,
    //     { opacity: 0, y: 24 },
    //     {
    //       opacity: 1,
    //       y: 0,
    //       duration: 0.7,
    //       ease: "power2.out",
    //       stagger: 0.12,
    //       scrollTrigger: {
    //         trigger: rows[0],
    //         start: "top 80%",
    //         toggleActions: "play none none reverse",
    //       },
    //     }
    //   );

    //   // Heading + image fade-up
    //   gsap.fromTo(
    //     sectionRef.current.querySelector("[data-heading]"),
    //     { opacity: 0, y: 30 },
    //     {
    //       opacity: 1,
    //       y: 0,
    //       duration: 0.8,
    //       ease: "power3.out",
    //       scrollTrigger: {
    //         trigger: sectionRef.current,
    //         start: "top 80%",
    //         toggleActions: "play none none reverse",
    //       },
    //     }
    //   );

    //   gsap.fromTo(
    //     sectionRef.current.querySelector("[data-image]"),
    //     { opacity: 0, scale: 0.92 },
    //     {
    //       opacity: 1,
    //       scale: 1,
    //       duration: 1,
    //       ease: "power3.out",
    //       scrollTrigger: {
    //         trigger: sectionRef.current.querySelector("[data-image]"),
    //         start: "top 85%",
    //         toggleActions: "play none none reverse",
    //       },
    //     }
    //   );

    //   // Floating logo badge: gentle hover float
    //   gsap.to(sectionRef.current.querySelector("[data-logo]"), {
    //     y: -8,
    //     duration: 2.2,
    //     ease: "sine.inOut",
    //     yoyo: true,
    //     repeat: -1,
    //   });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white px-6 py-16 md:px-12 md:py-34"
    >
      <div className="mx-auto max-w-6xl">
        {/* Top divider line */}
        <div
          data-line
          className="mb-8 h-px w-full origin-left bg-slate-900"
        />

        {/* Heading */}
        <h2
          data-heading
          className="mb-12 text-3xl font-bold uppercase leading-tighter tracking-tight text-[#363737] sm:text-4xl md:text-5xl"
        >
          Leap
          <br />
          Events
        </h2>

        {/* Two-column body */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 h-[800px] md:h-[650px]">
          {/* LEFT — image */}
          <div className="flex items-center md:items-end justify-center md:justify-center">
            <div
              data-image
              className="relative h-[350px] w-full max-w-md overflow-hidden rounded-4xl shadow-xl ring-1 ring-slate-200"
            >
              <Image
                src="/assets/leapevents.jpg"
                alt="Traditional Emirati cultural event"
                className="h-full w-full object-right object-cover"
                fill
                draggable={false}
              />
            </div>
          </div>

          {/* RIGHT — stats list */}
          <div className="relative flex flex-col justify-between ">
         

            {stats.map((stat, i) => (
              <div key={stat.label}>
                <div
                  data-stat-row
                  className="flex items-center leading-[2] justify-between gap-6 py-5 sm:py-6"
                >
                  <span className="text-4xl font-bold text-[#363737] sm:text-5xl md:text-6xl">
                    {stat.value}
                  </span>
                  <span className="text-sm sm:text-xl tracking-tighter font-medium">
                    {stat.label}
                  </span>
                </div>
                {/* Divider after every row */}
                <div
                  data-line
                  className="h-px w-full origin-left bg-slate-900"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}