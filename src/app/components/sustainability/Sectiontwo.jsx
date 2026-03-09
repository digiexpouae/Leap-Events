
import Image from "next/image";
import Event from '../Home/event'
const events = [
    {
        // Replace with your actual image path:
        image: '/assets/s-1.png',
        placeholder: "Event Image 1",
        title: <>Sustainability efforts at LIWA <br /> Village​</>,
        list: ["20% Solar Powered​", "Eco-Conscious Design​", "Local Sourcing​"]
    },
    {
        id: 2,
        image: '/assets/s-2.png',
        placeholder: "Event Image 2",
        title: <>Sustainability efforts at Ferjan  <br />  Festival​</>,
        list: ["80% Solar Powered​", "Eco-Conscious Design​", "Local Sourcing​"],
    },

];

export default function MomentsWeCreated({ className }) {
    return (
        <>
            {/* ── Moments We Created Section ── */}
            <section
                className={`w-full relative bg-[var(--color-bg-secondary)] py-12 sm:py-16 lg:py-20   ${className}`}
            >
                <div className="mx-auto max-w-5xl ">

                    {/* Header row */}


                    {/* 2×2 grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {events.map((event) => (
                            <EventCard key={event.placeholder} event={event} />
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
        <div className="flex flex-col">
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



                {/* Hover shimmer */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(120deg, transparent 30%, rgba(86,134,218,0.12) 50%, transparent 70%)",
                    }}
                />



            </div>
            <div className=" text-white  flex flex-col items-start justify-start p-4 sm:p-5 ">
                <span className="font-black uppercase mt-4 text-base sm:text-2xl leading-tight tracking-tighter">
                    {event.title}
                </span>
                <ul className="text-xs sm:text-base mt-4 pl-4 font-light leading-[2.3]" >
                    {event.list.map((elem, index) => {
                        return (
                            <li key={index} className="" style={{ listStyle: "disc" }}>{elem}</li>)
                    })}


                </ul>
            </div></div>
    );
}