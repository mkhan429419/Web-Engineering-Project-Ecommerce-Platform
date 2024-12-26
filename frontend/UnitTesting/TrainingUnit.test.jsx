import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Training from "../src/pages/Training";

jest.mock("../src/assets/sc/22.jpg", () => "mocked-crafting.jpg");
jest.mock("../src/assets/sc/23.jpg", () => "mocked-marketing.jpg");
jest.mock("../src/assets/sc/24.jpg", () => "mocked-packaging.jpg");

describe("Training Component", () => {
  it("renders the quote section", () => {
    render(<Training />);
    const quote = screen.getByText("“Every artist was first an amateur.”");
    const author = screen.getByText("― Ralph Waldo Emerson");
    expect(quote).toBeInTheDocument();
    expect(author).toBeInTheDocument();
  });

  it("renders all course cards", () => {
    render(<Training />);
    const courseTitles = [
      "Crafting Essentials",
      "Selling Handmade Goods",
      "Eco-Friendly Packaging",
    ];
    courseTitles.forEach((title) => {
      const courseCard = screen.getByText(title);
      expect(courseCard).toBeInTheDocument();
    });
  });

  it("renders course descriptions and links", () => {
    render(<Training />);
    const courseDescriptions = [
      "Master the fundamentals of creating handmade goods, from selecting materials to learning essential crafting techniques.",
      "Learn how to market and sell your handmade products on platforms like Etsy, Instagram, and your own e-commerce website.",
      "Discover innovative ways to package your products sustainably while creating an unforgettable unboxing experience.",
    ];
    courseDescriptions.forEach((desc) => {
      const description = screen.getByText(desc);
      expect(description).toBeInTheDocument();
    });

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(3);
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
      expect(link).toHaveClass("text-pink-500");
    });
  });

  it("renders all course images with proper alt attributes", () => {
    render(<Training />);
    const images = [
      { src: "mocked-crafting.jpg", alt: "Crafting Skills" },
      { src: "mocked-marketing.jpg", alt: "Marketing Skills" },
      { src: "mocked-packaging.jpg", alt: "Packaging Skills" },
    ];

    images.forEach(({ src, alt }) => {
      const image = screen.getByAltText(alt);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", src);
    });
  });

  it("renders the course videos", () => {
    render(<Training />);
    const videos = screen.getAllByTestId("course-video");
    expect(videos.length).toBe(2);
    videos.forEach((video) => {
      expect(video).toHaveAttribute("controls");
    });
  });
});
