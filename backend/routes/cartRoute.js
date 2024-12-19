import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
  deleteProductFromCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/get", authUser, getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/delete", authUser, deleteProductFromCart);

export default cartRouter;
