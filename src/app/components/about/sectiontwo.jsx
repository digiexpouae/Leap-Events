

import Image from "next/image";



export default function StatsSection() {
    const stats = [
        { value: <>1,000+ <br /> EVENTS</>, prefix: "Delivered" },
        { value: <>5M+ <br /> FOOTFALL</>, prefix: "Attracted" },
        { value: <>75  <br /> CLIENTS</>, prefix: "Served" },
        { value: <>22  <br /> AWARDS</>, prefix: "Received" },
        { value: <>8 GUINNESS  <br /> RECORDS</>, prefix: "Registered" },
        { value: <>20 YEARS  <br /> IN BUSINESS</>, prefix: "Over" },
    ];
    return (
        <section className="bg-primary-gradient  w-full px-8 md:px-16 lg:px-24 py-14 md:py-28 relative overflow-hidden">

            {/* Skyline silhouette bottom */}

            <div
                className="absolute bottom-0 left-0 w-full pointer-events-none"
                style={{ height: "clamp(140px, 28vw, 220px)" }}
                aria-hidden="true"
            >
                {/* ↓↓↓ REPLACE THIS DIV WITH YOUR IMAGE ↓↓↓ */}
                <div
                    className="w-full h-full flex items-end justify-center"

                >
                    {/* Placeholder silhouette hint */}
                    <Image src={'/assets/home/3.png'} height={200} width={2000} alt="skylines" />
                </div>
                {/* ↑↑↑ REPLACE THIS DIV WITH YOUR IMAGE ↑↑↑ */}
            </div>

            <div className="max-w-5xl mx-auto relative z-10 lg:pl-20">

                {/* Heading */}
                <h2 className="text-black  uppercase text-2xl md:text-3xl lg:text-[40px] leading-tight tracking-tight  mb-12 md:mb-16">
                    20 YEARS OF TURNING AMBITIOUS VISIONS
                    <br className="hidden sm:block" /> INTO UNFORGETTABLE REALITIES
                </h2>

                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-12">
                    {stats.map(({ value, prefix }, index) => (
                        <div key={index} className="flex flex-col gap-1 ">
                            <span className="text-black text-[20px] md:text-[28px] tracking-tighter">
                                {prefix}
                            </span>
                            <span className="text-[color:var(--color-heading)] font-['GRIFTER'] tracking-tighter font-black text-xl md:text-[40px] leading-none uppercase">
                                {value}
                            </span>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}