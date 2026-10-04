"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useScrollLock } from "@/components/providers/atmosphere";
import { LiveDot } from "@/components/ui/tilt-frame";
import type { Painting } from "@/content/paintings";
import { site } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Lightbox({
  paintings,
  index,
  onClose,
  onIndexChange,
}: {
  paintings: Painting[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const painting = open ? paintings[index] : null;

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previouslyFocused?.focus();
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndexChange((index + 1) % paintings.length);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + paintings.length) % paintings.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onIndexChange, paintings.length]);

  return (
    <AnimatePresence>
      {painting && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={painting.title}
          className="fixed inset-0 z-[85] flex flex-col bg-ink-950/96 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          data-lenis-prevent
        >
          <div className="gutter flex h-[72px] shrink-0 items-center justify-between border-b border-line">
            <p className="eyebrow text-[10px] text-ash-400">
              Repertory · <span className="tabular-nums text-bone-100">{String(index + 1).padStart(2, "0")}</span> /{" "}
              {String(paintings.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="eyebrow flex items-center gap-3 text-[10px] text-ash-300 hover:text-bone-50"
            >
              Close <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-base">×</span>
            </button>
          </div>

          <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_380px]">
            <div className="relative min-h-[50vh] p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={painting.id}
                  className="relative h-full w-full"
                  initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Image
                    src={painting.image}
                    alt={`${painting.title}, ${painting.year} — ${painting.medium}`}
                    fill
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    className="object-contain grayscale"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <aside className="flex flex-col justify-between gap-10 border-t border-line p-6 md:p-10 lg:border-l lg:border-t-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={painting.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="eyebrow text-[10px] text-ash-500">Catalog {painting.catalog}</p>
                  <h3 className="mt-4 font-serif text-4xl leading-tight text-bone-50">{painting.title}</h3>
                  <p className="mt-5 font-serif text-base italic leading-relaxed text-ash-300">“{painting.note}”</p>
                  <dl className="mt-8 border-t border-line">
                    {[
                      ["Year", painting.year],
                      ["Medium", painting.medium],
                      ["Dimensions", painting.dimensions],
                    ].map(([label, value]) => (
                      <div key={label} className="grid grid-cols-[100px_1fr] gap-4 border-b border-line py-3">
                        <dt className="eyebrow pt-0.5 text-[9px] text-ash-500">{label}</dt>
                        <dd className="text-[13px] text-bone-200">{value}</dd>
                      </div>
                    ))}
                    <div className="grid grid-cols-[100px_1fr] gap-4 border-b border-line py-3">
                      <dt className="eyebrow pt-0.5 text-[9px] text-ash-500">Status</dt>
                      <dd className="flex items-center gap-2 text-[13px] text-bone-200">
                        {painting.status === "Available" && <LiveDot />}
                        {painting.status}
                      </dd>
                    </div>
                  </dl>
                </motion.div>
              </AnimatePresence>

              <div className="space-y-6">
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Enquiry — ${painting.title} (${painting.catalog})`)}`}
                  className="flex items-center justify-between border border-line-strong px-5 py-4 text-sm text-bone-100 transition-colors hover:border-bone-100 hover:bg-bone-100 hover:text-ink-950"
                >
                  Enquire about this work <span aria-hidden>→</span>
                </a>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onIndexChange((index - 1 + paintings.length) % paintings.length)}
                    className="eyebrow text-[10px] text-ash-400 hover:text-bone-50"
                  >
                    ← Previous
                  </button>
                  <span className="eyebrow text-[9px] text-ash-500">← → keys</span>
                  <button
                    type="button"
                    onClick={() => onIndexChange((index + 1) % paintings.length)}
                    className="eyebrow text-[10px] text-ash-400 hover:text-bone-50"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
