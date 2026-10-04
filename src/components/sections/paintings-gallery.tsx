"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ArtImage } from "@/components/ui/art-image";
import { Reveal, SplitText } from "@/components/ui/reveal";
import { LiveDot } from "@/components/ui/tilt-frame";
import { paintings, type Painting } from "@/content/paintings";
import { useMediaQuery } from "@/lib/hooks";
import { Lightbox } from "./lightbox";

function PaintingCard({ painting, index, onOpen }: { painting: Painting; index: number; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="Enlarge"
      className="group block shrink-0 snap-center text-left"
      aria-label={`Open ${painting.title}, ${painting.year}`}
    >
      <div
        className="relative h-[min(46vh,500px)] max-w-[82vw] border border-line bg-ink-800 p-2 transition-transform duration-700 ease-out group-hover:-translate-y-2 md:p-2.5"
        style={{ aspectRatio: painting.ratio }}
      >
        <ArtImage
          src={painting.image}
          alt={`${painting.title}, ${painting.year}`}
          sizes="(min-width: 768px) 40vw, 80vw"
          reveal={false}
          className="h-full w-full"
          imageClassName="group-hover:scale-[1.04]"
        />
        <span className="eyebrow absolute left-4 top-4 border border-line bg-ink-950/80 px-2 py-1 text-[9px] text-ash-300 backdrop-blur-sm md:left-5 md:top-5">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow text-[9px] text-ash-500">
            {painting.catalog} · {painting.year}
          </p>
          <p className="mt-2 font-serif text-xl text-bone-100 transition-colors group-hover:text-bone-50">{painting.title}</p>
          <p className="mt-1 text-xs text-ash-400">{painting.medium}</p>
        </div>
        <p className="eyebrow flex shrink-0 items-center gap-2 pt-0.5 text-[9px] text-ash-400">
          {painting.status === "Available" && <LiveDot />}
          {painting.status}
        </p>
      </div>
    </button>
  );
}

/**
 * Desktop: the section pins and vertical scrolling drives the paintings
 * sideways. Touch / narrow screens: a native swipeable row.
 */
export function PaintingsGallery() {
  const desktop = useMediaQuery("(min-width: 768px)");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !desktop) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    // ResizeObserver also fires once immediately on observe().
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCurrent(Math.min(paintings.length - 1, Math.round(latest * (paintings.length - 1))));
  });

  const close = useCallback(() => setOpen(null), []);

  return (
    <section
      id="paintings"
      ref={sectionRef}
      className="relative bg-ink-900"
      style={desktop && distance ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="relative overflow-hidden md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:pb-16 md:pt-10">
        {/* Ghost word drifting behind the work */}
        <motion.p
          aria-hidden
          className="pointer-events-none absolute bottom-[6%] left-0 hidden select-none whitespace-nowrap font-display text-[22vw] font-light italic leading-none text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.05)] md:block"
          style={{ x: ghostX }}
        >
          Repertory · Pigment · Weather
        </motion.p>

        <div className="relative gutter flex flex-col gap-6 pt-28 md:flex-row md:items-end md:justify-between md:pt-0">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 text-ash-400">(02) — Chronology of form</p>
            </Reveal>
            <SplitText
              as="h2"
              text="Curated Repertory (2019—2026)"
              className="font-serif text-[clamp(2.4rem,5.2vw,4.6rem)] leading-[1.02] tracking-[-0.02em] text-bone-50"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="eyebrow flex items-center gap-2 text-[9px] text-signal md:whitespace-nowrap">
              <LiveDot /> {paintings.length} works · {desktop ? "scroll to travel · click to enlarge" : "swipe · tap to enlarge"}
            </p>
          </Reveal>
        </div>

        <motion.div
          ref={trackRef}
          className="relative mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto gutter pb-6 [scrollbar-width:none] md:mt-14 md:w-max md:snap-none md:gap-14 md:overflow-visible md:pb-0"
          style={desktop ? { x } : undefined}
          data-lenis-prevent-horizontal
        >
          {paintings.map((painting, i) => (
            <PaintingCard key={painting.id} painting={painting} index={i} onOpen={() => setOpen(i)} />
          ))}
          <div aria-hidden className="hidden w-[10vw] shrink-0 md:block" />
        </motion.div>

        {/* Progress */}
        <div className="gutter mt-10 hidden items-center gap-6 md:flex">
          <span className="eyebrow tabular-nums text-[10px] text-bone-100">{String(current + 1).padStart(2, "0")}</span>
          <div className="h-px flex-1 bg-line-strong">
            <motion.div className="h-px origin-left bg-bone-100" style={{ scaleX: scrollYProgress }} />
          </div>
          <span className="eyebrow tabular-nums text-[10px] text-ash-500">{String(paintings.length).padStart(2, "0")}</span>
        </div>
        <div className="h-24 md:hidden" />
      </div>

      <Lightbox paintings={paintings} index={open} onClose={close} onIndexChange={setOpen} />
    </section>
  );
}
