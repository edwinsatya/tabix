"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { philosophy } from "@/content/practice";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, ["blur(6px)", "blur(0px)"]);
  return (
    <motion.span className="inline-block" style={{ opacity, filter: blur }}>
      {word}
    </motion.span>
  );
}

/** The quote surfaces word by word, driven directly by the scroll position. */
export function Philosophy() {
  const ref = useRef<HTMLQuoteElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = `“${philosophy.quote}”`.split(" ");

  return (
    <section aria-label="Philosophy" className="relative overflow-hidden border-y border-line bg-ink-900 gutter py-32 md:py-48">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-full w-[70vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(255_255_255/0.04),transparent)]" />

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="eyebrow text-[10px] text-ash-500">{philosophy.eyebrow}</p>
        </Reveal>

        <blockquote
          ref={ref}
          className="mt-12 font-serif text-[clamp(1.9rem,4.4vw,3.6rem)] italic leading-[1.22] tracking-[-0.01em] text-bone-50"
        >
          <span className="sr-only">{philosophy.quote}</span>
          <span aria-hidden>
            {words.map((word, i) => (
              <span key={i}>
                <Word word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />{" "}
              </span>
            ))}
          </span>
        </blockquote>

        <Reveal className="mx-auto mt-14 h-px w-16 bg-line-strong" />

        <div className="mx-auto mt-14 grid max-w-2xl gap-10 sm:grid-cols-2">
          {philosophy.columns.map((column, i) => (
            <Reveal key={column.label} delay={i * 0.1}>
              <p className="eyebrow text-[9px] text-ash-500">{column.label}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-bone-200">
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
