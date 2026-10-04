"use client";

import { useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import { atmosphereStore, type MotionMode } from "@/lib/atmosphere-store";
import { createDrone, type Drone } from "@/lib/drone";

const INTENSITY: Record<MotionMode, number> = { still: 0, drift: 1, storm: 1.8 };

export function useAtmosphere() {
  const state = useSyncExternalStore(
    atmosphereStore.subscribe,
    atmosphereStore.getSnapshot,
    atmosphereStore.getServerSnapshot,
  );
  return { ...state, intensity: INTENSITY[state.mode], set: atmosphereStore.set };
}

const scrollLocks = new Set<string>();

/**
 * Pauses scrolling while something (preloader, menu, lightbox) owns the
 * screen. Locks are counted, so independent owners never release each other.
 */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();
  const id = useId();

  useEffect(() => {
    if (!lenis || !locked) return;
    scrollLocks.add(id);
    lenis.stop();
    return () => {
      scrollLocks.delete(id);
      if (scrollLocks.size === 0) lenis.start();
    };
  }, [lenis, locked, id]);
}

function IntroScrollLock() {
  const { introDone } = useAtmosphere();
  useScrollLock(!introDone);
  return null;
}

function AmbientSound() {
  const { sound } = useAtmosphere();
  const drone = useRef<Drone | null>(null);

  useEffect(() => {
    if (sound) {
      drone.current ??= createDrone();
      drone.current?.fadeIn();
    } else {
      drone.current?.fadeOut();
    }
  }, [sound]);

  useEffect(() => () => drone.current?.dispose(), []);

  return null;
}

export function AtmosphereProvider({ children }: { children: ReactNode }) {
  const { mode } = useAtmosphere();

  useEffect(() => {
    document.documentElement.dataset.motion = mode;
  }, [mode]);

  return (
    <MotionConfig reducedMotion={mode === "still" ? "always" : "never"}>
      <ReactLenis
        root
        options={{
          autoRaf: true,
          lerp: mode === "storm" ? 0.075 : 0.1,
          smoothWheel: mode !== "still",
          anchors: { offset: -72 },
          stopInertiaOnNavigate: true,
        }}
      >
        <IntroScrollLock />
        <AmbientSound />
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
