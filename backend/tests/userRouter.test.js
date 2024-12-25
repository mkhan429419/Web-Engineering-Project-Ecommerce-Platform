import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import userRouter from "../routes/userRoute";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});
const app = express();
app.use(express.json());
app.use("/users", userRouter);

describe("User Routes", () => {
  it("should register a new user successfully", async () => {
    const response = await request(app)
      .post("/users/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "password123",
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });
  it("should fail to register if email is invalid", async () => {
    const response = await request(app).post("/users/register").send({
      name: "Test User",
      email: "invalid-email",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Please enter a valid email");
  });

  it("should fail to register if password is too short", async () => {
    const response = await request(app)
      .post("/users/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "short",
      });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Please enter a strong password");
  });
  it("should login a user successfully", async () => {
    const email = `test${Date.now()}@example.com`;
    await request(app).post("/users/register").send({
      name: "Test User",
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
      email: "nonexistent@example.com",
      password: "wrongpassword",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User doesn't exist");
  });
  it("should login an admin successfully", async () => {
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
  it("should fail to login as admin with incorrect credentials", async () => {
    process.env.ADMIN_EMAIL = "admin@example.com";
    process.env.ADMIN_PASSWORD = "admin123";
    const response = await request(app).post("/users/admin").send({
      email: "wrongadmin@example.com",
      password: "wrongpassword",
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid credentials");
  });
});
