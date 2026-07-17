'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
const navs = [
  { num: '01', name: 'HOME',     link: '/'         },
  { num: '02', name: 'ABOUT',    link: '/about'    },
  { num: '03', name: 'SERVICES', link: '/services' },
  { num: '04', name: 'PROJECTS',     link: '/projects'  },
  { num: '05', name: 'CONTACT',     link: '/contact'  },

]

export default function DiagonalMenu({setIsMenuOpen,isMenuOpen}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── MENU BUTTON ─────────────────────────────────────────── */}
      {/* FIX 2: changed outer wrapper from <button> to <div role="button">
          so the nested <Link> (an <a>) is no longer invalid inside a <button>. */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Open menu"
        className="flex cursor-pointer items-center h-[70px] md:gap-2.5 bg-[#5686DA] px-2 md:px-4 py-3.5"
        style={{
          borderRadius: '10px',
          opacity: open ? 0 : 1,
          pointerEvents: open ? 'none' : 'auto',
          transitionProperty: 'opacity',
          transitionDuration: '300ms',
          transitionTimingFunction: 'linear',
          transitionDelay: open ? '0ms' : '700ms',
        }}
      >

<div className='px-2 h-full flex items-center justify-center' onClick={() =>{ setOpen(true)
          setIsMenuOpen(true)
        }
        }>

        <div className='flex gap-2 group'
          >
        <div className="flex flex-col gap-[4px]">
          <span className="block h-[1.5px] w-[18px] bg-white transition-all" />
          <span className="block h-[1.5px] w-[18px] bg-white transition-all duration-200 group-hover:w-3" />
          <span className="block h-[1.5px] w-[18px] bg-white transition-all" />
        </div>
        {/* <span className="text-[10px] tracking-[3px] text-white transition-transform duration-300 group-hover:translate-x-0.5">
          MENU
      
    </span>  */}
     </div> 
     </div>
    <div className=' w-full h-full flex justify-end'>
           <Link href="/" className=' h-full'>
      <Image 
      src={"/assets/logo-white.svg"}
     alt={"logo-white"}
      width={80}
      height={60}
      className=' shrink-0'
      />
      </Link> 
      </div>
      </div>

      {/* ── OVERLAY ─────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0  ${open ? 'visible z-[999]' : 'invisible'}`}
        style={{
          background: 'rgba(0,10,40,0.82)',
          transitionProperty: 'visibility',
          transitionDuration: '0s',
          transitionTimingFunction: 'linear',
          transitionDelay: open ? '0ms' : '900ms',
        }}
      >
        {/* Diagonal sweep */}
        {/* FIX 1: added pointer-events-none. On iOS Safari, clip-path does not
            reliably exclude the clipped-away area from hit-testing, so the full
            SVG bounding box (even the "invisible" part) was intercepting taps
            on the ABOUT / SERVICES links that sit near its edge. This is purely
            decorative, so it should never capture touches/clicks anyway. */}
        <svg
          viewBox="0 0 1948 1088"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full pointer-events-none transition-[clip-path] duration-[900ms] ease-[cubic-bezier(.77,0,.175,1)]"
          style={{ clipPath: open ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
        >
          <path d="M390 0H0V120L1410 1088H1948L1962 280L80 0Z" fill="#5686DA" />
        </svg>

        {/* Content fades in after shape lands */}
        <div
          className="absolute inset-0 h-full"
          style={{
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
            transitionProperty: 'opacity',
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease',
            transitionDelay: open ? '750ms' : '0ms',
          }}
        >
          {/* Logo — top left */}
          <div className="absolute left-10 top-12 ">
            {/* Replace with your logo */}
          </div>

          {/* Close button — top right */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="group absolute right-6 top-5 cursor-pointer z-30 border-none bg-transparent p-2"
          >
            <div className="relative h-6 w-6">
              <span className="absolute left-0 top-1/2 block h-[1.5px] w-full origin-center bg-white" style={{ transform: 'rotate(45deg)' }} />
              <span className="absolute left-0 top-1/2 block h-[1.5px] w-full origin-center bg-white" style={{ transform: 'rotate(-45deg)' }} />
            </div>
          </button>

          {/* Nav — bottom right */}
          <nav className="absolute  flex flex-col h-full  justify-center    right-5">
            <div className='translate-y-1/3'>
            {navs.map(({ num, name, link }) => (
              // FIX 3: removed the manual ref-based mouseenter/mouseleave JS listeners
              // (they don't fire reliably on iOS touch, and were re-attaching new
              // listeners on every render, leaking memory) and replaced with a plain
              // CSS group-hover underline, matching the pattern already used elsewhere
              // in this file.
              <Link
                key={name}
                href={link}
                className="group/link relative block overflow-hidden py-1.5 text-white no-underline"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <span
                  className="absolute bottom-1.5 right-0 block h-px w-0 bg-white/50 transition-all duration-500 ease-out group-hover/link:w-full"
                />
                <span className="inline-block transition-transform duration-300  group-hover/link:-translate-x-1.5">
                 
                  <span className="text-2xl md:text-4xl font-semibold tracking-wide transition-colors duration-300 group-hover/link:text-white/70 md:text-5xl">
                    {name}
                  </span>
                </span>
              </Link>
            ))}
            </div>
          </nav>

          {/* Social row — bottom left */}
      
        </div>
      </div>
    </>
  )
}