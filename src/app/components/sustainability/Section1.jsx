import Image from "next/image";

const pillars = [
    {
        icon: '/assets/icon-1.svg',
        title: <>ECO-CONSCIOUS <br /> DESIGN</>,
        description:
            "Modular, reusable, and recyclable materials across event structures, décor, and signage.",
    },
    {
        icon: '/assets/icon-2.svg',
        title: "ENERGY EFFICIENCY",
        description:
            "Integration of LED and solar-powered systems to minimize energy consumption.",
    },
    {
        icon: '/assets/icon-3.svg',
        title: "WASTE MANAGEMENT",
        description:
            "Certified recycling and waste-segregation programs at all event sites.",
    },
];

export default function SustainableEventsSection() {
    return (
        <section className="bg-primary-gradient w-full px-6 md:px-16 lg:px-24 py-16 md:py-24">
            <div className="max-w-5xl mx-auto">

                {/* Top: heading + description side by side */}
                <div className="flex flex-col md:items-start md:gap-6 mb-14 md:mb-20 max-w-3xl">

                    <h2 className=" font-black uppercase text-2xl md:text-3xl lg:text-5xl leading-tight tracking-tight flex-shrink-0 mb-6 md:mb-0">
                        LEAPEVENTS CONTRIBUTION
                        <br />  TO SUSTAINABLE EVENTS
                    </h2>

                    <p className=" text-sm md:text-2xl tracking-tighter text-gray leading-[1.2] ">
                        LAPA fully applies international best practices in main event production
                        to reduce environmental impact while maintaining creative excellence.
                    </p>

                </div>

                {/* Divider line with dots */}
                <div className="relative flex items-center mb-14 md:mb-16">
                    <div className="flex-1 border-t border-white/20" />
                    {pillars.map((_, i) => (
                        <span
                            key={i}
                            className="w-2.5 h-2.5 rounded-full bg-white/40 mx-[calc(100%/6-5px)] first:ml-0 last:mr-0 flex-shrink-0"
                        />
                    ))}
                    <div className="flex-1 border-t border-white/20" />
                </div>

                {/* Three pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-18">
                    {pillars.map(({ icon, title, description }) => (
                        <div key={title} className="flex flex-col items-start  gap-4">
                            <div className=" flex items-center justify-center flex-shrink-0">
                                <Image src={icon}
                                    width={120}
                                    height={0}
                                    alt={title}
                                />
                            </div>
                            <div className=" ">
                                <span className=" font-black text-[var(--color-heading)] uppercase text-sm md:text-2xl tracking-tighter leading-snug mb-2">
                                    {title}
                                </span>
                                <p className=" text-xs md:text-sm tracking-tighter ">
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section >
    );
}