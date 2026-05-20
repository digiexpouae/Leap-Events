"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function ExpertiseSection() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const logoRef = useRef(null);
  const topLinesRef = useRef(null);
  const placeholderRef=useRef(null)
useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
 
//   gsap.set(imageWrapRef.current,{
//         xPercent:100
//     })

    const ctx = gsap.context(() => {
      
  const rect = placeholderRef.current.getBoundingClientRect();
  const sectionRect = sectionRef.current.getBoundingClientRect();

gsap.set(imageWrapRef.current,{
    left:rect.left-sectionRect.left, 
      top: rect.top - sectionRect.top,  // ✅ add this
    width: rect.width,
    height: rect.height,
    opacity:0,
    y:40
    
})
        gsap.set([headingRef.current, descRef.current, logoRef.current, topLinesRef.current],{
            opacity:0,
    y:40
    
        })


     const tl2=gsap.timeline({})
     
     const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
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
    tl.to(
        imageWrapRef.current,{
            top:"0",
      left: "50%",
      xPercent: -50,      

      width: "100vw",
      height: "100vh",
      bottom:0,
      borderRadius: 0,
      ease: "power2.inOut",
    },
        
      )   
        
        .to(
          [headingRef.current, descRef.current, logoRef.current, topLinesRef.current],
          {
            ease: "none",
            duration: 0.5,
          },
          
        );
    }, sectionRef);
 
    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      {/* Top accent lines */}
   

      {/* Logo bubble */}
 

      {/* Heading + description */}
      <div className="relative pt-32 md:pt-40 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1">
            <h1
              ref={headingRef}
              className="font-extrabold opacity-0 text-[#5b8bf5] leading-[0.95]"
              style={{
                fontSize: "clamp(3rem, 12vw, 11rem)",
                letterSpacing: "-0.04em",
              }}
            >
                <div className="flex items-end gap-4">
              OUR
               {/* Expanding image */}
                 <div
        ref={placeholderRef}
        className="h-[120px] md:h-[160px] w-1/2   overflow-hidden rounded-2xl "
       
      >
      
        </div>
    
      </div>
              EXPERTISE
            </h1>
          </div>

  <div
        ref={imageWrapRef}
        className="h-[120px] w-1/2 absolute opacity-0 z-10 overflow-hidden rounded-2xl shadow-2xl"
       
      >
        <Image
          ref={imageRef}
          src="/assets/service1.jpg"
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