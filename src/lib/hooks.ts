"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** True on devices with a precise pointer (mouse / trackpad). */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

const clockFormatters = new Map<string, Intl.DateTimeFormat>();

function formatTime(timeZone: string) {
  let formatter = clockFormatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    clockFormatters.set(timeZone, formatter);
  }
  return formatter.format(new Date());
}

/** A ticking HH:MM:SS clock for a given IANA time zone. */
export function useClock(timeZone: string) {
  return useSyncExternalStore(
    (onTick) => {
      const id = window.setInterval(onTick, 1000);
      return () => window.clearInterval(id);
    },
    () => formatTime(timeZone),
    () => "--:--:--",
  );
}
