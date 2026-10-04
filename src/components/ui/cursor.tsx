"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useFinePointer } from "@/lib/hooks";
import { cn } from "@/lib/cn";

type CursorState = { label: string | null; active: boolean; visible: boolean };

/**
 * A two-part cursor: a precise dot plus a lagging ring. Elements can set
 * `data-cursor="View"` to morph the ring into a labelled disc.
 */
export function Cursor() {
  const fine = useFinePointer();
  const [state, setState] = useState<CursorState>({ label: null, active: false, visible: false });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!fine) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setState((s) => (s.visible ? s : { ...s, visible: true }));
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, [role='button'], input, label, summary");
      const label = labelled?.dataset.cursor || null;
      const active = Boolean(interactive || labelled);
      setState((s) => (s.label === label && s.active === active ? s : { ...s, label, active }));
    };

    const onLeave = () => setState((s) => ({ ...s, visible: false }));

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  const size = state.label ? 92 : state.active ? 52 : 30;

  return (
    <div aria-hidden className={cn("pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300", state.visible ? "opacity-100" : "opacity-0")}>
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className={cn(
            "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border",
            state.label
              ? "border-transparent bg-bone-100 text-ink-950"
              : "border-bone-100/40 bg-transparent",
          )}
          animate={{ width: size, height: size }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          <AnimatePresence>
            {state.label && (
              <motion.span
                key={state.label}
                className="eyebrow text-[10px] tracking-[0.18em]"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
              >
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <div
          className={cn(
            "-translate-x-1/2 -translate-y-1/2 rounded-full bg-bone-50 mix-blend-difference transition-[width,height,opacity] duration-200",
            state.label ? "h-0 w-0 opacity-0" : "h-[6px] w-[6px]",
          )}
        />
      </motion.div>
    </div>
  );
}
