"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useAtmosphere } from "@/components/providers/atmosphere";
import { cn } from "@/lib/cn";

/** Small mono tag pinned to the corner of a frame — straight from the Figma. */
export function FrameTag({ children, live = false, className }: { children: ReactNode; live?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2 border border-line bg-ink-950/80 px-2.5 py-1.5 text-[9px] text-ash-300 backdrop-blur-sm",
        className,
      )}
    >
      {live && <LiveDot />}
      {children}
    </span>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("motion-safe-only inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-signal animate-pulse-dot", className)}
    />
  );
}

/**
 * A matted, gallery-style frame that tilts in 3D toward the cursor while a
 * soft "raking light" sheen follows the pointer across the surface.
 */
export function TiltFrame({
  children,
  className,
  topLeft,
  bottomLeft,
  bottomRight,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  topLeft?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { intensity, light } = useAtmosphere();
  const rotateX = useSpring(0, { stiffness: 140, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 140, damping: 18 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(30);
  const glare = useMotionTemplate`radial-gradient(60% 60% at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.22), transparent 70%)`;

  return (
    <div className={cn("group/frame [perspective:1400px]", className)}>
      <motion.div
        ref={ref}
        className="relative border border-line bg-ink-800 p-2 shadow-[0_60px_120px_-50px_rgb(0_0_0/0.95)] [transform-style:preserve-3d] md:p-3"
        style={{ rotateX, rotateY }}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse" || !ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          rotateY.set((px - 0.5) * max * 2 * intensity);
          rotateX.set(-(py - 0.5) * max * 2 * intensity);
          glareX.set(px * 100);
          glareY.set(py * 100);
        }}
        onPointerLeave={() => {
          rotateX.set(0);
          rotateY.set(0);
        }}
      >
        <div className="relative overflow-hidden">
          {children}
          {/* inner vignette like a lit canvas */}
          <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgb(0_0_0/0.65)]" />
          {light && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover/frame:opacity-100"
              style={{ background: glare }}
            />
          )}
        </div>

        {topLeft && <div className="absolute left-4 top-4 [transform:translateZ(40px)] md:left-6 md:top-6">{topLeft}</div>}
        {bottomLeft && <div className="absolute bottom-4 left-4 [transform:translateZ(40px)] md:bottom-6 md:left-6">{bottomLeft}</div>}
        {bottomRight && (
          <div className="absolute bottom-4 right-4 hidden [transform:translateZ(40px)] sm:block md:bottom-6 md:right-6">{bottomRight}</div>
        )}
      </motion.div>
    </div>
  );
}
