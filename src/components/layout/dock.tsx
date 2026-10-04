"use client";

import { motion } from "motion/react";
import { useAtmosphere } from "@/components/providers/atmosphere";
import type { MotionMode } from "@/lib/atmosphere-store";
import { cn } from "@/lib/cn";

const modes: { id: MotionMode; label: string; hint: string }[] = [
  { id: "drift", label: "Drift", hint: "Gentle motion" },
  { id: "storm", label: "Storm", hint: "More motion" },
  { id: "still", label: "Still", hint: "Reduced motion" },
];

/**
 * The floating control bar from the Figma: motion intensity, the raking
 * light, and a generated ambient drone.
 */
export function Dock() {
  const { mode, light, sound, introDone, set } = useAtmosphere();

  return (
    <motion.div
      className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 md:bottom-6"
      initial={{ y: 120, opacity: 0 }}
      animate={introDone ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: introDone ? 1.6 : 0 }}
    >
      <div
        role="toolbar"
        aria-label="Atmosphere controls"
        className="flex items-center gap-1 whitespace-nowrap rounded-full border border-line-strong bg-ink-900/75 p-1.5 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl"
      >
        <span className="eyebrow hidden pl-3 pr-1 text-[9px] text-ash-500 md:inline">Motion</span>
        <div className="flex items-center rounded-full bg-ink-950/60 p-0.5">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              title={m.hint}
              aria-pressed={mode === m.id}
              onClick={() => set({ mode: m.id })}
              className={cn(
                "relative rounded-full px-2.5 py-1.5 font-mono sm:px-3 text-[10px] uppercase tracking-[0.14em] transition-colors duration-300",
                mode === m.id ? "text-ink-950" : "text-ash-400 hover:text-bone-100",
              )}
            >
              {mode === m.id && (
                <motion.span
                  layoutId="dock-mode"
                  className="absolute inset-0 rounded-full bg-bone-100"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{m.label}</span>
            </button>
          ))}
        </div>

        <span aria-hidden className="mx-1 h-5 w-px bg-line-strong" />

        <button
          type="button"
          aria-pressed={light}
          onClick={() => set({ light: !light })}
          className="group flex items-center gap-2 rounded-full px-2.5 py-1.5 sm:px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ash-300 transition-colors hover:text-bone-50"
          title="Toggle raking light"
        >
          <span
            aria-hidden
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-500",
              light ? "bg-signal shadow-[0_0_10px_2px_rgb(95_227_161/0.6)]" : "bg-ash-500",
            )}
          />
          <span className="hidden sm:inline">Raking light</span>
          <span className="sr-only sm:hidden">Raking light</span>
        </button>

        <span aria-hidden className="mx-1 h-5 w-px bg-line-strong" />

        <button
          type="button"
          aria-pressed={sound}
          onClick={() => set({ sound: !sound })}
          className="flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ash-300 transition-colors hover:text-bone-50"
          title="Toggle ambient drone"
        >
          <span aria-hidden className="flex h-3 items-end gap-[2px]">
            {[0, 1, 2, 3].map((bar) => (
              <span
                key={bar}
                className={cn("block w-[2px] origin-bottom rounded-full bg-current", sound ? "h-3 animate-eq" : "h-[3px]")}
                style={sound ? { animationDelay: `${bar * 0.17}s`, animationDuration: `${0.9 + bar * 0.15}s` } : undefined}
              />
            ))}
          </span>
          <span className="hidden sm:inline">55Hz Drone</span>
          <span className="sr-only sm:hidden">Ambient drone</span>
        </button>
      </div>
    </motion.div>
  );
}
