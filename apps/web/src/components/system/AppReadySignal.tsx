"use client";

import { useEffect } from "react";
import { markAppReady } from "@/lib/app-ready";

/**
 * Dispatches the app ready signal once the client hydrates.
 * Keeps behaviour idempotent across route transitions.
 */
export function AppReadySignal() {
  useEffect(() => {
    markAppReady();
  }, []);
  return null;
}

