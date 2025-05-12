import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import helmet from "helmet";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect to database
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log("Server started on PORT: " + port));
}

// Export for Vercel
export default app;
