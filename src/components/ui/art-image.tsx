"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO } from "./reveal";

/**
 * The house image treatment: monochrome by default, colour on hover of the
 * nearest `.group`, an optional curtain reveal, and optional scroll parallax.
 */
export function ArtImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  parallax = 0,
  reveal = true,
  preload = false,
  colorOnHover = true,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Percentage the image drifts against the scroll (0 disables it). */
  parallax?: number;
  reveal?: boolean;
  preload?: boolean;
  colorOnHover?: boolean;
}) {
  // The observed element must not carry the clip-path itself: Chrome treats a
  // fully clipped target as never intersecting, so the reveal would not fire.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const scale = 1 + (parallax * 2.2) / 100;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 bg-ink-800"
        initial={reveal ? { clipPath: "inset(100% 0% 0% 0%)" } : false}
        animate={reveal && inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.5, ease: EASE_OUT_EXPO }}
      >
        <motion.div className="absolute inset-0" style={parallax ? { y, scale } : undefined}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            className={cn(
              "object-cover grayscale contrast-[1.08] transition-[filter,transform] duration-[1200ms] ease-out",
              colorOnHover && "group-hover:grayscale-0 group-hover:contrast-100",
              imageClassName,
            )}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
