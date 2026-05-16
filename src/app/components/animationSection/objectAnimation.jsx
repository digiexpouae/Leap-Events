"use client"
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import Video from "./video"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(MorphSVGPlugin,ScrollTrigger)
const INITIAL_PATH =
  "M975.76 458.42L1300.21 -433.35L1747.02 -121.88C1527.63 66.61 1079.95 451.01 1044.36 480.67C1008.76 510.34 997.39 526.4 996.15 530.73L632.77 1513.35L402.87 1353.91L172.98 1194.46C425.12 970.44 932.56 519.79 944.77 509.41C957.78 499.02 970.81 471.09 975.76 458.42Z"
// uniform scale: 1920 / 1483.5 ≈ 1.2942 on both axes, then re-center vertically
const FINAL_PATH =
  "M1214.05 627.1L1822.1 -561.5L2471 -561.5C2122.93 -175.84 1403.91 621.43 1307.78 725.88C1211.65 830.2 1267.71 920.76 1307.78 953.01L2073.68 1641.52L-551 1641.52L-551 -65.49C-79.43 177.59 893.23 678.42 1011.38 737.09C1129.53 795.55 1195.73 688.2 1214.05 627.1Z"
  export default function Scene() {
  const pathRef = useRef(null)
  const svgRef = useRef(null)
  const tiltRef = useRef(null)        // wrapper that receives the 3D mouse tilt
  const readyRef = useRef(false)      // gate: enable tilt only after intro completes
  const videoRef = useRef(null)
  const ref3=useRef(null)
  const fovRef=useRef(75)

  const canvasWrapperRef=useRef(null)
  const containerRef=useRef(null)
    const rotateRef = useRef(true)
  useEffect(() => {
    if (!pathRef.current || !svgRef.current || !tiltRef.current) return

    const bbox = pathRef.current.getBBox()
    const cx = bbox.x + bbox.width / 2
    const cy = bbox.y + bbox.height / 2

    gsap.set(pathRef.current, {
      opacity: 0,
      scale: 0.2,
      rotation: 0,
      svgOrigin: `${cx} ${cy}`,
    })
    gsap.set(ref3.current, {
      opacity: 0

    })


    const tl = gsap.timeline({
      // defaults: { ease: 'power3.out' },
  
    })


 
        tl.to(pathRef.current, { opacity: 1, duration: 1.2,rotate:180})
        .to(pathRef.current, { opacity: 1,scale:1, duration: 0.4,ease:"power2.out" })

        .to(pathRef.current, {
        morphSVG: FINAL_PATH,
        duration: 1.4,
        ease: 'power2.inOut',
      },)
      .to(pathRef.current,{scale:1},
      )
        .to(
        pathRef.current,
        {  duration: 1.5,rotate:-10, ease: 'power2.inOut' },
      )
      
      .to(ref3.current, {
        opacity: 1
      })
      
   const tl2 = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1000',
        
      pinSpacing: true,

        pin: true,
        scrub: 2,
     onUpdate: (self) => {
  if (rotateRef.current && self.progress >= 0.6) {
    rotateRef.current = false
  }
      }}
    
  })
        
tl2.fromTo(fovRef, { current:75}, { current: 50, ease: 'power2.out' })      
.to(
    canvasWrapperRef.current,
    { scale: 1, ease: 'power2.out' },
    0,
  )
    // --- Mouse tilt setup ---
    // quickTo gives smooth lerped updates without firing a new tween per mousemove
    // --- Mouse rotation setup (flat 2D) ---
    const rotZ = gsap.quickTo(tiltRef.current, 'rotation', { duration: 0.6, ease: 'power3.out' })

    const MAX_TILT = 0.5// degrees

    const onMouseMove = (e) => {
      if (!readyRef.current) return
      const nx = (e.clientX / window.innerWidth - 1) * 2
      const ny = (e.clientY / window.innerHeight - 1) * 2

      // Combine horizontal + vertical mouse position into one flat rotation
      rotZ((nx ) * MAX_TILT)
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      tl.kill()
      tl2.kill() // Kill timeline 2 to destroy ScrollTrigger instances safely
       ScrollTrigger.getAll().forEach((st) => st.kill())
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])




useEffect(()=>{
  console.log("Fov",fovRef.current)
},[fovRef])



  return (
    <>
    <div className="relative w-full "
      style={{ height: '100vh' }}   ref={containerRef}>
    <div
      style={{
        position: 'relative',
        inset: 0,
        width: '100vw',
        height: '100vh',
        // pointerEvents: 'none',
        // perspective: '1200px',     // ← required for 3D tilt to be visible
      }}
    >
      <div
        ref={tiltRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <g >
            <path ref={pathRef} d={INITIAL_PATH} fill="#5686DA" />
          </g>
        </svg>
      </div>
        {/* <div  className="relative w-full h-full" ref={containerRef}> */}

      <div
        ref={ref3}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          pointerEvents: 'auto', // override the parent's 'none' if you want video controls clickable
        }}
        className='flex items-center justify-center'
      >

        <Video rotateRef={rotateRef} fovRef={fovRef} canvasWrapperRef={canvasWrapperRef}  />
      </div>
      </div>
   
    </div>  
    </>
  )
}