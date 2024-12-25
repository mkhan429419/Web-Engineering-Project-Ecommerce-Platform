import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Training from "../src/pages/Training"; // Update the path to your Training component

jest.mock("../src/assets/business.jpg", () => "business.jpg"); // Mock images
jest.mock("../src/assets/market.jpg", () => "market.jpg");
jest.mock("../src/assets/financial.jpg", () => "financial.jpg");

describe("Training Component", () => {
  it("renders the quote section", () => {
    render(<Training />);
    const quote = screen.getByText(
      "“You educate a man; you educate a man. You educate a woman; you educate a generation.”"
    );
    const author = screen.getByText("― Brigham Young");
    expect(quote).toBeInTheDocument();
    expect(author).toBeInTheDocument();
  });

  it("renders all course cards", () => {
    render(<Training />);
    const courseTitles = [
      "Basic Business Skills",
      "Online Marketplace Setup",
      "Financial Literacy",
    ];
    courseTitles.forEach((title) => {
      const courseCard = screen.getByText(title);
      expect(courseCard).toBeInTheDocument();
    });
  });

  it("renders course descriptions and links", () => {
    render(<Training />);
    const courseDescriptions = [
      "Learn the fundamentals of running a business in a rural setting. From marketing to finance, this course covers everything.",
      "This training helps you set up an online marketplace and start selling your products globally.",
      "Gain knowledge on how to manage finances, investment, and savings in a small business environment.",
    ];
    courseDescriptions.forEach((desc) => {
      const description = screen.getByText(desc);
      expect(description).toBeInTheDocument();
    });

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(3); // Ensure there are exactly 3 "Learn More" links
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
      expect(link).toHaveClass("text-pink-500");
    });
  });

  it("renders all course images with proper alt attributes", () => {
    render(<Training />);
    const images = [
      { src: "business.jpg", alt: "Course 1" },
      { src: "market.jpg", alt: "Course 2" },
      { src: "financial.jpg", alt: "Course 3" },
    ];

    images.forEach(({ src, alt }) => {
      const image = screen.getByAltText(alt);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", src);
    });
  });

 

  

});
