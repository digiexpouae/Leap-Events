export default function OurStorySection({ heading, text, className }) {
    return (
        <section className="w-full h-screen flex items-center justify-center bg-white  px-4 md:px-0">
            <div className="max-w-5xl mx-auto  pt-20 ">

                {/* Vision paragraph — right half */}
                <div className="flex justify-end mb-6 md:mb-8">
                    <p className="w-2/3  flex justify-end  text-sm md:text-[25px] tracking-tighter leading-[1.2] text-gray  "  >
                        {text}
                    </p>
                </div>

                {/* OUR STORY heading */}
                <h2
                    className={`text-[clamp(3.5rem,14vw,9.5rem)] font-black uppercase leading-none text-center tracking-tight ${className}`}
                    style={{ color: "var(--color-heading)" }}
                >
                    {heading}
                </h2>

            </div>
        </section>
    );
}