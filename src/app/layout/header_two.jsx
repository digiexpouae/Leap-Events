'use client'
import Link from 'next/link'
import DiagonalMenu from '../common/menu'
import Image from 'next/image'
import TranslateButtons from '../components/Translate'
import { useState } from 'react'
export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>  
  
  
   <header className="block fixed w-full h-[82px] z-[99] flex items-stretch ">
      <div className='fixed -top-px -left-px z-[999999] flex'>
        <DiagonalMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

    </div>

      {/* ── LEFT: menu button block ─────────────────────────────── */}
      {/*
        DiagonalMenu renders its own fixed button at top-left.
        We add a matching blue backing block so it looks flush.
      */}

      {/* ── CENTER: logo on diagonal blue shape ─────────────────── */}
      <div className="relative flex flex-1 items-start justify-center">
        {/* Diagonal blue band behind logo */}
        <div
          className="absolute  inset-y-0 left-1/2 w-[260px] -translate-x-1/2"
     
        />
        <Link href="/">
      <Image 
      src={"/assets/logo.svg"}
      alt="logo"
      width={100}
      height={60}
      className=' translate-y-[4px] md:translate-y-[10px]'
      />
      </Link>




      <div className='absolute  md:right-10 right-0 inset-y-0'>
                {/* <div id="google_translate_element" style={{ display: 'none' }}></div> */}
          <TranslateButtons isMenuOpen={isMenuOpen} />

      </div>
      </div>



      {/* ── RIGHT: lang + CTA ───────────────────────────────────── */}


    </header>
    </>   
  
  )
}