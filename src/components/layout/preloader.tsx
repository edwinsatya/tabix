"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { useAtmosphere } from "@/components/providers/atmosphere";
import { site } from "@/content/site";

const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

/**
 * Plays once per browser session: a counter runs to 100 while the studio
 * name surfaces, then the whole panel lifts like a curtain.
 */
export function Preloader() {
  const { introDone, mode, set } = useAtmosphere();
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (introDone) return;
    const controls = animate(0, 100, {
      duration: mode === "still" ? 0.5 : 2.1,
      ease: [0.65, 0, 0.35, 1],
      delay: 0.2,
      onUpdate: (value) => {
        if (counter.current) counter.current.textContent = String(Math.round(value)).padStart(3, "0");
        if (bar.current) bar.current.style.transform = `scaleX(${value / 100})`;
      },
      onComplete: () => set({ introDone: true }),
    });
    return () => controls.stop();
  }, [introDone, mode, set]);

  const letters = site.name.split("");

  return (
    <AnimatePresence>
      {!introDone && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          className="preloader fixed inset-0 z-[95] flex flex-col justify-between bg-ink-950 gutter py-8"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.15, ease: EASE_CURTAIN }}
        >
          <div className="flex items-start justify-between">
            <p className="eyebrow text-ash-400">{site.tagline}</p>
            <p className="eyebrow hidden text-ash-500 sm:block">{site.location.coords}</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <motion.p
              className="eyebrow mb-6 text-ash-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Index — 2026
            </motion.p>
            <h1 aria-label={site.name} className="font-display text-[clamp(2.6rem,8vw,7rem)] font-light leading-none tracking-[0.04em] text-bone-50">
              {letters.map((letter, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.045 }}
                  >
                    {letter === " " ? " " : letter}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="mt-5 font-serif text-lg italic text-ash-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {site.role}
            </motion.p>
          </div>

          <div>
            <div className="flex items-end justify-between">
              <span
                ref={counter}
                className="font-display text-[clamp(4rem,14vw,12rem)] font-light leading-[0.8] tabular-nums text-bone-100"
              >
                000
              </span>
              <span className="eyebrow pb-2 text-ash-500">Preparing the studio</span>
            </div>
            <div className="mt-6 h-px w-full bg-line">
              <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-bone-100" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
