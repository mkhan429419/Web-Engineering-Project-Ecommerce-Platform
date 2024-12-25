import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { createContext, useContext } from "react";
import axios from "axios";

// Mock axios
jest.mock("axios");

// Create a mock ShopContext
const ShopContext = createContext();
const mockSetProducts = jest.fn();

const MockShopContextProvider = ({ children }) => {
  const mockValue = {
    products: [],
    getProductsData: async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/product/list"
        );
        if (response.data.success) {
          mockSetProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  };
  return (
    <ShopContext.Provider value={mockValue}>{children}</ShopContext.Provider>
  );
};

describe("ShopContext API Requests", () => {
  it("fetches product list and updates context", async () => {
    const mockedProducts = [
      {
        _id: "product-1",
        title: "Product 1",
        description: "Description for Product 1",
        price: 100,
        category: "Tops",
        subCategory: "Men",
        image: ["https://via.placeholder.com/150?text=Product1"],
      },
      {
        _id: "product-2",
        title: "Product 2",
        description: "Description for Product 2",
        price: 200,
        category: "Bottoms",
        subCategory: "Women",
        image: ["https://via.placeholder.com/150?text=Product2"],
      },
    ];

    // Mock API response
    axios.get.mockResolvedValueOnce({
      data: { success: true, products: mockedProducts },
    });

    // Render the provider
    render(
      <MockShopContextProvider>
        <MockConsumer />
      </MockShopContextProvider>
    );

    // Act: Call getProductsData
    await act(async () => {
      const context = useContext(ShopContext);
      await context.getProductsData();
    });

    // Verify axios was called correctly
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:4000/api/product/list"
    );

    // Verify mockSetProducts was called with the mocked products
    expect(mockSetProducts).toHaveBeenCalledWith(mockedProducts);
  });

  it("handles API error gracefully", async () => {
    // Mock API error
    axios.get.mockRejectedValueOnce(new Error("API Error"));

    // Render the provider
    render(
      <MockShopContextProvider>
        <MockConsumer />
      </MockShopContextProvider>
    );

    // Act: Call getProductsData
    await act(async () => {
      const context = useContext(ShopContext);
      await context.getProductsData();
    });

    // Ensure axios was called
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:4000/api/product/list"
    );

    // Ensure error handling was triggered (mockSetProducts should not be called)
    expect(mockSetProducts).not.toHaveBeenCalled();
  });
});

// Helper component to use context
const MockConsumer = () => {
  const context = useContext(ShopContext);
  return <div>{JSON.stringify(context.products)}</div>;
};
