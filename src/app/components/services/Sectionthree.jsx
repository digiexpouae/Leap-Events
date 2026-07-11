"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
    y: "-20%",
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
      duration: 3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants = {
  hidden: { y: "50%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroEventsSection() {
  return (
    <section className="relative w-full bg-[#0a1438] overflow-hidden py-19 md:py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto leading-[1.1]">
        {/* Row 1: WE */}
        <div className="overflow-hidden">
          <motion.div
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="text-white font-bold uppercase  tracking-tight will-change-transform"
            style={{
              fontSize: "clamp(3rem, 13vw,  9rem)",
              letterSpacing: "-0.04em",
            }}
          >
            WE
          </motion.div>
        </div>

        {/* Row 2: BRING + wide image */}
        <div className="flex items-start md:items-end gap-4 md:gap-8 ">
          <div className="overflow-hidden">
            <motion.div
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-white font-bold uppercase  leading-[1.2] tracking-tight will-change-transform"
              style={{
                fontSize: "clamp(3rem, 12vw,  9rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Build 
            </motion.div>
          </div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1 max-w-[55%] h-16 lg:h-32 rounded overflow-hidden will-change-transform shadow-2xl mb-4"
          >
            <Image
              src="/assets/service-1.jpg"
              alt="Al Zorah Winter Garden event"
              className="w-full h-full object-cover"
              height={32}
              width={200}
            />
          </motion.div>
        </div>

        {/* Row 3: EVENTS + "12 years of experience" */}
        <div className="flex  flex-col md:flex-row  md:items-end   md:gap-8  w-full ">
          <div className="overflow-hidden  order-2 md:order-1  ">
            
            <motion.div
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-[#5b8bf5] font-bold uppercase tracking-tight will-change-transform"
              style={{
                fontSize: "clamp(2.5rem, 12vw,  9rem)",
                letterSpacing: "-0.04em",
              }}
            >
              meaningful 
            </motion.div>
          </div>

          <motion.div
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className=" md:block text-white/80 text-sm  order-1 md:order-2  lg:text-base leading-tight  text-right md:text-center lg:pb-10"
          >
            <p>12 years</p>
            <p>of experience</p>
          </motion.div>
        </div>

        {/* Row 4: TO LIFE */}
        <div className="relative overflow-hidden ">
          <motion.div
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="text-white font-bold uppercase  tracking-tight will-change-transform"
            style={{
              fontSize: "clamp(2.5rem, 12vw, 9rem)",
              letterSpacing: "-0.04em",
            }}
          >
            experiences
          </motion.div>
              {/* <div className="absolute inset-0 z-10 "> */}
        <motion.div
          variants={rowVariants_Two}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="w-1/3 flex justify-center "
        >
          <div className="w-48 md:w-72 h-16 md:h-44 rounded-2xl  overflow-hidden shadow-2xl">
          <Image
            src="/assets/service-2.jpg"
            width={164}
            height={164}
            alt="Gaming event"
            className="w-full h-full object-cover"
          />
         </div>
        </motion.div>
        {/* </div> */}
        </div>

        {/* Bottom image */}
    
      </div>
    </section>
  );
}