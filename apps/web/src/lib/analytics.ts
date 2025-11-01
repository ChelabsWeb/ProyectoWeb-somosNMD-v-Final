export type AnalyticsPayload = Record<string, unknown>;

export function trackEvent(name: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }
  const detail = { name, payload, timestamp: Date.now() };
  window.dispatchEvent(new CustomEvent("nmd:analytics", { detail }));
}

