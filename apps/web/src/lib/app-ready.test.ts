import { describe, expect, it, vi } from "vitest";
import { appReadyEventName, markAppReady } from "./app-ready";

describe("markAppReady", () => {
  it("exits silently on the server", () => {
    const globalRef = globalThis as typeof globalThis & { window?: Window };
    const originalWindow = globalRef.window;
    Reflect.deleteProperty(globalRef, "window");

    expect(() => markAppReady()).not.toThrow();

    if (originalWindow) {
      globalRef.window = originalWindow;
    }
  });

  it("dispatches the ready event in the browser", () => {
    const dispatchSpy = vi.spyOn(window, "dispatchEvent");
    markAppReady();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.mock.calls[0][0].type).toBe(appReadyEventName);
  });

  it("logs debug output when requested", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    markAppReady({ log: true });
    expect(debugSpy).toHaveBeenCalledWith("[loader] app:ready dispatched");
    debugSpy.mockRestore();
  });
});
