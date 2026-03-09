// components/HeroSection.jsx
import Image from "next/image";

export default function Banner() {
    return (
        <section className="relative w-full h-screen min-h-[500px] overflow-hidden">
            {/* Background Image */}
            <Image
                src="/assets/banner.png"
                alt="Event background with stage lights and crowd"
                fill
                priority
                quality={90}
                className="object-cover object-center"
            />

            {/* Dark overlay */}

            {/* Content */}
            <div className="relative z-10 flex flex-col translate-y-1/4 items-center justify-center h-full px-4 text-center">
                <h2 className="text-white font-extrabold uppercase leading-tight tracking-tight  text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                    Make Your Event
                    <br />
                    Extra-ordindary
                </h2>





            </div>

            {/* Bottom gradient fade */}
        </section >
    );
}