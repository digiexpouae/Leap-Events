'use client'
import Link from 'next/link'
import DiagonalMenu from '../common/menu'
import Image from 'next/image'
export default function Header() {
  return (
    <>  
    <div className='fixed -top-px -left-px z-[999999] flex'>
        <DiagonalMenu />

    </div>
  
   <header className="block fixed w-full h-[82px] z-[99] flex items-stretch ">

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
      className='translate-y-[10px]'
      />
      </Link>
      </div>

      {/* ── RIGHT: lang + CTA ───────────────────────────────────── */}


    </header>
    </>   
  
  )
}