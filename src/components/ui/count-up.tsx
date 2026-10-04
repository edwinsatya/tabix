"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import type { Metric } from "@/content/projects";

function format(value: number, decimals = 0) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Counts a number up from zero the first time it scrolls into view. */
export function CountUp({ metric, className }: { metric: Metric; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const { value, prefix = "", suffix = "", decimals = 0 } = metric;

  // The server renders the final number (good for no-JS and SEO); once
  // hydrated, reset to zero so the count-up starts from the bottom.
  useEffect(() => {
    if (ref.current) ref.current.textContent = `${prefix}${format(0, decimals)}${suffix}`;
  }, [prefix, suffix, decimals]);

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${format(latest, decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {`${prefix}${format(value, decimals)}${suffix}`}
    </span>
  );
}
