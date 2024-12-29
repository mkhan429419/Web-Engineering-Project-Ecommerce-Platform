import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "../src/pages/About";

jest.mock("../src/assets/sc/21.png", () => "mocked-image.png");
jest.mock("../src/Components/NewsLetter", () => {
  return function MockNewsLetter() {
    return <div data-testid="newsletter">Mocked NewsLetter</div>;
  };
});

const mockServices = [
  {
    heading: "Ethically Handmade",
    description:
      "Every product is lovingly handcrafted with care and attention to detail.",
  },
  {
    heading: "Eco-Friendly",
    description:
      "Our commitment to sustainability ensures minimal impact on the environment.",
  },
  {
    heading: "Personalized Experience",
    description:
      "Get custom-made items tailored to your preferences for a truly unique experience.",
  },
  {
    heading: "Recyclable Packaging",
    description:
      "We use eco-conscious packaging that’s easy to recycle and kind to the planet.",
  },
];

describe("About Component", () => {
  it("renders the main structure correctly", () => {
    render(<About />);

    // Check image
    const image = screen.getByAltText("Sample");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "mocked-image.png");

    // Check main heading
    const mainHeading = screen.getByText("About Craftsy");
    expect(mainHeading).toBeInTheDocument();

    // Check paragraph content
    const paragraphs = screen.getAllByText(/Craftsy/i);
    expect(paragraphs.length).toBeGreaterThanOrEqual(2); // Expect at least 2 mentions of "Craftsy"

    // Check "Why Choose Craftsy?" section heading
    const sectionHeading = screen.getByText("Why Choose Craftsy?");
    expect(sectionHeading).toBeInTheDocument();
  });

  it("renders all services correctly", () => {
    render(<About />);

    // Verify each service renders correctly
    mockServices.forEach((service) => {
      const heading = screen.getByText(service.heading);
      const description = screen.getByText(service.description);
      expect(heading).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  it("renders the NewsLetter component", () => {
    render(<About />);

    // Check for the presence of the mocked NewsLetter
    const newsletter = screen.getByTestId("newsletter");
    expect(newsletter).toBeInTheDocument();
    expect(newsletter).toHaveTextContent("Mocked NewsLetter");
  });
});
