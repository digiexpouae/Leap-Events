"use client"

const STATS = {
  top: "200+",
  middle: "600+",
  bottom: "21",
}

export default function PassionPrecision() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#DEF6FF]">
      {/* Top-right brand icon */}
    
      {/* Heading */}
      <header className="px-4 pb-12 pt-16 text-center md:pt-20">
        <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-5xl">
          WHERE PASSION
          <br />
          MEETS PRECISION
        </h2>
      </header>

      {/* Stats stage */}
      <div className="relative flex flex-1 items-center justify-center px-4">
        <div className="relative mx-auto flex h-[460px] w-full max-w-5xl items-center justify-center md:h-[520px]">
          {/* Dashed crosshairs */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-blue-400/40" />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 border-l border-dashed border-blue-400/40" />

          {/* Background watermark stats */}
          <span
            aria-hidden
            className="absolute top-2 select-none text-6xl font-light tracking-tight text-blue-300/40 md:text-8xl"
          >
            {STATS.top}
          </span>
          <span
            aria-hidden
            className="absolute bottom-2 select-none text-6xl font-light tracking-tight text-blue-300/40 md:text-8xl"
          >
            {STATS.bottom}
          </span>

          {/* Left label */}
          <p className="absolute left-2 top-1/2 -translate-y-1/2 text-base font-bold leading-tight text-slate-900 md:left-10 md:text-2xl">
            Events
            <br />
            Delivered
          </p>

          {/* Right description */}
          <p className="absolute right-2 top-1/2 max-w-[140px] -translate-y-1/2 text-xs leading-snug text-slate-600 md:right-10 md:max-w-[200px] md:text-sm">
            Big stages, small details. Each one designed to leave a mark.
          </p>

          {/* Tilted image card */}
          <FeaturedCard value={STATS.middle} />
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center pb-20 pt-4">
        <button
          type="button"
          className="rounded-full bg-white/60 px-8 py-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/80"
        >
          Get to know us
        </button>
      </div>

      {/* Bottom-left brand cluster */}
    
    </section>
  )
}

function FeaturedCard({ value }) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5"
      style={{
        width: "clamp(260px, 38vw, 380px)",
        aspectRatio: "16 / 11",
        transform: "perspective(1000px) rotateY(-12deg) rotateX(4deg)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Replace with your image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)",
        }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Subtle highlight */}
      <div
        aria-hidden
        className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-white/10 blur-3xl"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-6xl font-bold tracking-tighter text-white drop-shadow-lg md:text-7xl">
          {value}
        </span>
      </div>
    </div>
  )
}

