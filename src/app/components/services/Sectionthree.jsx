"use client";

import { motion } from "framer-motion";

// Text rows: start at 50% down (only top half visible through mask), slide up to 0
const rowVariants = {
  hidden: { y: "50%" },
  visible: {
    y: "0%",
    transition: {
      duration: 3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rowVariants_Two = {
  hidden: { y: "20%" },
  visible: {
    y: "-10%",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeUpVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroEventsSection() {
  return (
    <section className="relative w-full bg-[#0a1438] overflow-hidden py-19 md:py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Row 1: WE */}
        <div className="overflow-hidden">
          <motion.div
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="text-white font-bold uppercase leading-[0.85] tracking-tight will-change-transform"
            style={{
              fontSize: "clamp(3.5rem, 13vw,  10rem)",
              letterSpacing: "-0.04em",
            }}
          >
            WE
          </motion.div>
        </div>

        {/* Row 2: BRING + wide image */}
        <div className="flex items-start md:items-end gap-4 md:gap-8 mt-2 md:mt-4">
          <div className="overflow-hidden">
            <motion.div
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-white font-bold uppercase leading-[0.85] tracking-tight will-change-transform"
              style={{
                fontSize: "clamp(3.5rem, 12vw,  10rem)",
                letterSpacing: "-0.04em",
              }}
            >
              BRING
            </motion.div>
          </div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="block flex-1 max-w-[55%] h-16 lg:h-32 rounded overflow-hidden shadow-2xl mb-4"
          >
            <img
              src="/assets/service-1.jpg"
              alt="Al Zorah Winter Garden event"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Row 3: EVENTS + "12 years of experience" */}
        <div className="flex items-end  gap-4 md:gap-8 mt-2 w-full md:mt-4">
          <div className="overflow-hidden w-[70%]">
            <motion.div
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-[#5b8bf5] font-bold uppercase leading-[0.85] tracking-tight will-change-transform"
              style={{
                fontSize: "clamp(3.5rem, 12vw,  10rem)",
                letterSpacing: "-0.04em",
              }}
            >
              EVENTS
            </motion.div>
          </div>

          <motion.div
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="block text-white/80 text-sm  w-[30%] lg:text-base leading-tight md:w-1/3 text-center pb-6 lg:pb-10"
          >
            <p>12 years</p>
            <p>of experience</p>
          </motion.div>
        </div>

        {/* Row 4: TO LIFE */}
        <div className="relative overflow-hidden mt-2 md:mt-4">
          <motion.div
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="text-white font-bold uppercase leading-[0.85] tracking-tight will-change-transform"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 10rem)",
              letterSpacing: "-0.04em",
            }}
          >
            TO LIFE
          </motion.div>
              {/* <div className="absolute inset-0 z-10 "> */}
        <motion.div
          variants={rowVariants_Two}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="w-48 md:w-64 h-16 md:h-36 rounded-2xl translate-x-30 overflow-hidden shadow-2xl"
        >
          <img
            src="/assets/service-2.jpg"
            alt="Gaming event"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* </div> */}
        </div>

        {/* Bottom image */}
    
      </div>
    </section>
  );
}