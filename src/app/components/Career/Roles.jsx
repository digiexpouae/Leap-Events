const defaultRoles = [
    {
        title: "SENIOR\nMARKETING EXECUTIVE",
        tags: ["Dubai", "Full-time", "On-site", "Sales"],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est mauris, aliquet in pulvinar nec.",
    },
    {
        title: "SENIOR\nMARKETING EXECUTIVE",
        tags: ["Dubai", "Full-time", "On-site", "Sales"],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est mauris, aliquet in pulvinar nec.",
    },
    {
        title: "SENIOR\nMARKETING EXECUTIVE",
        tags: ["Dubai", "Full-time", "On-site", "Sales"],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est mauris, aliquet in pulvinar nec.",
    },
    {
        title: "SENIOR\nMARKETING EXECUTIVE",
        tags: ["Dubai", "Full-time", "On-site", "Sales"],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est mauris, aliquet in pulvinar nec.",
    },
];

function RoleCard({ title, tags, description }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 py-8 border-b border-white">

            {/* Left: title + tags + description */}
            <div className="flex flex-col gap-3 flex-1">
                <h3 className="text-[color:var(--color-heading)] font-black uppercase text-lg md:text-4xl leading-tight whitespace-pre-line">
                    {title}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-lg text-white border border-[var(--color-primary)] rounded-full px-4 py-2"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-white text-2xl tracking-tighter font-light">
                    {description}
                </p>
            </div>

            {/* Right: CTA button */}
            <div className="sm:pt-1 flex-shrink-0">
                <button className="bg-[color:var(--color-heading)] hover:opacity-90 transition-opacity text-white text-base font-medium tracking-tighter rounded-full px-5 py-2.5 cursor-pointer">
                    Explore Opportunities
                </button>
            </div>

        </div>
    );
}

export default function OpenRolesSection({
    heading = "OPEN ROLES",
    roles = defaultRoles,
}) {
    return (
        <section className="bg-[var(--color-bg-secondary)] w-full px-6 md:px-16 lg:px-24 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">

                {/* Heading */}
                <h2 className="text-white font-black uppercase text-3xl md:text-4xl lg:text-5xl tracking-tight text-center mb-12 md:mb-16">
                    {heading}
                </h2>

                {/* Roles list */}
                <div className="flex flex-col">
                    {roles.map((role, i) => (
                        <RoleCard key={i} {...role} />
                    ))}
                </div>

            </div>
        </section>
    );
}