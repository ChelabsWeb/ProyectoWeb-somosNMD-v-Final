import { describe, expect, it, vi } from "vitest";
import { trackEvent } from "./analytics";

describe("trackEvent", () => {
  it("dispatches a custom event with payload", () => {
    const dispatchSpy = vi.spyOn(window, "dispatchEvent");
    const payload = { foo: "bar" };

    trackEvent("hero_cta_click", payload);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe("nmd:analytics");
    expect(event.detail.name).toBe("hero_cta_click");
    expect(event.detail.payload).toEqual(payload);
    dispatchSpy.mockRestore();
  });
});

