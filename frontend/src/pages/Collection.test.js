import { render, screen, act } from "@testing-library/react";
import { createContext, useContext } from "react";
import axios from "axios";
import React from "react";

jest.mock("axios");

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
const MockConsumer = () => {
  const { getProductsData } = useContext(ShopContext);
  React.useEffect(() => {
    getProductsData();
  }, [getProductsData]);
  return <div>Consumer Component</div>;
};
describe("ShopContext API Requests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
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
    axios.get.mockResolvedValueOnce({
      data: { success: true, products: mockedProducts },
    });
    render(
      <MockShopContextProvider>
        <MockConsumer />
      </MockShopContextProvider>
    );
    await act(async () => {});
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:4000/api/product/list"
    );
    expect(mockSetProducts).toHaveBeenCalledWith(mockedProducts);
  });
  it("handles API error gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("API Error"));
    render(
      <MockShopContextProvider>
        <MockConsumer />
      </MockShopContextProvider>
    );
    await act(async () => {});
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:4000/api/product/list"
    );
    expect(mockSetProducts).not.toHaveBeenCalled();
  });
});
