import { loginUser } from "../controllers/userController.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../models/userModel.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("loginUser function", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        password: "testpassword",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should successfully log in a user", async () => {
    // Mock user lookup and bcrypt comparison
    userModel.findOne.mockResolvedValue({
      _id: "12345", // Mock the user _id
      email: "test@example.com",
      password: "hashedpassword",
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fake-token");

    await loginUser(req, res);

    // Expectations
    expect(userModel.findOne).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "testpassword",
      "hashedpassword"
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: "12345" }, // Mocked user _id
      process.env.JWT_SECRET
    );
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      token: "fake-token",
    });
  });

  it("should handle invalid credentials", async () => {
    userModel.findOne.mockResolvedValue({
      email: "test@example.com",
      password: "hashedpassword",
    });
    bcrypt.compare.mockResolvedValue(false); // Simulate incorrect password

    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid credentials",
    });
  });

  it("should handle user not found", async () => {
    userModel.findOne.mockResolvedValue(null); // Simulate user not found

    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User doesn't exist",
    });
  });
});
