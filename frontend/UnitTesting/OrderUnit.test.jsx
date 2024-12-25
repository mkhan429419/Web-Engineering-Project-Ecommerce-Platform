import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ShopContext } from "../src/context/ShopContext";
import axios from "axios";
import Order from "../src/pages/Order";

jest.mock("axios");

describe("Order Component", () => {
  const mockContext = {
    backendUrl: "https://mock-backend.com",
    token: "mock-token",
    curr: "$",
  };

  const mockOrderData = [
    {
      _id: "order1",
      date: "2024-12-24T10:00:00Z",
      paymentMethod: "Stripe",
      status: "Delivered",
      items: [
        {
          _id: "item1",
          title: "Sample Product 1",
          category: "Category 1",
          image: ["sample1.jpg"],
          price: 100,
          quantity: 2,
          size: "M",
        },
      ],
    },
    {
      _id: "order2",
      date: "2024-12-23T15:00:00Z",
      paymentMethod: "Cash on Delivery",
      status: "Pending",
      items: [
        {
          _id: "item3",
          title: "Sample Product 3",
          category: "Category 3",
          image: ["sample3.jpg"],
          price: 75,
          quantity: 3,
          size: "L",
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render 'No orders to display' when no orders are available", async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true, orders: [] } });

    render(
      <ShopContext.Provider value={{ ...mockContext }}>
        <Order />
      </ShopContext.Provider>
    );

    expect(await screen.findByText(/No orders to display/i)).toBeInTheDocument();
  });

  it("should display a list of orders", async () => {
    axios.post.mockResolvedValueOnce({
      data: { success: true, orders: mockOrderData },
    });

    render(
      <ShopContext.Provider value={{ ...mockContext }}>
        <Order />
      </ShopContext.Provider>
    );

    await waitFor(() => {
     
      expect(screen.getByText(/Order Number: #1/i)).toBeInTheDocument();
      expect(screen.getByText(/Order Number: #2/i)).toBeInTheDocument();

     
      expect(screen.getByText(/Sample Product 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Category 1/i)).toBeInTheDocument();
      expect(screen.getByText(/\$100/i)).toBeInTheDocument();
      expect(screen.getByText(/Quantity: 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Size: M/i)).toBeInTheDocument();

      expect(screen.getByText(/Sample Product 3/i)).toBeInTheDocument();
      expect(screen.getByText(/Category 3/i)).toBeInTheDocument();
      expect(screen.getByText(/\$75/i)).toBeInTheDocument();
      expect(screen.getByText(/Quantity: 3/i)).toBeInTheDocument();
      expect(screen.getByText(/Size: L/i)).toBeInTheDocument();
    });
  });

 
  
});
