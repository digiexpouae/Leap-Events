"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Work", link: "/ourwork" },
    { name: "Portfolio", link: "#" },
    { name: "Careers", link: "/career" },
    { name: "Blogs", link: "/articles" },
];

// Replace the services array with this:
const About = [
    { name: "Sustainability", href: "/about/sustainability" },
];
const aboutNames = About.map((s) => s.name);
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("Home");
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    useEffect(() => {
        console.log("Active", active)
    }, [])


    return (
        <nav className="w-full fixed top-0 z-[99]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image src="/assets/logo.svg" alt="leap" width={80} height={80} />
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div
                        className="hidden lg:flex items-center border border-[#595959] bg-[#00000080] rounded-full text-md tracking-tight px-2 py-1 gap-1"
                        style={{ backdropFilter: "blur(20px)" }}
                    >
                        {navLinks.map((elem) =>
                            elem.name === "About" ? (

                                // Services with dropdown
                                <div key={elem.name} className="relative group">
                                    <button
                                        onClick={() => setActive(elem.name)}
                                        className={`px-4 py-1.5 rounded-full font-medium text-white flex items-center gap-1.5 ${aboutNames.includes(active) || active === elem.name ? "font-semibold" : "font-normal"
                                            }`}
                                    >
                                        <Link href={elem.link}>{elem.name}</Link>
                                        <svg
                                            width="12" height="12" viewBox="0 0 12 12" fill="none"
                                            className="transition-transform duration-200 group-hover:rotate-180"
                                        >
                                            <path d="M2 4L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                    {/* Dropdown panel */}
                                    <div
                                        className={"absolute top-[calc(100%+16px)] left-1/2 -translate-x-10 z-50 rounded-2xl overflow-hidden invisible opacity-0 translate-y-1  group-hover:visible group-hover:opacity-100  transition-all duration-200 ease-out"}
                                        style={{
                                            width: "480px",
                                            background: "rgba(10, 10, 10, 0.85)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            backdropFilter: "blur(24px)",
                                            boxShadow: "0 24px 48px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
                                        }}
                                    >
                                        {/* Top shimmer line */}
                                        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />

                                        <div className="p-5 grid grid-cols-3 gap-3">
                                            {About.map((section) => (
                                                <div key={section.name}>



                                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover/item:bg-white/60 transition-colors flex-shrink-0" />
                                                    <span className="text-sm text-white/70 group-hover/item:text-white transition-colors">
                                                        <Link
                                                            key={section.name}
                                                            href={section.href}
                                                            onClick={() => {
                                                                setActive(section.name)
                                                                console.log("active", active)

                                                            }

                                                            }
                                                            className="flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-150 hover:bg-white/[0.06] group/item"
                                                        >   {section.name}  </Link>
                                                    </span>

                                                </div>
                                            ))}
                                        </div>

                                        {/* Bottom CTA */}
                                        <div
                                            className="mx-4 mb-4 rounded-xl px-4 py-3 flex items-center justify-between"
                                            style={{
                                                background: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(255,255,255,0.06)",
                                            }}
                                        >
                                            <p className="text-xs text-white/40">Ready to build something great?</p>
                                            <Link
                                                href="/contact"
                                                className="text-xs font-semibold px-3 py-1.5 rounded-full text-black bg-white hover:opacity-80 transition-opacity"
                                            >
                                                Let's talk →
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            ) : (

                                // All other nav links
                                <button
                                    key={elem.name}
                                    onClick={() => setActive(elem.name)}
                                    className={`px-4 py-1.5 rounded-full font-medium text-white ${active === elem.name ? "font-semibold" : "font-normal"
                                        }`}
                                >
                                    <Link href={elem.link}>{elem.name}</Link>
                                </button>
                            )
                        )}
                    </div>

                    {/* Contact CTA */}
                    <div className="hidden lg:block">
                        <Link
                            href="/contact"
                            className="px-5 py-2 bg-primary rounded-full text-white text-md font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 shadow-md"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="lg:hidden flex items-center gap-3">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg transition-colors"
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
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div
                    className="mx-4 mb-4 mt-2 rounded-2xl overflow-hidden flex flex-col"
                    style={{
                        background: "rgba(10,10,10,0.90)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(24px)",
                    }}
                >
                    {navLinks.map((elem) =>
                        elem.name === "About" ? (

                            // Mobile Services accordion
                            <div key={elem.name}>
                                <button
                                    className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/[0.04] transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Link href="/about">  <span>About</span></Link>
                                    <svg
                                        onClick={() => {
                                            setMobileServicesOpen(!mobileServicesOpen)
                                        }}

                                        width="12" height="12" viewBox="0 0 12 12" fill="none"
                                        className="transition-transform duration-200"
                                        style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                                    >
                                        <path d="M2 4L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                                {/* Accordion content */}
                                <div
                                    className="overflow-hidden transition-all duration-300 ease-in-out"
                                    style={{ maxHeight: mobileServicesOpen ? "400px" : "0px" }}
                                >
                                    <div
                                        className="mx-3 mb-2 rounded-xl p-4 grid grid-cols-3 gap-3"
                                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                                    >
                                        {About.map((section) => (
                                            <div key={section.name}>

                                                <Link
                                                    key={section.name}
                                                    href={section.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block text-xs text-white/60 hover:text-white py-1 transition-colors"
                                                >
                                                    {section.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px mx-5 bg-white/[0.05]" />
                            </div>

                        ) : (

                            // Regular mobile link
                            <div key={elem.name}>
                                <Link
                                    href={elem.link}
                                    onClick={() => { setActive(elem.name); setIsOpen(false); }}
                                    className={`block px-5 py-3.5 text-sm font-medium transition-all ${active === elem.name ? "text-white" : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                                        }`}
                                >
                                    {elem.name}
                                </Link>
                                <div className="h-px mx-5 bg-white/[0.05]" />
                            </div>
                        )
                    )}

                    {/* Mobile CTA */}
                    <div className="p-4">
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center py-3 rounded-full text-sm font-semibold text-black bg-white hover:opacity-90 transition-opacity"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </nav >
    );
}