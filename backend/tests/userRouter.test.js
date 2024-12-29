import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import userRouter from "../routes/userRoute";
import { MongoMemoryServer } from "mongodb-memory-server";
import nodemailer from "nodemailer";

let mongoServer;
let transporter;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Mock Nodemailer
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "test@gmail.com",
      pass: "testpassword",
    },
    debug: false,
    logger: false,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
  transporter.close();
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

const app = express();
app.use(express.json());
app.use("/users", userRouter);

describe("User Routes", () => {
  it("should register a new user successfully", async () => {
    const response = await request(app).post("/users/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  it("should fail registration when email is invalid", async () => {
    const response = await request(app).post("/users/register").send({
      name: "Invalid Email",
      email: "not-an-email",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Please enter a valid email");
  });

  it("should fail registration when password is too short", async () => {
    const response = await request(app).post("/users/register").send({
      name: "Short Password",
      email: "test@example.com",
      password: "123",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Please enter a strong password");
  });

  it("should login a user successfully", async () => {
    const email = "test@example.com";
    await request(app).post("/users/register").send({
      name: "Login Test",
      email,
      password: "password123",
    });
    const response = await request(app).post("/users/login").send({
      email,
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  it("should fail to login with incorrect credentials", async () => {
    const response = await request(app).post("/users/login").send({
      email: "wrong@example.com",
      password: "wrongpassword",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User doesn't exist");
  });

  it("should allow admin login with valid credentials", async () => {
    process.env.ADMIN_EMAIL = "admin@example.com";
    process.env.ADMIN_PASSWORD = "admin123";
    const response = await request(app).post("/users/admin").send({
      email: "admin@example.com",
      password: "admin123",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  it("should fail admin login with invalid credentials", async () => {
    process.env.ADMIN_EMAIL = "admin@example.com";
    process.env.ADMIN_PASSWORD = "admin123";
    const response = await request(app).post("/users/admin").send({
      email: "notadmin@example.com",
      password: "wrongpassword",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid credentials");
  });
});
