import React from "react";
import Image from "next/image";
// ── Logo data ──
// Replace `text` with real <Image> components once you have the assets.
// Each row scrolls in opposite directions for a layered feel.

const row1 = [
    { id: "government-sharjah", text: "Government of Sharjah", logo: '/assets/logo1.png' },
    { id: "dm", text: "DM ▶", logo: '/assets/logo2.png' },
    { id: "majid-al-futtaim", text: "ماجد الفطيم  FUTTAIM", logo: '/assets/logo3.png' },
    { id: "ferjan-dubai", text: "📍 زرجان دبي  FERJAN DUBAI", logo: '/assets/logo4.png' },
    { id: "emirates-nbd-1", text: "Emirates NBD", logo: '/assets/logo5.png' },
    { id: "beam", text: "beam", logo: '/assets/logo6.png' },
    { id: "government-ajman", text: "حكومة عجمان", logo: '/assets/logo7.svg' },
];

const row2 = [
    { id: "dubai-mall", text: "THE DUBAI MALL", logo: '/assets/logo8.png' },
    { id: "fann-media", text: "fann media منصة في", logo: '/assets/logo-9.png' },
    { id: "gems", text: "GEMS Metropole School", logo: '/assets/logo-10.png' },
    { id: "university-dubai", text: "جامعة دبي  University of Dubai", logo: '/assets/logo-11.png' },
    { id: "universal", text: "UNIVERSAL", logo: '/assets/logo13.png' },
    { id: "reel", text: "REEL", logo: '/assets/logo14.png' },
];

const row3 = [
    { id: "government-sharjah", text: "Government of Sharjah", logo: '/assets/logo1.png' },
    { id: "dm", text: "DM ▶", logo: '/assets/logo2.png' },
    { id: "majid-al-futtaim", text: "ماجد الفطيم  FUTTAIM", logo: '/assets/logo3.png' },
    { id: "ferjan-dubai", text: "📍 زرجان دبي  FERJAN DUBAI", logo: '/assets/logo4.png' },
    { id: "emirates-nbd-1", text: "Emirates NBD", logo: '/assets/logo5.png' },
    { id: "beam", text: "beam", logo: '/assets/logo6.png' },
    { id: "government-ajman", text: "حكومة عجمان", logo: '/assets/logo7.svg' },
];

const row4 = [
    { id: "dubai-mall", text: "THE DUBAI MALL", logo: '/assets/logo8.png' },
    { id: "fann-media", text: "fann media منصة في", logo: '/assets/logo-9.png' },
    { id: "gems", text: "GEMS Metropole School", logo: '/assets/logo-10.png' },
    { id: "university-dubai", text: "جامعة دبي  University of Dubai", logo: '/assets/logo-11.png' },
    { id: "universal", text: "UNIVERSAL", logo: '/assets/logo13.png' },
    { id: "reel", text: "REEL", logo: '/assets/logo14.png' },
];


function LogoCard({ item }) {
    return (
        <div
            className="flex-shrink-0 flex items-center justify-center mx-4 px-6 py-4  "
        >
            {item.logo ? (
                <div className="relative h-16 w-44 flex items-center justify-center">
                    <Image
                        src={item.logo}
                        alt={item.text}
                        fill
                        className="object-contain"
                    />
                </div>
            ) : (
                <span className="text-gray-700 font-bold text-xs sm:text-sm text-center leading-tight select-none">
                    {item.text}
                </span>
            )
            }
        </div >
    );
}



function MarqueeRow({ items, direction = "left", speed = 28 }) {
    // Duplicate items so the loop is seamless
    const doubled = [...items, ...items];

    return (
        <div className="relative w-full overflow-hidden">
            {/* Left fade */}
            <div
                className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to right, var(--color-bg-marquee, #f0f6ff), transparent)",
                }}
            />
            {/* Right fade */}
            <div
                className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to left, var(--color-bg-marquee, #f0f6ff), transparent)",
                }}
            />

            <div
                className="flex"
                style={{
                    width: "max-content",
                    animation: `marquee-${direction} ${speed}s linear infinite`,
                }}
            >
                {doubled.map((item, i) => (
                    <LogoCard key={`${item.id}-${i}`} item={item} />
                ))}
            </div>
        </div>
    );
}

export default function TrustedByLeaders() {
    return (
        <section className="w-full py-14 sm:py-20" >
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14">
                <h2
                    className="text-center font-black uppercase text-[clamp(1.8rem,5.5vw,3.5rem)] text-gray-900"
                    style={{ letterSpacing: "-0.01em", lineHeight: 1.0 }}
                >
                    Trusted By Leaders
                </h2>
            </div>

            {/* Three marquee rows */}
            <div className="flex flex-col gap-4 sm:gap-5">
                <MarqueeRow items={row1} direction="left" speed={30} />
                <MarqueeRow items={row2} direction="right" speed={24} />
                <MarqueeRow items={row3} direction="left" speed={27} />
                <MarqueeRow items={row4} direction="right" speed={27} />

            </div>


        </section>
    );
}