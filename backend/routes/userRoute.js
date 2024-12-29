import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  newsletterSubscribe,
  contactFormSubmit,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/newsletter", newsletterSubscribe);
userRouter.post("/contact", contactFormSubmit);

export default userRouter;
