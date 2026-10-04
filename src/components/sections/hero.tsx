"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useAtmosphere } from "@/components/providers/atmosphere";
import { EASE_OUT_EXPO } from "@/components/ui/reveal";
import { FrameTag, LiveDot } from "@/components/ui/tilt-frame";
import { site } from "@/content/site";
import { useFinePointer } from "@/lib/hooks";

// Character offset of each title word, so the letters stagger as one line.
const wordStarts = site.heroTitle.map((_, i) =>
  site.heroTitle.slice(0, i).reduce((sum, word) => sum + word.length, 0),
);

function TitleWord({ word, start, play }: { word: string; start: number; play: boolean }) {
  const isAmpersand = word === "&";
  return (
    <span
      aria-hidden
      className={
        isAmpersand
          ? "mx-[0.12em] inline-block font-serif text-[0.62em] font-normal italic text-ash-300"
          : "inline-block"
      }
    >
      {word.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "105%", opacity: 0, filter: "blur(14px)" }}
            animate={play ? { y: "0%", opacity: 1, filter: "blur(0px)" } : undefined}
            transition={{ duration: 1.6, ease: EASE_OUT_EXPO, delay: 0.35 + (start + i) * 0.055 }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const { introDone, light, intensity } = useAtmosphere();
  const fine = useFinePointer();
  const ref = useRef<HTMLElement>(null);

  // Scroll: the painting sinks and swells, the text lifts away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.28]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Pointer: raking light + a hint of depth on the painting.
  const px = useMotionValue(50);
  const py = useMotionValue(42);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const beam = useMotionTemplate`radial-gradient(34% 46% at ${sx}% ${sy}%, rgb(255 255 255 / 0.5), rgb(255 255 255 / 0.08) 45%, transparent 75%)`;
  const shiftX = useTransform(sx, [0, 100], [14 * intensity, -14 * intensity]);
  const shiftY = useTransform(sy, [0, 100], [10 * intensity, -10 * intensity]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink-950"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        px.set(((event.clientX - rect.left) / rect.width) * 100);
        py.set(((event.clientY - rect.top) / rect.height) * 100);
      }}
    >
      {/* Painting */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <motion.div className="absolute -inset-[4%]" style={{ x: shiftX, y: shiftY }}>
          <motion.div
            className="absolute inset-0"
            animate={intensity ? { scale: [1, 1.06, 1], rotate: [0, 0.6, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 28 / Math.max(intensity, 0.5), repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={site.heroImage}
              alt=""
              fill
              preload
              sizes="100vw"
              className="object-cover opacity-55 brightness-75 contrast-125 grayscale"
            />
          </motion.div>
        </motion.div>

        {/* Raking light reveals the surface texture */}
        <motion.div
          aria-hidden
          className="absolute inset-0 mix-blend-overlay"
          style={{ background: beam }}
          animate={{ opacity: light && fine ? 1 : 0.35 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* Atmosphere: vignette + fades into the page */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_30%,rgb(6_7_9/0.85)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink-950/90 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />

      <motion.div
        className="relative z-10 flex h-full flex-col gutter pt-24 pb-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Meta row */}
        <motion.div
          className="flex items-start justify-between gap-6"
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : undefined}
          transition={{ duration: 1.2, delay: 1.1 }}
        >
          <p className="eyebrow flex items-center gap-2 text-[10px] text-ash-400">
            <span className="h-1 w-1 rounded-full bg-ash-300" />
            {site.location.coords}
          </p>
          <p className="eyebrow hidden text-right text-[10px] leading-relaxed text-ash-400 sm:block">
            Tactile interfaces / monochrome weather
            <br />
            <span className="text-ash-500">Portfolio · Vol. 2026</span>
          </p>
        </motion.div>

        {/* Title block */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.p
            className="eyebrow mb-8 text-[9px] tracking-[0.24em] text-ash-300 sm:text-[10px] sm:tracking-[0.42em] md:text-[11px]"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={introDone ? { opacity: 1, filter: "blur(0px)" } : undefined}
            transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
          >
            {site.tagline}
          </motion.p>

          <h1
            aria-label={site.heroTitle.join(" ")}
            className="font-display text-[clamp(3.6rem,13.5vw,12.5rem)] font-light leading-[0.9] tracking-[0.02em] text-bone-50"
          >
            {site.heroTitle.map((word, w) => (
              <span key={w}>
                <TitleWord word={word} start={wordStarts[w]} play={introDone} />
                {w < site.heroTitle.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-[34rem] text-sm leading-relaxed text-ash-300 md:text-[15px]"
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 1.05 }}
          >
            <span className="text-bone-100">{site.name}</span> — {site.role}. {site.heroIntro}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 1.25 }}
          >
            <FrameTag className="bg-ink-950/50">
              {fine ? "Move your cursor to rake the light" : "Scroll slowly — it's made of layers"}
            </FrameTag>
            {site.availability.open && (
              <FrameTag className="border-signal/30 bg-signal/5 text-signal">
                <LiveDot />
                {site.availability.label}
              </FrameTag>
            )}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#work"
          className="mx-auto flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 1.7 }}
        >
          <span className="eyebrow text-[9px] text-ash-400">Descend into the work</span>
          <span className="relative h-12 w-px overflow-hidden bg-line">
            <span className="motion-safe-only absolute inset-0 bg-bone-100 animate-scroll-line" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
