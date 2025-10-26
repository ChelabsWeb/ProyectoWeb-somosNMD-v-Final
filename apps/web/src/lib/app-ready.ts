"use client";

type Options = {
  log?: boolean;
};

const APP_READY_EVENT = "app:ready";

export function markAppReady(options?: Options) {
  if (typeof window === "undefined") {
    return;
  }
  const event = new Event(APP_READY_EVENT);
  window.dispatchEvent(event);
  if (options?.log) {
    console.debug("[loader] app:ready dispatched");
  }
}

export const appReadyEventName = APP_READY_EVENT;

