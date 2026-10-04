"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { chronology, type ChronologyItem } from "@/content/practice";
import { cn } from "@/lib/cn";

const filters = ["All", "Design", "Painting", "Award"] as const;
type Filter = (typeof filters)[number];

export function Chronology() {
  const [filter, setFilter] = useState<Filter>("All");
  const items = chronology.filter((item) => filter === "All" || item.kind === filter);
  const count = (f: Filter) => (f === "All" ? chronology.length : chronology.filter((i) => i.kind === f).length);

  return (
    <section id="chronology" className="relative gutter py-28 md:py-40">
      <SectionHeading
        index="04"
        eyebrow="Chronology"
        title="Studios, walls & residencies"
        aside={
          <div role="group" aria-label="Filter chronology" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300",
                  filter === f ? "border-bone-100 text-ink-950" : "border-line-strong text-ash-300 hover:text-bone-50",
                )}
              >
                {filter === f && (
                  <motion.span layoutId="chronology-filter" className="absolute inset-0 rounded-full bg-bone-100" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                <span className="relative">
                  {f} <sup className="text-[8px] opacity-60">{count(f)}</sup>
                </span>
              </button>
            ))}
          </div>
        }
      />

      <LayoutGroup>
        <motion.ul layout className="mt-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => (
              <Row key={`${item.period}-${item.title}`} item={item} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </section>
  );
}

function Row({ item }: { item: ChronologyItem }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative grid grid-cols-1 gap-2 border-b border-line py-7 md:grid-cols-[180px_1fr_1fr_120px] md:items-baseline md:gap-6"
    >
      <span aria-hidden className="absolute inset-0 -z-0 origin-left scale-x-0 bg-gradient-to-r from-bone-50/[0.045] to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100" />
      <span className="relative font-mono text-[11px] tabular-nums text-ash-400">{item.period}</span>
      <span className="relative font-serif text-2xl text-bone-100 transition-transform duration-500 group-hover:translate-x-2 md:text-[28px]">{item.title}</span>
      <span className="relative text-sm text-ash-400">{item.place}</span>
      <span className="relative md:text-right">
        <span
          className={cn(
            "eyebrow inline-flex items-center gap-2 border px-2 py-1 text-[9px]",
            item.kind === "Design" && "border-line-strong text-ash-300",
            item.kind === "Painting" && "border-bone-200/30 text-bone-200",
            item.kind === "Award" && "border-signal/40 text-signal",
          )}
        >
          {item.kind}
        </span>
      </span>
    </motion.li>
  );
}
