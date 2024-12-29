import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "../src/pages/Contact"; 

describe("Contact Component", () => {
  test("renders the heading with 'Get in touch' text", () => {
    render(<Contact />);

    // Check for the main heading
    expect(
      screen.getByRole("heading", { name: /get in touch/i })
    ).toBeInTheDocument();
  });

  test("renders all form fields with correct labels", () => {
    render(<Contact />);

    const formLabels = [
      "First Name:",
      "Last Name:",
      "Email Address:",
      "Street Address:",
      "City:",
      "State:",
      "ZipCode:",
      "Country:",
      "Phone Number:",
    ];

    formLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });

  
  test("renders the form fields with correct input types", () => {
    render(<Contact />);

    expect(screen.getByLabelText(/first name/i)).toHaveAttribute("type", "text");
    expect(screen.getByLabelText(/last name/i)).toHaveAttribute("type", "text");
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute("type", "email");
    expect(screen.getByLabelText(/phone number/i)).toHaveAttribute("type", "tel");
    expect(screen.getByLabelText(/zipcode/i)).toHaveAttribute("type", "text");
  });

 
});
