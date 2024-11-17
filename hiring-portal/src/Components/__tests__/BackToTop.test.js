import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BackToTop from "../BackToTop";
import "@testing-library/jest-dom";

describe("BackToTop Component", () => {
  beforeEach(() => {
    // Mock the scrollTo function
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the button, but it is hidden initially", () => {
    render(<BackToTop />);
    const container = screen.getByRole("button", {
      name: /back to top/i,
    }).parentElement;
    expect(container).toHaveClass("hidden");
  });

  test("button becomes visible when scrolled down", () => {
    render(<BackToTop />);
    fireEvent.scroll(window, { target: { pageYOffset: 150 } });

    const container = screen.getByRole("button", {
      name: /back to top/i,
    }).parentElement;
    expect(container).toHaveClass("visible");
  });

  test("clicking the button scrolls to the top", () => {
    render(<BackToTop />);

    // Simulate scrolling down the page
    fireEvent.scroll(window, { target: { pageYOffset: 150 } });

    const button = screen.getByRole("button", { name: /back to top/i });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
