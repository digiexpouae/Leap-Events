const cultures = [
    {
        title: "DYNAMIC & BOLD",
        description:
            "Thriving on Dubai's dynamic energy, we push creative boundaries at every event",
        position: "top-left",
    },
    {
        title: "CREATIVITY MEETS STRATEGY",
        description:
            "Regular brainstorming and strategic sessions ensure fresh, impactful ideas",
        position: "top-right",
    },
    {
        title: "CONTINUOUS LEARNING",
        description: (
            <>
                We champion ongoing education to stay ahead in the{" "}
                <span className="underline underline-offset-2">
                    event industry trends
                </span>
            </>
        ),
        position: "bottom-left",
    },
    {
        title: "DIVERSITY & DIALOGUE",
        description:
            "Our strength is our diversity, fostering innovation through open dialogue",
        position: "bottom-right",
    },
];

export default function OurCultureSection() {
    return (
        <section className="w-full bg-white px-6 md:px-16 lg:px-24 py-16 md:py-24">
            <div className="max-w-7xl mx-auto">

                {/* Main heading */}
                <h2 className="text-center font-black uppercase text-4xl md:text-5xl lg:text-6xl tracking-tight text-[color:var(--color-heading)] mb-16 md:mb-20">
                    OUR CULTURE
                </h2>

                {/* 2x2 grid with cross dividers */}
                <div className="grid grid-cols-1 md:grid-cols-2 border-black">
                    {cultures.map(({ title, description }, index) => (
                        index % 3 === 0 && console.log("index", index),
                        <div
                            key={index}
                            className={`md:border-b ${index % 2 === 0 ? "md:border-r" : ""}  md:border-black px-10 py-12 text-center`}
                        >
                            <h3 className="text-[color:var(--color-heading)] font-black uppercase text-lg md:text-xl lg:text-2xl tracking-tight mb-5">
                                {title}{index * 1}
                            </h3>
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom solo card */}
                <div className="px-10 py-12 text-center">
                    <h3 className="text-[color:var(--color-heading)] font-black uppercase text-lg md:text-xl lg:text-2xl tracking-tight mb-5">
                        COLLABORATIVE ENVIRONMENT
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                        Celebrating teamwork, we craft experiences
                        <br />
                        that resonate on a global stage
                    </p>
                </div>

            </div>
        </section>
    );
}