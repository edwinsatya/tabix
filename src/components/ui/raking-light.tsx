"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useAtmosphere } from "@/components/providers/atmosphere";
import { useFinePointer } from "@/lib/hooks";

/**
 * A soft beam of light that trails the cursor across the whole page — the
 * "raking light" a painter uses to reveal surface texture.
 */
export function RakingLight() {
  const { light } = useAtmosphere();
  const fine = useFinePointer();

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 90, damping: 22 });
  const sy = useSpring(y, { stiffness: 90, damping: 22 });
  const background = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgb(255 255 255 / 0.055), transparent 70%)`;

  useEffect(() => {
    if (!fine || !light) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, light, x, y]);

  if (!fine) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55]"
      style={{ background }}
      animate={{ opacity: light ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    />
  );
}
