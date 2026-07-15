"use client"
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { motion } from 'framer-motion'
export default function CorporateEvents() {
    const container = useRef()
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const cards = gsap.utils.toArray(".child")
        gsap.set(cards, {
            position: "absolute",
            top: 0, left: 0, right: 0,
            y: "200%"  // all hidden below
        }); gsap.set(cards[0], { y: "0%", });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                pin: true,
                scrub: 2,
                pinSpacing: true,   // ✅ holds scroll space so animation completes
                start: "top top",
                end: `+=${cards.length * 600}`, // 600px
  refreshPriority: -1,  // ← calculate after Scene's ScrollTrigger

            }
        })
        cards.forEach((card, i) => {
            // current card slides UP and out
            const isLast = i === cards.length - 1;
            // next card slides IN first in timeline
            if (cards[i + 1]) {
                tl.to(cards[i + 1], {
                    y: "0%",
                    duration: 1,
                });
            }

            // current card exits AT SAME TIME as next enters — skip last
            if (!isLast) {
                tl.to(card, {
                    y: "-100%",
                }, "<+0.2"); // ← exits together with next card entering
            }
            else {
                tl.to(card, {
                    duration: 0.5
                })
            }


            // current card slides OUT — skip only the last

        });


    })
    const data = [
   
    { title: 'Cultural events ', image: "/assets/ev-1.webp" },

    { title: 'Community events ', image: "/assets/ferjan-services.jpeg", }
        ,

          { title: 'Mall activation ', image: "/assets/ev-3.webp" },
    {title:"Exhibition Stall",image:"/assets/ev-6.webp"},
        {title:"Educational Events ",    image: "/assets/university-services.jpeg",},
            {title:"Road Shows ",image:"/assets/ev-5.webp"},


    ]
    return (

        <section
            className="relative flex flex-col justify-between w-full h-screen overflow-hidden bg-[var(--color-bg-secondary)]"
            ref={container}
        >
            < div
                className="w-full px-5 sm:px-8 lg:px-12 py-10 sm:py-14"
            >
                <div className="mx-auto max-w-7xl text-white flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 pt-10 justify-between">
                    <motion.h3
                        className="font-bold uppercase text-white text-[clamp(1.8rem,5vw,3rem)] shrink-0"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}

                    >
                        What We Do
                    </motion.h3>
                    <motion.p
                        className="text-base tracking-tighter sm:text-3xl "
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}



                    >
                        Crafting More Than Events
                    </motion.p>
                </div>
            </div >
            {/* This box is the visible 50vh window */}
            <div
                className="relative w-full h-2/3 overflow-hidden translate-y-1/5 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"
            // ✅ overflow-hidden only on inner box — clips cards cleanly
            >
                {data.map((elem, index) => (
                    <EventCard key={index} title={elem.title} image={elem.image} />
                ))}
            </div>
        </section>
    );
}

function EventCard({
    title,
    image,
    placeholder,
}) {




    return (
        <div
            className="child  relative w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-10 px-6 sm:px-10 py-4  rounded-2xl overflow-hidden hover:brightness-110"


        >
            {/* Subtle inner glow on hover */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"

            />

            {/* ── Title ── */}
            <motion.h3
                className="relative z-10 font-bold max-w-[290px] uppercase text-white leading-tight shrink-0 text-[clamp(1.1rem,4vw,2rem)]"
                style={{ letterSpacing: "0.03em",}}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                {title}
            </motion.h3>

            {/* ── Image ── */}
            <motion.div
                className="relative z-10 w-full sm:w-[48%] md:w-[42%] lg:w-[38%] shrink-0 overflow-hidden rounded-xl"
                style={{ aspectRatio: "16/9" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >

      
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-[center_top] transition-transform duration-500 group-hover:scale-105"
                />


                {/* Warm golden overlay hint — mimics the event lighting in the design */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at 65% 50%, rgba(200,140,60,0.18) 0%, transparent 65%)",
                    }}
                />
            </motion.div>
        </div >
    );
}