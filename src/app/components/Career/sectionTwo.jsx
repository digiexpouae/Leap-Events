import Link from "next/link";
export default function CareerHeroSection({
    heading = "WE DON'T JUST DELIVER EXPERIENCES—WE LIVE THEM. AT LEAPEVENTS, PEOPLE ARE THE HEARTBEAT OF EVERYTHING WE DO.",
    description = <>Discover a workplace where passion fuels <br /> purpose and culture drives creativity.</>,
    ctaLabel = "Explore Opportunities",
    ctaHref = "#open-roles",
}) {
    return (
        <section className="bg-primary-gradient w-full px-6 md:px-16 lg:px-24 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">

                {/* Main heading */}
                <h2 className="font-black uppercase text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-10 md:mb-12">
                    {heading}
                </h2>

                {/* Description + CTA row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <p className="text-[#363737] text-base md:text-3xl tracking-tighter ">
                        {description}
                    </p>
                    <Link
                        href={ctaHref}
                        className="flex-shrink-0 bg-[color:var(--color-heading)] hover:opacity-90 transition-opacity text-white text-base  rounded-full px-4 py-3 text-center"
                    >
                        {ctaLabel}
                    </Link>
                </div>

            </div>
        </section>
    );
}