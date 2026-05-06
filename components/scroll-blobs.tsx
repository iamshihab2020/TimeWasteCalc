"use client";
import { motion, useScroll, useTransform } from "motion/react";

export function ScrollBlobs() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden>
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute -top-40 -left-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-40 dark:opacity-[0.12]"
      >
        <div className="w-full h-full rounded-full" style={{ background: "var(--accent-sun)" }} />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[40%] -right-40 w-[480px] h-[480px] rounded-full blur-3xl opacity-25 dark:opacity-[0.08]"
      >
        <div className="w-full h-full rounded-full" style={{ background: "var(--accent-leaf)" }} />
      </motion.div>
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-[-180px] left-[30%] w-[460px] h-[460px] rounded-full blur-3xl opacity-25 dark:opacity-[0.08]"
      >
        <div className="w-full h-full rounded-full" style={{ background: "var(--accent-cool)" }} />
      </motion.div>
    </div>
  );
}
