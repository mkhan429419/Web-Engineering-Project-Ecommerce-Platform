import { addProduct } from "../controllers/productController.js";
import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

jest.mock("../models/productModel.js");
jest.mock("cloudinary", () => ({
  v2: {
    uploader: {
      upload: jest.fn(),
    },
  },
}));

describe("addProduct function", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        title: "Test Product",
        description: "This is a test product",
        price: "99.99",
        category: "Electronics",
        subCategory: "Phones",
        sizes: JSON.stringify(["Small", "Medium", "Large"]),
        BestSell: "true",
      },
      files: {
        image1: [{ path: "test-image-path.jpg" }],
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should successfully add a product", async () => {
    // Mock Cloudinary upload response
    cloudinary.uploader.upload.mockResolvedValue({
      secure_url: "https://cloudinary.com/test-image.jpg",
    });

    // Mock productModel save method
    productModel.prototype.save = jest.fn().mockResolvedValue({});

    // Call the function
    await addProduct(req, res);

    // Expectations
    expect(cloudinary.uploader.upload).toHaveBeenCalledWith(
      "test-image-path.jpg",
      {
        resource_type: "image",
      }
    );

    expect(productModel.prototype.save).toHaveBeenCalled();

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Product Added",
    });
  });

  it("should handle errors if Cloudinary upload fails", async () => {
    // Mock Cloudinary upload rejection
    cloudinary.uploader.upload.mockRejectedValue(new Error("Cloudinary error"));

    await addProduct(req, res);

    // Expectations
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Cloudinary error",
    });
  });

  it("should handle errors if saving to the database fails", async () => {
    // Mock Cloudinary upload response
    cloudinary.uploader.upload.mockResolvedValue({
      secure_url: "https://cloudinary.com/test-image.jpg",
    });

    // Mock productModel save rejection
    productModel.prototype.save = jest
      .fn()
      .mockRejectedValue(new Error("Database error"));

    await addProduct(req, res);

    // Expectations
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Database error",
    });
  });
});