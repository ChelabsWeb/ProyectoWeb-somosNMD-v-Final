import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ArtistCard } from "./ArtistCard";
import type { ArtistEntry } from "@/data/artists";

// Mock next/image so it doesn't try to load the actual image during testing
vi.mock("next/image", () => ({
  default: ({ fill, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} priority={undefined} />;
  },
}));

// Mock framer-motion to simplify testing
vi.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: {
      button: React.forwardRef(({ children, whileHover, whileTap, transition, ...props }: any, ref: any) => (
        <button ref={ref} {...props} data-testid="motion-button">
          {children}
        </button>
      )),
    },
  };
});

describe("ArtistCard", () => {
  const mockArtist: ArtistEntry = {
    id: "test-artist",
    name: "John Doe",
    blurb: "Creates stunning visual art.",
    imageSrc: "/test-image.jpg",
    bio: "Detailed bio here.",
    socials: {
      instagram: "https://instagram.com/johndoe",
    },
  };

  it("renders the artist name and id", () => {
    render(<ArtistCard artist={mockArtist} onSelect={vi.fn()} />);
    
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    // 'test-artist' id results in numericId 76 based on the component's logic
    expect(screen.getByText("76")).toBeInTheDocument();
  });

  it("calls onSelect when the card is clicked", () => {
    const handleSelect = vi.fn();
    render(<ArtistCard artist={mockArtist} onSelect={handleSelect} />);
    
    // Using the data-testid we added to our motion.button mock
    const button = screen.getByTestId("motion-button");
    fireEvent.click(button);
    
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it("renders the artist image with correct alt text", () => {
    render(<ArtistCard artist={mockArtist} onSelect={vi.fn()} />);
    
    const image = screen.getByAltText("John Doe");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
  });
});
