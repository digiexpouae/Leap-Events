"use client";

import { useState } from "react";
import Link from "next/link";
const navLinks = [{ name: "Home", link: "/" }, { name: "About", link: "/about" }, { name: "Services", link: '/services' }, { name: "Work", link: "/ourwork" }, { name: "Portfolio", link: "#" }, { name: "Careers", link: "/career" }, { name: "Blogs", link: "/articles" }];
import Image from "next/image";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("Home");

    return (
        <nav className="w-full  fixed top-0 z-[99]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-16">

                    {/* Logo Placeholder */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center gap-2">
                            {/* SVG placeholder mimicking "leap" logo style */}
                            <Link href="/">    <Image src="/assets/logo.svg" alt="leap" width={80} height={80} /></Link>
                        </div>
                    </div>

                    {/* Desktop Nav Links - pill container */}
                    <div
                        className="hidden lg:flex items-center border border-[#595959] bg-[#00000080] rounded-full text-md tracking-tight px-2 py-1 gap-1"
                        style={{ backdropFilter: 'blur(20px)' }}
                    >
                        {navLinks.map((elem) => (

                            <button
                                key={elem.name}
                                onClick={() => setActive(elem.name)}
                                className={`px-4 py-1.5 rounded-full  font-medium text-white   ${active === elem.name
                                    ? " font-semibold "
                                    : "font-normal "
                                    }`}
                            >

                                <Link href={elem.link}>   {elem.name}
                                </Link>
                            </button>
                        ))}
                    </div>

                    {/* Contact Button */}
                    <div className="hidden lg:block">
                        <button
                            className="px-5 py-2 bg-primary rounded-full text-white text-md font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 shadow-md"

                        >
                            Contact Us
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="lg:hidden flex items-center gap-3">
                        {/* <button
                            className="px-4 py-1.5 rounded-full text-white text-sm font-semibold"
                            style={{ backgroundColor: "#5686DA" }}
                        >
                            Contact Us
                        </button> */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-100 flex flex-col gap-1">
                    {navLinks.map((elem) => (

                        <button
                            key={elem.name}
                            onClick={() => { setActive(elem.name); setIsOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${active === elem.name
                                ? "text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            style={active === elem.name ? { backgroundColor: "#5686DA" } : {}}
                        >
                            <Link href={elem.link}> {elem.name}  </Link>
                        </button>

                    ))}
                </div>
            </div>
        </nav>
    );
}