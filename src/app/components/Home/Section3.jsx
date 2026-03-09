
import Image from "next/image";
import Event from './event'
const events = [
    {
        id: 1,
        title: "Ferjaan Festival",
        category: "Family Festivals",
        year: "2026",
        // Replace with your actual image path:
        image: '/assets/home/2.png',
        placeholder: "Event Image 1",
    },
    {
        id: 2,
        title: "University of Dubai",
        category: "Students Festival",
        year: "2026",
        image: '/assets/home/4.png',
        placeholder: "Event Image 2",
    },
    {
        id: 3,
        title: "D-Tech",
        category: "Tech Festival",
        year: "2026",
        image: '/assets/home/5.png',
        placeholder: "Event Image 3",
    },
    {
        id: 4,
        title: "Ferjaan Festival",
        category: "Family Festival",
        year: "2026",
        image: '/assets/home/6.png',
        placeholder: "Event Image 4",
    },
];

export default function MomentsWeCreated({ className }) {
    return (
        <>
            {/* ── Moments We Created Section ── */}
            <section
                className={`w-full relative  py-4 ${className}`}
            >
                <div className="mx-auto max-w-7xl ">

                    {/* Header row */}


                    {/* 2×2 grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>


                {/* <Event /> */}
            </section >

            {/* ── What We Do teaser ── */}



        </>
    );
}

function EventCard({ event }) {
    return (
        <div
            className="group relative overflow-hidden "
            style={{ aspectRatio: "16/9" }}
        >
            {/* ── IMAGE PLACEHOLDER ── */}
            {/* Replace this div with your Next.js Image: */}


            <div
                className="absolute inset-0 flex items-center justify-center text-xs font-mono tracking-widest uppercase"
                style={{
                    background:
                        "linear-gradient(135deg, #1a2d5a 0%, #0d1b3e 60%, #162244 100%)",
                    color: "rgba(255,255,255,0.18)",
                }}
            >
                {/* ↓ swap this entire div with <Image … /> */}
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Gradient overlay */}
            <div
                className="absolute inset-0 "
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)",
                }}
            />

            {/* Text overlay — top */}
            <div className="absolute top-0 left-0  text-white right-0 flex flex-col items-center justify-center p-4 sm:p-5 z-10">
                <h3 className="font-black uppercase  text-base sm:text-xl leading-tight tracking-wide">
                    {event.title}
                </h3>
                <p className="text-xs sm:text-sm mt-0.5" >
                    {event.category} / {event.year}
                </p>
            </div>

            {/* Hover shimmer */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(120deg, transparent 30%, rgba(86,134,218,0.12) 50%, transparent 70%)",
                }}
            />
        </div>
    );
}