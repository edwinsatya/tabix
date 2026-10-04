"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal, SplitText, EASE_OUT_EXPO } from "@/components/ui/reveal";
import { LiveDot } from "@/components/ui/tilt-frame";
import { site } from "@/content/site";
import { useClock } from "@/lib/hooks";

const year = new Date().getFullYear();

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(site.email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${site.email}`;
        }
      }}
      className="group flex items-center gap-3 text-left"
    >
      <span className="text-[15px] text-bone-100 underline decoration-line-strong underline-offset-[6px] transition-colors group-hover:decoration-bone-100">
        {site.email}
      </span>
      <span className="eyebrow text-[9px] text-ash-500 transition-colors group-hover:text-signal" aria-live="polite">
        {copied ? "Copied ✓" : "Copy"}
      </span>
    </button>
  );
}

export function Contact() {
  const lenis = useLenis();
  const time = useClock(site.location.timeZone);

  return (
    <section id="contact" className="relative overflow-hidden bg-ink-950 pt-28 md:pt-40">
      <div className="gutter">
        <Reveal>
          <p className="eyebrow text-ash-400">(05) — Correspondence</p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SplitText
              as="h2"
              text="Enter the Studio."
              className="font-serif text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.95] tracking-[-0.03em] text-bone-50"
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-ash-300 md:text-[15px]">
                Product briefs, painting commissions, studio visits and exhibition loans are all handled personally. Expect a
                reply within two working days.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("A new project")}`}
                className="group relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-line-strong md:h-52 md:w-52"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-bone-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative flex flex-col items-center gap-2 text-center transition-colors duration-500 group-hover:text-ink-950">
                  <span className="font-serif text-2xl italic">Start a project</span>
                  <span className="text-lg transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 border-y border-line py-10 md:grid-cols-3">
          <Reveal>
            <p className="eyebrow mb-4 text-[9px] text-ash-500">Direct channel</p>
            <CopyEmail />
            {site.availability.open && (
              <p className="eyebrow mt-4 flex items-center gap-2 text-[9px] text-signal">
                <LiveDot /> {site.availability.label}
              </p>
            )}
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow mb-4 text-[9px] text-ash-500">Elsewhere</p>
            <ul className="space-y-2">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer" className="group flex items-baseline justify-between gap-4 text-sm">
                    <span className="text-bone-100">{social.label}</span>
                    <span className="flex-1 border-b border-dotted border-line-strong" />
                    <span className="text-ash-400 transition-colors group-hover:text-bone-50">{social.handle} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="eyebrow mb-4 text-[9px] text-ash-500">Catalogue & CV</p>
            <a href={site.resume.href} className="group inline-flex items-center gap-3 text-[15px] text-bone-100">
              {site.resume.label}
              <span className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
            </a>
            <p className="mt-3 text-xs text-ash-400">
              {site.location.city}, {site.location.country} · working worldwide
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4 py-8 pb-32 md:flex-row md:items-center md:justify-between md:pb-28">
          <p className="eyebrow text-[9px] text-ash-500" suppressHydrationWarning>
            © {year} {site.name} · Interface & monochromatic paint
          </p>
          <p className="eyebrow text-[9px] text-ash-500">
            Rendered in {site.location.city} · <span className="tabular-nums text-ash-300">{time}</span> {site.location.tzLabel}
          </p>
          <button
            type="button"
            onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2.2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
            className="eyebrow text-left text-[9px] text-ash-300 transition-colors hover:text-bone-50"
          >
            Back to top ↑
          </button>
        </div>
      </div>

      {/* Oversized signature */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <motion.p
          className="-mb-[0.18em] whitespace-nowrap text-center font-display text-[16.5vw] font-light leading-none tracking-[-0.02em] text-bone-50/[0.06]"
          initial={{ y: "40%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
        >
          {site.name}
        </motion.p>
      </div>
    </section>
  );
}
