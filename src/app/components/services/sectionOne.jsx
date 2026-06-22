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

    const ctx = gsap.context(() => {
if (!placeholderRef.current || !imageWrapRef.current || !sectionRef.current) return;          gsap.set(imageWrapRef.current, { x: 0, y: 0 });        // reset transform first

  const rect = placeholderRef.current.getBoundingClientRect();
  const sectionRect = sectionRef.current.getBoundingClientRect();
const wrapRect = imageWrapRef.current.getBoundingClientRect(); // ← use this instead of sectionRect

const placeholderRect=placeholderRef.current.getBoundingClientRect();
console.log("placeholderRect",placeholderRect.top)
console.log("direction",dir)
const startY = imageWrapRef.current.offsetTop;
const startY2=sectionRef.current.offsetTop ;
console.log("startY",startY,startY2)
gsap.set(imageWrapRef.current,{
     x: rect.left - wrapRect.left,   // delta from wrap's current position to placeholder
  // y: rect.top - wrapRect.top,
    width: rect.width,
    height: rect.height,
    opacity:0,
    
})




        gsap.set([headingRef.current, descRef.current, logoRef.current, topLinesRef.current],{
            opacity:0,
    y:40
    
        })


    tl2=gsap.timeline({})
     
  // Remove the initial gsap.set(imageWrapRef.current, {x: ..., width: ...}) from the top.
// Instead, let ScrollTrigger manage it inside onRefresh:

tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=150%",
    scrub: 1.5,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true, // FLUSHES old math on layout shifts/resizes
    
//     onRefresh: () => {
//       // 1. Clear inline styles so we can measure the natural layout again
//       gsap.set(imageWrapRef.current, { clearProps: "all" });
      
//       // 2. Recalculate coordinates based on the new RTL/LTR layout
//       const rect = placeholderRef.current.getBoundingClientRect();
//       const wrapRect = imageWrapRef.current.getBoundingClientRect();
//       console.log("rect.left - wrapRect.left",rect.left - wrapRect.left)
//       // 3. Set the new initial position
//       gsap.set(imageWrapRef.current, {
//          x:()=>{
//       const isRTL = getComputedStyle(sectionRef.current).direction === 'rtl';
// console.log("rtl",isRTL,isRTL && placeholderRef.current.offsetLeft)
//           isRTL? -placeholderRef.current.offsetLeft:placeholderRef.current.offsetLeft},
//          width: rect.width,
//          height: rect.height,
//          opacity: 1,
//       });
//     }
  },
});
 
     tl2.to(  imageWrapRef.current,{
        y:0,
      opacity:1
     })
     tl2.to(          [headingRef.current, descRef.current, logoRef.current, topLinesRef.current],{
      y:0,
      opacity:1
     }
)



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
       ScrollTrigger.getAll()
    .filter(t => t.trigger === sectionRef.current)
    .forEach(t => t.kill()); // release pin FIRST
  tl?.kill();
  tl2?.kill();
  ctx.revert(); 
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
              Years of experience backed by trusted knowledge. Helping you
              achieve better outcomes, faster.
            </p>
          </div>
        </div>
      </div>

     
    </section>
  );
}