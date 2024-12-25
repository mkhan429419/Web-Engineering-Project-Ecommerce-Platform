import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ShopContext } from "../src/context/ShopContext";
import Collection from "../src/pages/Collection";

describe("Collection Component", () => {
  const mockProducts = [
    {
      _id: "1",
      title: "Women's Hoodie",
      description: "A warm hoodie for women",
      price: "$50",
      category: "Hoodie",
      subCategory: "Women",
      image: ["hoodie.jpg"],
    },
    {
      _id: "2",
      title: "Men's Shirt",
      description: "A stylish shirt for men",
      price: "$40",
      category: "Shirts",
      subCategory: "Men",
      image: ["shirt.jpg"],
    },
    {
      _id: "3",
      title: "Kid's T-Shirt",
      description: "A colorful T-shirt for kids",
      price: "$25",
      category: "Tops",
      subCategory: "Kids",
      image: ["tshirt.jpg"],
    },
  ];

  const mockContext = {
    products: mockProducts,
  };

  it("renders all products by default", () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <Collection />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    const productCollection = screen.getByTestId("product-collection");
    expect(productCollection.children.length).toBe(mockProducts.length);
  });

  it("filters products by category", async () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <Collection />
        </ShopContext.Provider>
      </MemoryRouter>
    );
  
    const categorySelect = screen.getAllByDisplayValue("DEFAULT")[1]; // Select the category dropdown
  
    // Filter by "Hoodies"
    fireEvent.change(categorySelect, { target: { value: "Hoodie" } });
  
    // Wait for the DOM to update
    await screen.findByText("Women's Hoodie");
  
    const productCollection = screen.getByTestId("product-collection");
    expect(productCollection.children.length).toBe(1); // Only one hoodie should be displayed
    expect(screen.getByText("Women's Hoodie")).toBeInTheDocument();
  });
  
  it("filters products based on the search query", async () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <Collection />
        </ShopContext.Provider>
      </MemoryRouter>
    );
  
    const searchInput = screen.getByPlaceholderText("Search...");
  
    // Simulate a search query
    fireEvent.change(searchInput, { target: { value: "Hoodie" } });
  
    // Wait for the DOM to update
    const productCollection = await screen.findByTestId("product-collection");
  
    // Check that only the searched product is displayed
    expect(productCollection.children.length).toBe(1);
    expect(screen.getByText("Women's Hoodie")).toBeInTheDocument();
    expect(screen.queryByText("Men's Shirt")).not.toBeInTheDocument();
    expect(screen.queryByText("Kid's T-Shirt")).not.toBeInTheDocument();
  });
  
  

  it("handles no results for search", async () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <Collection />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search...");

    // Search for a non-existent product
    fireEvent.change(searchInput, { target: { value: "NonExistent" } });

    // Wait for the DOM to update
    await screen.findByTestId("product-collection");

    const productCollection = screen.getByTestId("product-collection");
    expect(productCollection.children.length).toBe(0);
  });
});
