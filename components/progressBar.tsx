"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="progress-bar z-50 bg-gradient-to-l from-blue-400 to-purple-600"
      style={{ scaleX }}
    ></motion.div>
  );
}
