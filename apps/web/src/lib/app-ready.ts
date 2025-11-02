"use client";

type Options = {
  log?: boolean;
};

declare global {
  interface Window {
    __nmdAppReady?: boolean;
    __nmdLoaderHidden?: boolean;
  }
}

const APP_READY_EVENT = "app:ready";
const LOADER_HIDDEN_EVENT = "app:loader-hidden";

export function markAppReady(options?: Options) {
  if (typeof window === "undefined") {
    return;
  }
  window.__nmdAppReady = true;
  const event = new Event(APP_READY_EVENT);
  window.dispatchEvent(event);
  if (options?.log) {
    console.debug("[loader] app:ready dispatched");
  }
}

export function markLoaderHidden(options?: Options) {
  if (typeof window === "undefined") {
    return;
  }
  window.__nmdLoaderHidden = true;
  const event = new Event(LOADER_HIDDEN_EVENT);
  window.dispatchEvent(event);
  if (options?.log) {
    console.debug("[loader] loader hidden dispatched");
  }
}

export const appReadyEventName = APP_READY_EVENT;
export const loaderHiddenEventName = LOADER_HIDDEN_EVENT;
