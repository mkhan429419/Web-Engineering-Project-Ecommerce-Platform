import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const addingAnItemToTheCart = async (id, size) => {
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

    setCart(cartClone);
    findNumberOfItemsInCart(cartClone);
    findTotalAmount(cartClone);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { id, size },
          {
            headers: { token },
          }
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to sync cart with server.");
      }
    }

    toast.success("Item successfully added to the cart", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const updateQuantity = async (id, size, quantity) => {
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

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { id, size, quantity },
          {
            headers: { token },
          }
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to update quantity on server.");
      }
    }
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
    setTotalAmount(amount.toFixed(2));
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getUserCart = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCart(response.data.cartData);
        findNumberOfItemsInCart(response.data.cartData);
        findTotalAmount(response.data.cartData);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
      toast.error("Failed to fetch cart. Please try again.");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  useEffect(() => {
    getUserCart();
  }, [token]);

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
    navigate,
    backendUrl,
    setToken,
    token,
    setNumberOfItemsInCart,
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
