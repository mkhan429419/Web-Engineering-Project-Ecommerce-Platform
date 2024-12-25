import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import axios from "axios";
import Product from "./Product";
import { ShopContext } from "../context/ShopContext";

jest.mock("axios");

const mockProducts = [
  {
    _id: "product-1",
    title: "Product 1",
    category: "Tops",
    price: 100,
    image: "image1.jpg",
    sizes: ["M", "L"],
    description: "Description of Product 1",
  },
  {
    _id: "product-2",
    title: "Product 2",
    category: "Tops",
    price: 150,
    image: "image2.jpg",
    sizes: ["S", "M"],
    description: "Description of Product 2",
  },
];

const mockContextValue = {
  products: mockProducts,
  curr: "Rs",
  addingAnItemToTheCart: jest.fn(),
  backendUrl: 'http://localhost:4000'
};

const renderWithContext = (component) => {
  return render(
    <BrowserRouter>
      <ShopContext.Provider value={mockContextValue}>
        {component}
      </ShopContext.Provider>
    </BrowserRouter>
  );
};

describe("Product Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays product details correctly", async () => {
    // Mock the API call to fetch products
    axios.get.mockResolvedValueOnce({
      data: { success: true, products: mockProducts[0] },
    });

    await act(async () => {
      renderWithContext(<Product />, ["/product/product-1"]);
    });

    expect(screen.getByTestId("product-title")).toHaveTextContent("Product 1");
    expect(screen.getByTestId("product-description")).toHaveTextContent(
      "Description of Product 1"
    );
    expect(screen.getByText("Rs.100")).toBeInTheDocument();
  });

//   test("selects size and adds item to cart", async () => {
//     // Mock the API call to fetch products
//     axios.get.mockResolvedValueOnce({
//       data: { success: true, products: mockProducts },
//     });

//     await act(async () => {
//       renderWithContext(<Product />, ["/product/product-1"]);
//     });

//     // Select size
//     const sizeButtonM = screen.getByTestId("size-button-M");
//     fireEvent.click(sizeButtonM);
//     expect(sizeButtonM).toHaveClass("border-yellow-600"); // Check if selected size has the correct class

//     // Add to cart
//     const addToCartButton = screen.getByRole("button", { name: /Add to Cart/i });
//     fireEvent.click(addToCartButton);

//     expect(mockContextValue.addingAnItemToTheCart).toHaveBeenCalledWith(
//       "product-1",
//       "M"
//     );
//   });

//   test("shows similar products", async () => {
//     // Mock the API call to fetch products
//     axios.get.mockResolvedValueOnce({
//       data: { success: true, products: mockProducts[0] },
//     });

//     await act(async () => {
//       renderWithContext(<Product />, ["/product/product-1"]);
//     });

//     const similarProducts = screen.getByTestId("similar-products");
//     expect(similarProducts).toBeInTheDocument();
//     expect(similarProducts.children.length).toBe(1); // Only Product 2 should be similar
//   });

//   test("handles product not found", async () => {
//     // Mock the API call to fetch products
//     axios.get.mockResolvedValueOnce({
//       data: { success: true, products: [] }, // No products found
//     });

//     await act(async () => {
//       renderWithContext(<Product />, ["/product/product-1"]);
//     });

//     expect(screen.getByText("Product not found")).toBeInTheDocument();
//   });
});