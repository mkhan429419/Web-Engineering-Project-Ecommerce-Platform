import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ShopContext } from "../src/context/ShopContext";
import Cart from "../src/pages/Cart";

describe("Cart Component", () => {
  const mockContext = {
    cart: {
      "1": { S: 2, M: 1 },
    },
    products: [
      {
        _id: "1",
        title: "Sample Product",
        category: "Category 1",
        image: "sample.jpg",
        price: 100,
      },
    ],
    updateQuantity: jest.fn(),
    curr: "$",
    deleteProductFromCart: jest.fn(),
  };

  it("should render cart items correctly", () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <Router>
          <Cart />
        </Router>
      </ShopContext.Provider>
    );

    expect(screen.getByText(/Shopping Bag/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Sample Product/i).length).toBe(2); // Two instances for sizes S and M
    expect(screen.getAllByText(/Category 1/i).length).toBe(2); // Two instances for sizes S and M
    expect(screen.getByText(/Size: S/i)).toBeInTheDocument();
    expect(screen.getByText(/Size: M/i)).toBeInTheDocument();
    expect(screen.getAllByText(/\$\.100/i).length).toBe(2); // Two prices
  });

  it("should call updateQuantity when the quantity input changes", () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <Router>
          <Cart />
        </Router>
      </ShopContext.Provider>
    );

    const quantityInput = screen.getByDisplayValue("2");
    fireEvent.change(quantityInput, { target: { value: "3" } });

    expect(mockContext.updateQuantity).toHaveBeenCalledWith("1", "S", 3);
  });

  it("should call deleteProductFromCart when delete icon is clicked", () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <Router>
          <Cart />
        </Router>
      </ShopContext.Provider>
    );

    const deleteIcon = screen.getByTestId("delete-icon-1-S");
    fireEvent.click(deleteIcon);

    expect(mockContext.deleteProductFromCart).toHaveBeenCalledWith("1", "S");
  });
});
