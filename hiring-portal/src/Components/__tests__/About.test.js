import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../About";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock Navbar and Footer components
jest.mock("../Navbar", () => () => <div>Mock Navbar</div>);
jest.mock("../Footer", () => () => <div>Mock Footer</div>);

describe("About Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
  });

  test("renders the main title and introduction", () => {
    expect(screen.getByText("Welcome to Hiring Hub")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Our comprehensive platform for job searching and recruitment."
      )
    ).toBeInTheDocument();
  });

  test("renders all feature sections", () => {
    const featureTitles = [
      "Client Side",
      "Owner Side",
      "Integrated Compiler and Coding Environment",
      "Automated Mailing",
      "Result Management",
    ];

    featureTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("renders all feature descriptions and lists", () => {
    const featureDescriptions = [
      "As a client, you can:",
      "As a job owner, you can:",
      "Our platform provides a comprehensive coding environment where both clients and owners can:",
      "Stay updated with our automated mailing system that handles:",
      "Efficiently manage and review results from:",
    ];

    featureDescriptions.forEach((description) => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    // Verify specific items within each list are present
    const listItems = [
      "Browse Job Listings: Explore a wide range of job listings across various industries.",
      "Apply for Jobs: Submit your applications directly through our platform.",
      "View and Manage Jobs: Access and manage all job listings you have posted.",
      "Write and Test Code: Utilize our integrated compiler to write, test, and debug code.",
      "Application Notifications: Receive automated notifications about your job applications.",
      "Job Applications: Track and review the results of job applications.",
    ];

    listItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders images for each feature section", () => {
    const altTexts = [
      "Client Side",
      "Owner Side",
      "Integrated Compiler and Coding Environment",
      "Automated Mailing",
      "Result Management",
    ];

    altTexts.forEach((altText) => {
      const image = screen.getByAltText(altText);
      expect(image).toBeInTheDocument();
      expect(image).toHaveClass("feature-image");
    });
  });

  test("renders Navbar and Footer components", () => {
    expect(screen.getByText("Mock Navbar")).toBeInTheDocument();
    expect(screen.getByText("Mock Footer")).toBeInTheDocument();
  });
});
