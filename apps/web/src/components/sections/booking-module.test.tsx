import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookingModule } from "./booking-module";
import * as useMediaQueryModule from "@/hooks/use-media-query";

// Mock QueryClientProvider since BookingModule renders components that use React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const BookingModuleWithProvider = () => (
  <QueryClientProvider client={queryClient}>
    <BookingModule />
  </QueryClientProvider>
);

vi.mock("@/components/blocks/time-slot-grid", () => ({
  TimeSlotGrid: ({ onNext }: { onNext: (d: Date, s: string) => void }) => (
    <div data-testid="mock-time-slot-grid">
      <button onClick={() => onNext(new Date(), "09:00 - 12:00")}>Mock Slot</button>
    </div>
  )
}));

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock the ResizeObserver for Drawer
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe("BookingModule", () => {
  it("renders a sticky 'Reservar' button", () => {
    // Force mobile mode
    vi.spyOn(useMediaQueryModule, "useMediaQuery").mockReturnValue(false);

    render(<BookingModuleWithProvider />);
    const trigger = screen.getByRole("button", { name: /reservar/i });
    expect(trigger).toBeDefined();
    
    // Check styling
    expect(trigger.className).toContain("bg-nmd-orange");
    expect(trigger.className).toContain("text-white");
    expect(trigger.className).toContain("rounded-full");
    expect(trigger.className).toContain("fixed");
  });

  it("opens the Drawer on mobile when CTA is clicked", async () => {
    vi.spyOn(useMediaQueryModule, "useMediaQuery").mockReturnValue(false);

    render(<BookingModuleWithProvider />);
    
    const trigger = screen.getByRole("button", { name: /reservar/i });
    fireEvent.click(trigger);

    // After clicking, the Drawer should show up
    const title = await screen.findByText("Reserva tu sesión");
    expect(title).toBeDefined();
    expect(title.className).toContain("text-white");
    
    const stepOne = await screen.findByTestId("mock-time-slot-grid");
    expect(stepOne).toBeDefined();
  });

  it("opens the Dialog on desktop when CTA is clicked", async () => {
    // Force desktop mode
    vi.spyOn(useMediaQueryModule, "useMediaQuery").mockReturnValue(true);

    render(<BookingModuleWithProvider />);
    
    const trigger = screen.getByRole("button", { name: /reservar/i });
    fireEvent.click(trigger);

    // Dialog should open
    const title = await screen.findByText("Reserva tu sesión");
    expect(title).toBeDefined();

    // Verify dialog styling classes
    const dialogHeader = title.parentElement;
    // The Dialog element is mounted in an overlay, we check generic presence
    expect(document.body.innerHTML).toContain("rounded-[2rem]");
    
    const stepOne = await screen.findByTestId("mock-time-slot-grid");
    expect(stepOne).toBeDefined();
  });

  it("progresses to step 3 when options are selected", async () => {
    vi.spyOn(useMediaQueryModule, "useMediaQuery").mockReturnValue(true);

    render(<BookingModuleWithProvider />);
    
    // 1. Open Dialog
    const trigger = screen.getByRole("button", { name: /reservar/i });
    fireEvent.click(trigger);

    // 2. Step 1: Select a time slot
    await screen.findByTestId("mock-time-slot-grid");
    const slotButton = await screen.findByText("Mock Slot");
    fireEvent.click(slotButton);

    // 3. Step 2: Select a session type
    // We expect the session types to display
    const soloCard = await screen.findByText(/SOLO ESTUDIO/i);
    fireEvent.click(soloCard);

    // 4. Step 3: Fill booking data form
    const nameInput = await screen.findByLabelText(/Nombre/i);
    const emailInput = await screen.findByLabelText(/Email/i);
    
    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
  });
});
