import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Create the ShopContext
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const curr = "Rs";
  const Delivery_charges = 200;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const addingAnItemToTheCart = (id, size) => {
    if (!size) {
      toast.error("Please select a size", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    const cartClone = structuredClone(cart);

    if (cartClone[id]) {
      if (cartClone[id][size]) {
        cartClone[id][size]++;
      } else {
        cartClone[id][size] = 1;
      }
    } else {
      cartClone[id] = {};
      cartClone[id][size] = 1;
    }

    toast.success("Item Successfully added to the cart", {
      position: "top-right",
      autoClose: 2000,
    });

    setCart(cartClone);
    findNumberOfItemsInCart(cartClone);
    findTotalAmount(cartClone);
  };

  const updateQuantity = (id, size, quantity) => {
    const cartClone = structuredClone(cart);
    if (quantity === 0) {
      delete cartClone[id][size];
      if (Object.keys(cartClone[id]).length === 0) delete cartClone[id];
    } else {
      cartClone[id][size] = quantity;
    }

    setCart(cartClone);
    findNumberOfItemsInCart(cartClone);
    findTotalAmount(cartClone);
  };

  const findNumberOfItemsInCart = (updatedCart) => {
    let totalItems = 0;
    for (const productId in updatedCart) {
      for (const size in updatedCart[productId]) {
        totalItems += updatedCart[productId][size];
      }
    }
    setNumberOfItemsInCart(totalItems);
  };

  const findTotalAmount = (cart) => {
    let amount = 0;
    for (const productId in cart) {
      for (const size in cart[productId]) {
        const product = products.find((prod) => prod._id === productId);
        if (product) {
          const quantity = cart[productId][size];
          amount += product.price * quantity;
        }
      }
    }
    setTotalAmount(amount.toFixed(2)); // Ensure the total is updated correctly
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after fetching is complete (success or failure)
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    console.log("Cart:", cart);
    console.log("Number of items in cart:", numberOfItemsInCart);
    console.log("Total amount:", totalAmount);
  }, [cart, numberOfItemsInCart, totalAmount]);

  const value = {
    products,
    curr,
    loading, 
    Delivery_charges,
    cart,
    addingAnItemToTheCart,
    numberOfItemsInCart,
    updateQuantity,
    totalAmount,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

// Add prop validation for children
ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children as a required prop
};

export default ShopContextProvider;