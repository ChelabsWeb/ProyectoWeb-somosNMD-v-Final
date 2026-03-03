import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SessionTypeCards } from "./session-type-cards";

describe("SessionTypeCards", () => {
  it("renders both session type options", () => {
    const handleNext = vi.fn();
    render(<SessionTypeCards onNext={handleNext} />);
    
    expect(screen.getByText("Solo Estudio")).toBeDefined();
    expect(screen.getByText("Estudio + Productor")).toBeDefined();
  });

  it("calls onNext with 'solo' when Solo Estudio is clicked", () => {
    const handleNext = vi.fn();
    render(<SessionTypeCards onNext={handleNext} />);
    
    const soloButton = screen.getByRole("button", { name: /Solo Estudio/i });
    fireEvent.click(soloButton);
    
    expect(handleNext).toHaveBeenCalledWith("solo");
  });

  it("calls onNext with 'producer' when Estudio + Productor is clicked", () => {
    const handleNext = vi.fn();
    render(<SessionTypeCards onNext={handleNext} />);
    
    const producerButton = screen.getByRole("button", { name: /Estudio \+ Productor/i });
    fireEvent.click(producerButton);
    
    expect(handleNext).toHaveBeenCalledWith("producer");
  });

  it("highlights the selected option", () => {
    const handleNext = vi.fn();
    render(<SessionTypeCards onNext={handleNext} selectedType="solo" />);
    
    const soloButton = screen.getByRole("button", { name: /Solo Estudio/i });
    const producerButton = screen.getByRole("button", { name: /Estudio \+ Productor/i });
    
    expect(soloButton.getAttribute("aria-pressed")).toBe("true");
    expect(producerButton.getAttribute("aria-pressed")).toBe("false");
    
    // Check for the selected class (Tron Orange background)
    expect(soloButton.className).toContain("bg-nmd-orange");
  });
});
