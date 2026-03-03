import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BookingDataForm } from "./booking-data-form";

describe("BookingDataForm", () => {
  it("renders the form inputs correctly", () => {
    const mockOnSubmit = vi.fn();
    render(<BookingDataForm onSubmit={mockOnSubmit} isPending={false} />);
    
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /solicitar reserva/i })).toBeInTheDocument();
  });

  it("validates email format inline and prevents submission", async () => {
    const mockOnSubmit = vi.fn();
    render(<BookingDataForm onSubmit={mockOnSubmit} isPending={false} />);
    
    const nameInput = screen.getByLabelText(/nombre/i);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(nameInput, { target: { value: "Juan Perez" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    await waitFor(() => {
      // Look for a validation message
      expect(screen.getByText(/inválido|invalido|incorrecto/i)).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeDisabled();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("submits the form when data is valid", async () => {
    const mockOnSubmit = vi.fn();
    render(<BookingDataForm onSubmit={mockOnSubmit} isPending={false} />);
    
    const nameInput = screen.getByLabelText(/nombre/i);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(nameInput, { target: { value: "Juan Perez" } });
    fireEvent.change(emailInput, { target: { value: "juan@example.com" } });

    const submitButton = screen.getByRole("button");
    
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Juan Perez",
          email: "juan@example.com"
        }),
        expect.anything()
      );
    });
  });

  it("disables the submit button when isPending is true", () => {
    const mockOnSubmit = vi.fn();
    render(<BookingDataForm onSubmit={mockOnSubmit} isPending={true} />);
    
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeDisabled();
  });
});
