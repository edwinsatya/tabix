"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useAtmosphere } from "@/components/providers/atmosphere";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * An endless ribbon that drifts on its own and speeds up / reverses with the
 * scroll velocity. The ribbon also leans (skews) into fast scrolls.
 */
export function Marquee({
  children,
  baseVelocity = 2,
  className,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const { intensity } = useAtmosphere();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(velocity, [-3000, 0, 3000], [-6, 0, 6]);
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!intensity) return;
    let moveBy = direction.current * baseVelocity * intensity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    moveBy += direction.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={className}>
      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div className="flex flex-nowrap" style={{ x, skewX }}>
          {[0, 1, 2, 3].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
              {children}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
