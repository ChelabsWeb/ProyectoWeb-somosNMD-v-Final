"use client";

import { useEffect, useState } from "react";

/**
 * Detects whether the current pointer input is coarse (e.g., touch).
 * Falls back gracefully when `matchMedia` is unavailable.
 */
export const useCoarsePointer = (): boolean => {
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const update = (mq: MediaQueryList | MediaQueryListEvent) => {
      setIsCoarse(mq.matches);
    };

    update(mediaQuery);

    const handleChange = (event: MediaQueryListEvent) => update(event);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }

    return undefined;
  }, []);

  return isCoarse;
};

