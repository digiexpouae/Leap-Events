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
                    <div className="lg:hidden relative flex items-center gap-3">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 relative z-20 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <svg className="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden absolute inset-0  transition-all duration-300 h-screen ease-in-out ${isOpen ? " translate-x-0 opacity-100" : "translate-x-100 opacity-0"
                    }`}

                style={{
                    background: "rgba(10,10,10,0.90)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(24px)",
                }}
            >
                <div
                    className=" h-full overflow-hidden flex flex-col translate-y-30 "

                >
                    {/* Mobile Menu — Right Slide Drawer Body */}
                    {navLinks.map((elem, i) =>
                        elem.name === "About" ? (
                            <div key={elem.name}>
                                {/* About row with split tap zones */}
                                <div
                                    className="flex items-center mx-3 my-0.5 rounded-2xl overflow-hidden transition-colors"
                                    style={{ background: mobileServicesOpen ? "rgba(255,255,255,0.05)" : "transparent" }}
                                >
                                    <Link
                                        href="/about"
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 px-4 py-3.5 text-xl font-medium text-white/75 hover:text-white transition-colors"
                                    >
                                        About
                                    </Link>

                                    {/* Divider between text and chevron */}
                                    <div className="w-px h-5 bg-white/10 flex-shrink-0" />

                                    <button
                                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                        className="px-4 py-3.5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                                        aria-label="Toggle About submenu"
                                    >
                                        <svg
                                            width="11" height="11" viewBox="0 0 12 12" fill="none"
                                            style={{
                                                transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)"
                                            }}
                                        >
                                            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Accordion sub-items */}
                                <div
                                    className="overflow-hidden"
                                    style={{
                                        maxHeight: mobileServicesOpen ? "300px" : "0px",
                                        opacity: mobileServicesOpen ? 1 : 0,
                                        transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
                                    }}
                                >
                                    <div className="mx-6 mb-3 mt-1 flex flex-col gap-0.5">
                                        {About.map((section) => (
                                            <Link
                                                key={section.name}
                                                href={section.href}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base text-white/45 hover:text-white hover:bg-white/[0.05] transition-all"
                                            >
                                                {/* Dot indicator */}
                                                <span
                                                    className="w-1 h-1 text-base rounded-full flex-shrink-0"
                                                    style={{ background: "rgba(255,255,255,0.3)" }}
                                                />
                                                {section.name}
                                                {/* Arrow nudge on hover */}
                                                <span className="ml-auto text-white/20 text-[10px]">↗</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Thin rule */}
                                <div className="h-px mx-6 bg-white/[0.05]" />
                            </div>

                        ) : (
                            <div key={elem.name}>
                                <Link
                                    href={elem.link}
                                    onClick={() => { setActive(elem.name); setIsOpen(false); }}
                                    className="flex items-center justify-between mx-3 my-0.5 px-4 py-3.5 rounded-2xl text-xl font-medium transition-all"
                                    style={{
                                        color: active === elem.name ? "white" : "rgba(255,255,255,0.55)",
                                        background: active === elem.name ? "rgba(255,255,255,0.06)" : "transparent",
                                        // Staggered slide-in
                                        transform: isOpen ? "translateX(0)" : "translateX(20px)",
                                        opacity: isOpen ? 1 : 0,
                                        transition: `transform 0.4s cubic-bezier(0.4,0,0.2,1) ${i * 45}ms, opacity 0.35s ease ${i * 45}ms, background 0.15s, color 0.15s`,
                                    }}
                                >
                                    <span>{elem.name}</span>

                                    {/* Active indicator dot */}
                                    {active === elem.name && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                                    )}
                                </Link>

                                {/* Subtle rule — skip last */}
                                {i < navLinks.length - 1 && (
                                    <div className="h-px mx-6 bg-white/[0.04]" />
                                )}
                            </div>
                        )
                    )}

                    {/* Mobile CTA */}
                    <div className="p-4 pt-3 mt-auto">
                        {/* Small label */}
                        <p className="text-center text-[10px] text-white/20 tracking-widest uppercase mb-3">
                            Ready to work together?
                        </p>

                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold text-black bg-white hover:opacity-90 active:scale-95 transition-all"
                        >
                            Contact Us
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7h10M8 3l4 4-4 4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </nav >
    );
}