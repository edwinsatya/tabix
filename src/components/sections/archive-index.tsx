"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { archive } from "@/content/projects";
import { site } from "@/content/site";
import { useFinePointer } from "@/lib/hooks";

/**
 * A plain index of smaller projects. On desktop a preview card trails the
 * cursor and leans in the direction of travel.
 */
export function ArchiveIndex() {
  const fine = useFinePointer();
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 160, damping: 22, mass: 0.5 });
  const rotate = useTransform(useVelocity(sx), [-1500, 1500], [-10, 10], { clamp: true });
  const behance = site.socials.find((s) => s.label === "Behance")?.href ?? "#";

  return (
    <section aria-labelledby="archive-title" className="relative gutter pb-28 md:pb-40">
      <div className="mb-8 flex items-end justify-between border-b border-line pb-5">
        <h2 id="archive-title" className="eyebrow text-ash-400">
          Index — more work
        </h2>
        <p className="eyebrow text-[10px] text-ash-500">{archive.length} entries</p>
      </div>

      <ul
        onPointerMove={(event) => {
          x.set(event.clientX);
          y.set(event.clientY);
        }}
        onPointerLeave={() => setActive(null)}
      >
        {archive.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={i * 0.05} y={16}>
              <a
                href={behance}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                onPointerEnter={() => setActive(i)}
                className="group relative grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-b border-line py-6 md:grid-cols-[6rem_1fr_1fr_auto] md:py-8"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone-50/[0.03] transition-transform duration-500 ease-out group-hover:scale-y-100" />
                <span className="relative font-mono text-[11px] text-ash-500 transition-colors group-hover:text-signal">{item.year}</span>
                <span className="relative font-serif text-2xl text-bone-100 transition-transform duration-500 ease-out group-hover:translate-x-3 md:text-4xl">
                  {item.title}
                </span>
                <span className="relative hidden text-sm text-ash-400 md:block">{item.type}</span>
                <span className="relative font-mono text-sm text-ash-400 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone-50">
                  ↗
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>

      {fine && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 h-[300px] w-[240px] -translate-x-1/2 -translate-y-1/2"
          style={{ x: sx, y: sy, rotate }}
        >
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                className="absolute inset-0 overflow-hidden border border-line-strong bg-ink-800 p-1.5 shadow-2xl"
                initial={{ opacity: 0, scale: 0.85, clipPath: "inset(50% 0% 50% 0%)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image src={archive[active].image} alt="" fill sizes="240px" className="object-cover grayscale" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
