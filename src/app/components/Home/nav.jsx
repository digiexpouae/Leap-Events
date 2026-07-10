'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine scroll direction
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                // Scrolling Down -> Hide Navbar
                setIsVisible(false);
            } else {
                // Scrolling Up -> Show Navbar
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-10 left-0 z-30 right-0 max-w-2xl mx-auto hidden md:flex items-center justify-center transition-all duration-500 ease-in-out transform ${isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-128  pointer-events-none'
                }`}
        >
            {/* Main Navigation Pill */}
            <nav className="flex items-center justify-between w-full px-8 py-3 bg-white rounded-full shadow-2xl">

                {/* Navigation Links */}
                <div className="flex gap-16">
                    <Link
                        href="/projects"
                        className="text-md font-bold tracking-tight uppercase text-[#363737] transition-colors hover:text-blue-600"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/about"
                        className="text-md font-bold tracking-tight text-[#363737] transition-colors hover:text-blue-600"
                    >
                        ABOUT US
                    </Link>
                </div>

                {/* CTA Button */}
                <Link href="tel:+971 04 228 0856">
                <button className="flex items-center gap-3 py-1 pl-8 pr-3 transition-transform bg-[var(--color-primary)] rounded-full hover:scale-105 active:scale-95 group">
                    <span className=" text-white tracking-tight">
                        SCHEDULE A CALL
                    </span>
                    <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                        <Image
                            src="/assets/phone.svg"
                            width={20}
                            height={20}
                            alt="Phone icon"
                        />
                    </div>
                </button></Link>

            </nav>
        </div>
    );
}
