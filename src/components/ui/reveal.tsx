"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/cn";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts its children into place when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 1.1,
}: {
  children?: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

type SplitTag = "h1" | "h2" | "h3" | "p" | "span" | "div" | "blockquote";

/**
 * Splits text into words that rise out of a mask, one after another.
 * Screen readers get the plain sentence.
 */
export function SplitText({
  text,
  as: Tag = "span",
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  duration = 1.15,
  play,
}: {
  text: string;
  as?: SplitTag;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Control playback manually; otherwise it plays when scrolled into view. */
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = play ?? inView;
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden>
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top">
              <motion.span
                className={cn("inline-block will-change-transform", wordClassName)}
                initial={{ y: "115%", rotate: 4 }}
                animate={show ? { y: "0%", rotate: 0 } : { y: "115%", rotate: 4 }}
                transition={{ duration, ease: EASE_OUT_EXPO, delay: delay + i * stagger }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
