"use client";

import { useState } from "react";


export default function PortfolioFilterSection({
    heading,
    categories,
    onTabChange,
}) {
    const [active, setActive] = useState(categories[0]);

    function handleTab(tab) {
        setActive(tab);
        onTabChange?.(tab);
    }

    return (
        <section className="w-full bg-primary-two px-6 md:px-16 lg:px-24 py-14 md:py-20">
            <div className="max-w-5xl mx-auto">

                {/* Heading */}
                <h2 className=" font-black uppercase text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight mb-10 md:mb-12">
                    {heading}
                </h2>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2.5">
                    {categories.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTab(tab)}
                            className={`px-4 py-2 rounded-full border text-base md:text-lg tracking-tighter font-medium transition-colors duration-200 cursor-pointer  border-[var(--color-primary)] 
                ${active === tab
                                    ? "bg-[color:var(--color-heading)] text-white"
                                    : "bg-transparent text-black hover:text-[color:var(--color-heading)]"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
}