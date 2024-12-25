import { render, screen } from "@testing-library/react";
import Home from "./Home"; // Adjust the path as needed
import React from "react";
// Mock child components to isolate testing
jest.mock("../Components/Hero", () => {
  const MockHero = () => <div>Hero Component</div>;
  MockHero.displayName = "Hero";
  return MockHero;
});

jest.mock("../Components/LatestCollection", () => {
  const MockLatestCollection = () => <div>Latest Collection Component</div>;
  MockLatestCollection.displayName = "LatestCollection";
  return MockLatestCollection;
});

jest.mock("../Components/BestSelling", () => {
  const MockBestSelling = () => <div>Best Selling Component</div>;
  MockBestSelling.displayName = "BestSelling";
  return MockBestSelling;
});

jest.mock("../Components/NewsLetter", () => {
  const MockNewsLetter = () => <div>NewsLetter Component</div>;
  MockNewsLetter.displayName = "NewsLetter";
  return MockNewsLetter;
});

describe("Home Component", () => {
  test("renders all child components", () => {
    render(<Home />);

    // Assert that each child component is rendered
    expect(screen.getByText("Hero Component")).toBeInTheDocument();
    expect(screen.getByText("Latest Collection Component")).toBeInTheDocument();
    expect(screen.getByText("Best Selling Component")).toBeInTheDocument();
    expect(screen.getByText("NewsLetter Component")).toBeInTheDocument();
  });
});
