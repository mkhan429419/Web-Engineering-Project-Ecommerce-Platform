import React from "react"; // <-- Add this line
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShopContextProvider from "../context/ShopContext";
import Collection from "../pages/Collection";

test("renders Collection component", () => {
  render(
    <MemoryRouter>
      <ShopContextProvider>
        <Collection />
      </ShopContextProvider>
    </MemoryRouter>
  );
});
