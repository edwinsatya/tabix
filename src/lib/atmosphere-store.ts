/**
 * A tiny external store for site-wide "atmosphere" settings, read through
 * `useSyncExternalStore` so the server render and hydration stay consistent.
 *
 * - mode:      Drift (default) · Storm (more motion) · Still (reduced motion)
 * - light:     the cursor-following "raking light" beam
 * - sound:     the generated ambient drone
 * - introDone: whether the preloader has finished (once per browser session)
 */
export type MotionMode = "drift" | "storm" | "still";

export type AtmosphereState = {
  mode: MotionMode;
  light: boolean;
  sound: boolean;
  introDone: boolean;
};

const STORAGE_KEY = "atmosphere:v1";
const INTRO_KEY = "atmosphere:intro-seen";

const serverState: AtmosphereState = {
  mode: "drift",
  light: true,
  sound: false,
  introDone: false,
};

function readInitialState(): AtmosphereState {
  const state = { ...serverState };

  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      state.mode = "still";
    }
  } catch {}

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (saved && ["drift", "storm", "still"].includes(saved.mode)) state.mode = saved.mode;
    if (saved && typeof saved.light === "boolean") state.light = saved.light;
  } catch {}

  try {
    state.introDone = sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {}

  return state;
}

let state: AtmosphereState =
  typeof window === "undefined" ? serverState : readInitialState();

const listeners = new Set<() => void>();

export const atmosphereStore = {
  getSnapshot: () => state,
  getServerSnapshot: () => serverState,

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  set(partial: Partial<AtmosphereState>) {
    state = { ...state, ...partial };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: state.mode, light: state.light }));
      if (state.introDone) sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}

    listeners.forEach((listener) => listener());
  },
};
