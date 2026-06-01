import FadeUp from "@/app/common/Transition";

const cards = [
  {
    number: "1",
    title: "ONE TEAM, ONE ROOF",
    description:
      "Creative, design, production and delivery all sit in-house. Faster decisions, tighter control, no hand-offs.",
    primary: true,
  },
  {
    number: "2",
    title: "ROOTED IN THE REGION",
    description:
      "Ten-plus years of delivering across Dubai, Sharjah, Ajman, and beyond gives us the local knowledge most agencies lack.",
    primary: false,
  },
  {
    number: "3",
    title: "BUILT TO DELIVER",
    description:
      "Our own workshops, printing facilities, and technical capabilities mean we don't just plan we produce, install, and run the show.",
    primary: false,
  },
];

export default function BuiltOnCraft() {
  return (
    <section className="bg-[var(--color-bg-secondary)] px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header Row */}
        <FadeUp>
        <div className="mb-12 flex flex-col gap-6 md:grid grid-cols-[1fr_2fr_1fr] md:items-start justify-between">
          <p className="max-w-md text-sm leading-relaxed text-white/60  md:text-left text-center">
            Great events aren&apos;t accidents. They&apos;re the result of clear
            thinking, careful planning, and a team that takes ownership of every
            stage. Here&apos;s how we work.
          </p>

          <h2 className="text-3xl font-bold uppercase text-center  leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            Built on Craft,
            <br />
            Driven by Detail
          </h2>
        </div></FadeUp>

        {/* Cards Grid */}
    <FadeUp>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.number}
              className={`relative flex min-h-72 flex-col justify-between md:translate-x-10 md:w-[90%] rounded-2xl p-6 md:min-h-[420px] ${
                card.primary
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-white text-black"
              }`}
            >
              {/* Top: number + description */}
              <div className="flex items-center justify-between gap-4">
                <span
                  className={`text-7xl font-bold leading-none md:text-9xl ${
                    card.primary ? "text-white" : "text-gray-900"
                  }`}
                >
                  {card.number}
                </span>
                <p
                  className={`max-w-[10rem] text-[12px] leading-[1.2] ${
                    card.primary ? "text-white/80" : "text-black"
                  }`}
                >
                  {card.description}
                </p>
              </div>

              {/* Bottom: title */}
              <p
                className={`text-2xl text-left font-bold uppercase tracking-tighter ${
                  card.primary ? "text-white" : "text-gray-900"
                }`}
              >
                {card.title}
              </p>
            </div>
          ))}
        </div>
</FadeUp>
      </div>
    </section>
  );
}