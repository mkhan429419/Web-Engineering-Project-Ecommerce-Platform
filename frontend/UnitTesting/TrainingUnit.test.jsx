import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Training from "../src/pages/Training";

jest.mock("../src/assets/sc/22.jpg", () => "mocked-crafting.jpg");
jest.mock("../src/assets/sc/23.jpg", () => "mocked-marketing.jpg");
jest.mock("../src/assets/sc/24.jpg", () => "mocked-packaging.jpg");
jest.mock("../src/assets/sample-1.mp4", () => "mocked-video-1.mp4");
jest.mock("../src/assets/sample-2.mp4", () => "mocked-video-2.mp4");
jest.mock("../src/assets/sample-3.mp4", () => "mocked-video-3.mp4");
jest.mock("../src/assets/sample-4.mp4", () => "mocked-video-4.mp4");
jest.mock("../src/assets/sample-5.mp4", () => "mocked-video-5.mp4");

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

  it("renders the course videos", () => {
    render(<Training />);
    const videos = screen.getAllByTestId("course-video");
    expect(videos.length).toBe(5);
    videos.forEach((video) => {
      expect(video).toHaveAttribute("controls");
    });
  });
  it("renders all course images with proper attributes", async () => {
    render(<Training />);

    const craftingImage = screen.getByTestId("crafting-image");
    expect(craftingImage.tagName).toBe("IMG");
    expect(craftingImage).toHaveAttribute("src", "mocked-crafting.jpg");
    expect(craftingImage).toHaveAttribute("alt", "Crafting Skills");

    const marketingImage = screen.getByTestId("marketing-image");
    expect(marketingImage.tagName).toBe("IMG");
    expect(marketingImage).toHaveAttribute("src", "mocked-marketing.jpg");
    expect(marketingImage).toHaveAttribute("alt", "Marketing Skills");

    const packagingImage = screen.getByTestId("packaging-image");
    expect(packagingImage.tagName).toBe("IMG");
    expect(packagingImage).toHaveAttribute("src", "mocked-packaging.jpg");
    expect(packagingImage).toHaveAttribute("alt", "Packaging Skills");
  });
});
