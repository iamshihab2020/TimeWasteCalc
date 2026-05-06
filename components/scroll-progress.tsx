"use client";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import type { Tone } from "@/lib/tone";

export function ScrollProgress({ tone }: { tone: Tone }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const color = useTransform(scrollYProgress, [0, 0.5, 1], [
    tone === "kind" ? "#FFD43B" : "#FFD43B",
    tone === "kind" ? "#5BC57A" : "#FF4D3D",
    tone === "kind" ? "#3DA5FF" : "#FF4D3D",
  ]);
  return (
    <motion.div
      style={{
        scaleX,
        background: color,
        transformOrigin: "0% 50%",
      }}
      className="fixed top-0 inset-x-0 h-[3px] z-40 pointer-events-none"
      aria-hidden
    />
  );
}
