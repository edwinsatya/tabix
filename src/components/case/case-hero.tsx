"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useAtmosphere } from "@/components/providers/atmosphere";
import { EASE_OUT_EXPO, SplitText } from "@/components/ui/reveal";
import { LiveDot } from "@/components/ui/tilt-frame";
import type { Project } from "@/content/projects";

export function CaseHero({ project }: { project: Project }) {
  const { introDone } = useAtmosphere();
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <header className="relative pt-32 md:pt-40">
      <div className="gutter">
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Link href="/#work" className="group eyebrow flex items-center gap-3 text-[10px] text-ash-300 hover:text-bone-50">
            <span className="transition-transform duration-500 group-hover:-translate-x-1">←</span> Index / Selected work
          </Link>
          <p className="eyebrow flex items-center gap-2 text-[10px] text-signal">
            <LiveDot /> {project.status}
          </p>
        </motion.div>

        <p className="eyebrow mt-14 text-[10px] text-ash-500">
          Case {project.index} / {project.category} — {project.year}
        </p>

        <h1 className="mt-6">
          <SplitText
            text={project.title}
            play={introDone}
            delay={0.25}
            className="block font-display text-[clamp(3.8rem,12vw,11rem)] font-light leading-[0.92] tracking-[-0.01em] text-bone-50"
          />
          <SplitText
            text={project.headline}
            play={introDone}
            delay={0.45}
            stagger={0.04}
            className="mt-3 block font-serif text-[clamp(1.6rem,3.6vw,3.2rem)] italic leading-tight text-ash-300"
          />
        </h1>

        <motion.div
          className="mt-14 grid gap-10 border-t border-line pt-8 lg:grid-cols-12"
          initial={{ opacity: 0, y: 24 }}
          animate={introDone ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.8 }}
        >
          <p className="text-[15px] leading-relaxed text-bone-200 lg:col-span-5">{project.summary}</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {project.meta.map((row) => (
              <div key={row.label}>
                <dt className="eyebrow text-[9px] text-ash-500">{row.label}</dt>
                <dd className="mt-2 text-[13px] text-bone-100">{row.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <motion.div
        ref={coverRef}
        className="relative mt-16 aspect-[16/10] overflow-hidden md:mt-24 md:aspect-[21/9]"
        initial={{ clipPath: "inset(18% 8% 18% 8%)" }}
        animate={introDone ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay: 0.9 }}
      >
        <motion.div className="absolute inset-0" style={{ scale, y }}>
          <Image
            src={project.cover}
            alt={`${project.title} — ${project.headline}`}
            fill
            preload
            sizes="100vw"
            className="object-cover grayscale contrast-[1.08]"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-0 shadow-[inset_0_0_160px_rgb(0_0_0/0.7)]" />
      </motion.div>
    </header>
  );
}
