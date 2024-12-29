import connectDB from "../config/mongodb";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongoServer.getUri();
  await connectDB();
});
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
test("Database should be connected", () => {
  expect(mongoose.connection.readyState).toBe(1);
});
