

function ServiceCard({ title, subtitle, body }) {
    return (
        <div className="flex flex-col gap-3 mb-4 bg-primary-two  h-[300px] md:h-[400px]  py-8 px-10 border-gray-200">
            <h3 className="text-[color:var(--color-heading)] uppercase text-xl lg:text-3xl tracking-tighter leading-snug">
                {title}
            </h3>
            <p className=" font-semibold text-xl tracking-tighter">
                {subtitle}
            </p>
            <p className="text-sm tracking-tighter">
                {body}
            </p>
        </div>
    );
}

export default function CreativeStrategySection({
    heading,
    description,
    services,
}) {
    const rows = [];
    for (let i = 0; i < services.length; i += 2) {
        rows.push(services.slice(i, i + 2));
    }

    return (
        <section className="w-full bg-white px-6 md:px-16 lg:px-24 py-14 md:py-20">
            <div className="max-w-5xl mx-auto">

                {/* Section heading */}
                <h2 className="uppercase text-center md:text-start text-2xl md:text-3xl lg:text-5xl leading-tight tracking-tight mb-3">
                    {heading}
                </h2>
                <p className="text-gray text-center md:text-start text-base md:text-2xl tracking-tighter mb-2">
                    {description}
                </p>

                {/* Service rows */}
                <div className="mt-4 md:mt-16">
                    {rows.map((row, rowIdx) => (
                        <div
                            key={rowIdx}
                            className={`grid gap-x-4
                                grid-cols-1 md:grid-cols-2 
                                }`}
                        >
                            {row.map((service) => (
                                <ServiceCard key={service.title} {...service} />
                            ))}
                            {/* Empty cell to keep single last item left-aligned */}
                            {row.length === 1 && <div className="hidden md:block" />}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}