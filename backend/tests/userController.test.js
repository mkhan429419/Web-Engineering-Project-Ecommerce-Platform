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
    userModel.findOne.mockResolvedValue({
      _id: "12345",
      email: "test@example.com",
      password: "hashedpassword",
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fake-token");
    await loginUser(req, res);
    expect(userModel.findOne).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "testpassword",
      "hashedpassword"
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: "12345" },
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
    bcrypt.compare.mockResolvedValue(false);
    await loginUser(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid credentials",
    });
  });
  it("should handle user not found", async () => {
    userModel.findOne.mockResolvedValue(null);
    await loginUser(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User doesn't exist",
    });
  });
  it("should fail if email is empty", async () => {
    req.body.email = "";
    await loginUser(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User doesn't exist",
    });
  });
  it("should fail if password is too short", async () => {
    req.body.password = "123";
    userModel.findOne.mockResolvedValue({
      _id: "12345",
      email: "test@example.com",
      password: "hashedpassword",
    });
    bcrypt.compare.mockResolvedValue(false);
    await loginUser(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid credentials",
    });
  });
});
