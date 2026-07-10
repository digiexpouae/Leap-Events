"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useDirection } from "../ContextProvider";
export default function ExpertiseSection() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const logoRef = useRef(null);
  const topLinesRef = useRef(null);
  const placeholderRef=useRef(null)

const {dir}=useDirection();



// 1. Unified state for direction
const [direction, setDirection] = useState("ltr");

useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
 
//   gsap.set(imageWrapRef.current,{
//         xPercent:100
//     })
let tl2;
let tl;
let ctx;


   ctx = gsap.context(() => {
if (!placeholderRef.current || !imageWrapRef.current || !sectionRef.current) return;      


  const rect = placeholderRef.current.getBoundingClientRect();
const wrapRect = imageWrapRef.current.getBoundingClientRect(); // ← use this instead of sectionRect



gsap.set(imageWrapRef.current,{
     x: rect.left - wrapRect.left, 
    width: rect.width,
    height: rect.height,
    opacity:0,
    
})




        gsap.set([headingRef.current, descRef.current, logoRef.current, topLinesRef.current],{
            opacity:0,
    y:40
    
        })


    tl2=gsap.timeline({})
     
  tl2.to(  imageWrapRef.current,{
        y:0,
      opacity:1
     })
     tl2.to(          [headingRef.current, descRef.current, logoRef.current, topLinesRef.current],{
      y:0,
      opacity:1
     }
)

tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=150%",
    scrub: 1.5,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true, // FLUSHES old math on layout shifts/resizes
    
  },
});
 

    tl.to(imageWrapRef.current,{
         left:"50%",    
         x:"-50%",
         duration:0.8
    })
   
   
     .to  (imageWrapRef.current,{
y: () => -imageWrapRef.current.offsetTop,
    width: "100vw",
      height: "100vh",
      borderRadius: 0,
      duration:1,
      
      ease: "power2.inOut",
    },
      "<"  
      )   
   

        .to(
          [headingRef.current, descRef.current, logoRef.current, topLinesRef.current],
          {
            ease: "none",
            duration: 0.5,
          },
          
        );
    },);
 
    return () => {
     if (imageWrapRef.current) {
    gsap.set(imageWrapRef.current, { clearProps: "all" });
  }
  ctx.revert(); 
    window.scrollTo({ top: 0, behavior: "instant" });

    }
  }, [dir]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      {/* Top accent lines */}
   

      {/* Logo bubble */}
 

      {/* Heading + description */}
      <div className="relative  px-8 md:px-16 max-w-7xl mx-auto h-full flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-start gap-8 w-full">
          <div className="flex-1 w-full">
            <h1
              ref={headingRef}
              className="font-bold opacity-0 text-[#5b8bf5] leading-[0.95]"
              style={{
                fontSize: "clamp(3rem, 12vw, 10rem)",
                letterSpacing: "-0.04em",
              }}
            >
                <div className="flex items-end gap-4 w-full">
           <span className="leading-none  md:h-[160px]">OUR</span>
               {/* Expanding image */}
                 <div
        ref={placeholderRef}
        className="h-[120px] md:h-[160px] w-1/2   overflow-hidden rounded-2xl "
       
      >
      
        </div>
    
      </div>
           <span className="leading-none"> EXPERTISE</span>
            </h1>
          </div>

  <div
        ref={imageWrapRef}
        className="h-[120px] w-1/2 absolute opacity-0 z-10 overflow-hidden rounded-2xl shadow-2xl"
       
      >
        <Image
          ref={imageRef}
          src="/assets/event_banner.webp"
          alt="Team collaboration"
          fill
          className="w-full h-full object-cover"
        />
        </div>
          <div ref={descRef} className="md:w-72 opacity-0 md:mt-32 lg:mt-48">
            <p className="text-black text-sm leading-relaxed">
             We are a progressive event agency built by a passionate team of enthusiasts, helping you achieve better outcomes
 

            </p>
          </div>
        </div>
      </div>

     
    </section>
  );
}