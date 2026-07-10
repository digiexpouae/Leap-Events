"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(ScrollTrigger,MorphSVGPlugin, useGSAP);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const imgRef=useRef(null);
  const placeholderRef=useRef()
  const pathRef=useRef()
  const svgRef=useRef()
const [isMobile, setIsMobile] = useState(null)



 
// Mobile — tighter bleed, proportional to smaller screen




useGSAP(
  () => {

      const isMobile = window.innerWidth < 768;
    const viewBox=isMobile? "0 0 375 677" : "0 0 1921.5 1083.5"

 const INITIAL_PATH =isMobile? "M191.373 289.817L319.121 -62L495.047 60.88C408.666 135.242 232.398 286.891 218.383 298.594C204.367 310.297 199.89 316.636 199.403 318.343L56.3256 706L-124.711 580.194C-25.4328 491.813 174.364 314.027 179.328 309.931C184.292 305.835 189.426 294.815 191.373 289.817Z"
:"M975.76 458.42L1300.21 -433.35L1747.02 -121.88C1527.63 66.61 1079.95 451.01 1044.36 480.67C1008.76 510.34 997.39 526.4 996.15 530.73L632.77 1513.35L402.87 1353.91L172.98 1194.46C425.12 970.44 932.56 519.79 944.77 509.41C957.78 499.02 970.81 471.09 975.76 458.42Z"
// uniform scale: 1920 / 1483.5 ≈ 1.2942 on both axes, then re-center vertically
const FINAL_PATH =  isMobile?
"M215.438 408.233L240.787 0H323.171C308.267 115.853 276.698 359.694 269.656 408.233C262.615 456.772 300.991 468.673 321.059 468.556L677 514.499V760H-676V394.555C-413.474 410.805 121.224 444.006 159.811 446.811C198.398 449.617 212.973 422.261 215.438 408.233Z"
:"M1266 582L1302 -3000H1419C1397.83 165.167 1353 512.8 1343 582C1333 651.2 1387.5 668.167 1416 668L8000 733.5V5000H-5000V562.5C372.833 585.667 1132.2 633 1187 637C1241.8 641 1262.5 602 1266 582Z"

svgRef.current?.setAttribute('viewBox', viewBox)
  pathRef.current?.setAttribute('d', INITIAL_PATH)
    
  const rect = placeholderRef.current.getBoundingClientRect();
  const sectionRect = sectionRef.current.getBoundingClientRect();
const bottomDistance = sectionRect.bottom - rect.bottom;
 

  gsap.set(".hero-thumb", {
    left: rect.left - sectionRect.left +4,
    width: rect.width,
    height: rect.height,
    bottom:bottomDistance
  })

 const bbox = pathRef.current.getBBox()
    const cx = bbox.x + bbox.width / 2
    const cy = bbox.y + bbox.height / 2

    gsap.set(pathRef.current, {
      opacity: 0,
      scale: 0.2,
      rotation: 0,
      svgOrigin: `${cx} ${cy}`,
    })

gsap.set(".hero-tagline",{
  opacity:0,
})
  gsap.set(".hero-text-row", {opacity: 0})

  gsap.set(".hero-thumb", {opacity: 0})
  let tl;
  let tl2;
    const ctx = gsap.context(() => {

 tl2 = gsap.timeline({
      // defaults: { ease: 'power3.out' },
  
    })
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

        tl2.to(svgRef.current,{opacity:1})
                tl2.to(pathRef.current, { opacity: 1, duration: 1.2   ,})

        tl2.to(pathRef.current, { opacity: 1, duration: 1.2   ,rotate:180})
        
     
        tl2.to(pathRef.current, { opacity: 1,scale:1, duration: 0.4,ease:"power2.out" })

           .to(pathRef.current, {
        morphSVG: FINAL_PATH,
        duration: 1.2,
    transform: "translate(0,0)",        
        ease: 'power2.inOut',
      },)
       
tl2.to(".hero-tagline", { opacity: 1, ease: "power2.in" },"<")
  tl2.to(".hero-text-row", {  opacity: 1, ease: "power2.in" }, "<")
    tl2.to(".hero-thumb", {opacity:1},"<")
      // Fade out text
      tl.to(".hero-tagline", { yPercent: -1000,  ease: "power2.in" },)
      .to(".hero-text-row", { yPercent: -1000, ease: "power2.in" }, "<")
        

      // Step 1: break out of flex, grow height upward — stays horizontally in place
    //    .to(".hero-thumb", {
    //   height: "30vh",
    //   borderRadius: 8,
    //   ease: "power2.inOut",
    // }, "<")

    // Step 2: center + fullscreen
    .to(".hero-thumb", {
      left: "50%",
      xPercent: -50,
      width: "100vw",
      height: "100vh",
      bottom:0,
      borderRadius: 0,
      ease: "power2.inOut",
    },"<");

  })
    return () => {
      ctx.revert();
       ScrollTrigger.getAll().forEach(t => t.kill())
  ScrollTrigger.refresh();    
  tl?.kill()
  tl2?.kill()
  
    

  }
},
  { scope: sectionRef }
);

  return (
    <section ref={sectionRef} dir="ltr" className="relative h-screen overflow-hidden bg-white">
       <div className="absolute left-0 top-0 z-10 mx-auto max-w-7xl px-6 translate-y-30 md:px-12">
        <p className="hero-tagline w-[190px] md:w-[420px] text-xs md:text-lg opacity-0 font-semibold uppercase leading-relaxed tracking-tight text-[#363737]">
          Crafting unforgettable events
       across the UAE for over a decade.
        </p>
      </div>
       <div
        ref={imgRef} 
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <svg
          ref={svgRef}
  viewBox={"0 0 1921.5 1083.5"}     
      preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
          className="opacity-0"
        >
          <g >
            <path ref={pathRef} d={"M975.76 458.42L1300.21 -433.35L1747.02 -121.88C1527.63 66.61 1079.95 451.01 1044.36 480.67C1008.76 510.34 997.39 526.4 996.15 530.73L632.77 1513.35L402.87 1353.91L172.98 1194.46C425.12 970.44 932.56 519.79 944.77 509.41C957.78 499.02 970.81 471.09 975.76 458.42Z"} fill="#5686DA" />
          </g>
        </svg>
      </div>
      {/* Background */}

      {/* Tagline */}
     

      {/* Giant brand text row — aligned to BOTTOM so thumb grows upward */}
    {/* Giant brand text row */}
<div className="absolute inset-x-0  bottom-20 md:bottom-0 flex items-center justify-center w-full">
     <span className="hero-text-row shrink-0 z-20 text-[clamp(3.2rem,13vw,18rem)] md:text-[clamp(3.4rem,15vw,18rem)] font-bold uppercase leading-none tracking-tighter text-white select-none">
          LEAP EV
        </span>

  {/* PLACEHOLDER — holds the flex space, invisible */}
  <div 
    ref={placeholderRef}
    className="shrink-0 h-[clamp(4rem,10vw,12rem)] md:ml-4 w-[clamp(4rem,10vw,12rem)] mx-1" 
  />

        <span className="hero-text-row shrink-0 z-10 font-bold text-[clamp(3.2rem,13vw,18rem)] md:text-[clamp(3.4rem,15vw,18rem)] uppercase leading-none tracking-tighter text-white select-none">
       NTS
        </span>
</div>

{/* ACTUAL thumb — absolute from start, positioned over placeholder */}
<div className="hero-thumb absolute z-40  overflow-hidden rounded-xl shadow-xl">
  <video src="/assets/leap_showreel_optimized.mp4" autoPlay muted loop playsInline
    className="h-full w-full object-cover" />
</div>
    </section>
  );
}