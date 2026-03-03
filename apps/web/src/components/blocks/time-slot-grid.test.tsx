import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TimeSlotGrid } from "./time-slot-grid";
import { sileo } from "sileo";

const mockUseBookingSlots = vi.fn();

// Mock the hook and sileo before imports
vi.mock("@/hooks/use-booking", () => ({
  useBookingSlots: (...args: any[]) => mockUseBookingSlots(...args),
}));

vi.mock("sileo", () => ({
  sileo: {
    error: vi.fn(),
  },
}));

describe("TimeSlotGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseBookingSlots.mockReturnValue({
      data: ["09:00 - 12:00", "12:00 - 15:00", "18:00 - 21:00"], // 15:00-18:00 is occupied
      isLoading: false,
      isError: false,
      error: null,
    });
  });

  it("renders a calendar and time slots", () => {
    const handleNextStep = vi.fn();
    
    render(<TimeSlotGrid onNext={handleNextStep} />);

    expect(screen.getByText("Selecciona una fecha")).toBeDefined();

    // Check if the slots are rendered
    expect(screen.getByText("09:00 - 12:00")).toBeDefined();
    expect(screen.getByText("15:00 - 18:00")).toBeDefined();
  });

  it("selects a time slot, updates styling and aria tags, and calls onNext", () => {
    const handleNextStep = vi.fn();
    
    render(<TimeSlotGrid onNext={handleNextStep} />);

    // Suppose we select a time slot
    const slot = screen.getByText("09:00 - 12:00");
    
    // Check initial ARIA states
    expect(slot.getAttribute("aria-pressed")).toBe("false");
    expect(slot.getAttribute("aria-label")).toContain("Disponible");
    
    fireEvent.click(slot);

    // The slot should be active and the transition horizontal callback triggered
    expect(handleNextStep).toHaveBeenCalled();
    
    // Check that it gets the selected state class and ARIA pressed true
    expect(slot.className).toContain("bg-nmd-orange");
    expect(slot.getAttribute("aria-pressed")).toBe("true");
  });

  it("displays loading spinner when isLoading is true", () => {
    mockUseBookingSlots.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<TimeSlotGrid onNext={vi.fn()} />);
    
    // Expect the spinner to be shown
    expect(screen.getByTestId("loading-spinner")).toBeDefined();
    
    // And slots should be disabled
    const slots = screen.getAllByRole("button").filter(b => b.textContent && /\d{2}:\d{2}/.test(b.textContent));
    slots.forEach(slot => {
      expect((slot as HTMLButtonElement).disabled).toBe(true);
    });
  });

  it("calls sileo.error when isError is true", () => {
    mockUseBookingSlots.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: new Error("Server malfunction"),
    });

    render(<TimeSlotGrid onNext={vi.fn()} />);
    
    expect(sileo.error).toHaveBeenCalledWith({ title: "Server malfunction" });
  });
});
