"use client";

import { useState } from "react";

const faqs = [
    { id: 1, question: "Why Leap Events?" },
    { id: 2, question: "Do you offer customized event planning services?" },
    { id: 3, question: "How far in advance should I book your services?" },
    { id: 4, question: "Do you manage events outside your city or country?" },
];

export default function FAQSection() {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

    return (
        <section className="min-h-screen bg-white flex items-center justify-center px-6 py-20 font-sans">
            <div className="w-full max-w-5xl ">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-black uppercase leading-tight tracking-tight mb-14">
                    The Questions You
                    <br />
                    You Might Be Asking
                </h2>

                <div className="relative flex items-end justify-end">
                    {/* Next.js Logo Bubble */}


                    {/* Keyframe styles */}
                    <style>{`
            @keyframes spinToMinus {
              0%   { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes spinToPlus {
              0%   { transform: rotate(360deg); }
              100% { transform: rotate(0deg); }
            }
            .icon-open {
              animation: spinToMinus 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            .icon-close {
              animation: spinToPlus 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
          `}</style>

                    {/* FAQ Items */}
                    <div className="divide-y divide-gray-200 lg:w-1/2">
                        {faqs.map(({ id, question }) => {
                            const isOpen = openId === id;
                            return (
                                <div key={id}>
                                    <button
                                        onClick={() => toggle(id)}
                                        aria-expanded={isOpen}
                                        className="w-full flex items-center  border-t  border-black justify-between py-5 px-2 text-left transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                    >
                                        <span className="text-lg sm:text-3xl  text-black pr-6 leading-snug">
                                            {question}
                                        </span>

                                        {/* Icon: spins 360° then shows + or - */}
                                        <span className="bg-[var(--color-primary)] rounded">
                                            <span
                                                className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${isOpen ? "icon-open" : "icon-close"}`}
                                                aria-hidden="true"
                                            >
                                                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white">
                                                    {/* Horizontal bar — always present */}
                                                    <path d="M2 8h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                                    {/* Vertical bar — hidden when open */}
                                                    <path
                                                        d="M8 2v12"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        style={{
                                                            transformOrigin: "8px 8px",
                                                            transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                                                            opacity: isOpen ? 0 : 1,
                                                            transition: "transform 0.15s ease 0.25s, opacity 0.15s ease 0.25s",
                                                        }}
                                                    />
                                                </svg>
                                            </span>
                                        </span>
                                    </button>

                                    {/* Accordion body */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 pb-4" : "max-h-0"}`}
                                    >
                                        <p className="px-2 text-sm text-gray-500 leading-relaxed">
                                            We&apos;re here to help. Reach out to our team and we&apos;ll get back to you
                                            as soon as possible with all the details you need.
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}