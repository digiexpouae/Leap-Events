"use client"
import { motion } from "framer-motion";

const FadeUp = ({
  children,
  duration = 1,
  delay = 0,
  amount=0.5,
  y = 50,
  once = true,
  style = {},
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once,amount }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;