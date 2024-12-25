import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ShopContext } from "../src/context/ShopContext";
import PlaceOrder from "../src/pages/PlaceOrder";

describe("PlaceOrder Component", () => {
  const mockContext = {
    cart: {
      "1": { S: 2 },
    },
    totalAmount: 100,
    Delivery_charges: 50,
    products: [
      {
        _id: "1",
        title: "Sample Product",
        category: "Category",
        image: "sample.jpg",
        price: 100,
      },
    ],
    setCart: jest.fn(),
    setNumberOfItemsInCart: jest.fn(),
    navigate: jest.fn(),
  };

  it("should render the shipping information form", () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <PlaceOrder />
      </ShopContext.Provider>
    );

    // Check for all form fields
    expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street Address:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ZipCode:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number:/i)).toBeInTheDocument();
  });

  it("should render payment method options", () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <PlaceOrder />
      </ShopContext.Provider>
    );

    // Verify payment options
    expect(screen.getByAltText(/Stripe/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Razorpay/i)).toBeInTheDocument();
    expect(screen.getByText(/Cash on Delivery/i)).toBeInTheDocument();
  });

  it("should update the selected payment method", () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <PlaceOrder />
      </ShopContext.Provider>
    );
  
    // Default method should be Stripe
    expect(screen.getByAltText(/Stripe/i).closest("div")).toHaveClass("border-[var(--Pink)]");
  
    // Select Razorpay
    fireEvent.click(screen.getByAltText(/Razorpay/i));
    expect(screen.getByAltText(/Razorpay/i).closest("div")).toHaveClass("border-[var(--Pink)]");
  
    // Select Cash on Delivery
    fireEvent.click(screen.getByText(/Cash on Delivery/i));
    expect(screen.getByText(/Cash on Delivery/i).closest("div")).toHaveClass("border-[var(--Pink)]");
  });

  it("should display the Place Order button", () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <PlaceOrder />
      </ShopContext.Provider>
    );

    const placeOrderButton = screen.getByText(/Place Order/i);
    expect(placeOrderButton).toBeInTheDocument();
  });

  
  
  
});
