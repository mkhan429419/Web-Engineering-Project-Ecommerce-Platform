import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "../src/pages/About"; 


jest.mock("../src/assets/sample.png", () => "sample.png"); 
jest.mock("../src/Components/NewsLetter", () => {
  return function MockNewsLetter() {
    return <div data-testid="newsletter">Mocked NewsLetter</div>;
  };
});

const mockServices = [
  {
    heading: "Fast Shipping",
    description: "Get your orders delivered swiftly with our expedited shipping services.",
    icon: "faExchange", 
  },
  {
    heading: "Secure Payments",
    description: "Enjoy safe and hassle-free transactions with encrypted payment options.",
    icon: "faShippingFast",
  },
  {
    heading: "24/7 Customer Support",
    description: "Our support team is available round-the-clock to assist you with any queries.",
    icon: "faLock",
  },
  {
    heading: "Easy Returns",
    description: "Hassle-free returns and exchanges to ensure your complete satisfaction.",
    icon: "faFileContract",
  },
];

describe("About Component", () => {
  it("renders the main structure correctly", () => {
    render(<About />);
    
    
    const image = screen.getByAltText("Sample");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "sample.png");

    // Check for the main heading
    const mainHeading = screen.getByText("We are an ecommerce site");
    expect(mainHeading).toBeInTheDocument();

    // Check for the paragraph
    const paragraph = screen.getByText(/Lorem ipsum dolor sit amet/i);
    expect(paragraph).toBeInTheDocument();

    // Check for the "Our Services" section heading
    const servicesHeading = screen.getByText("Our Services");
    expect(servicesHeading).toBeInTheDocument();
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
