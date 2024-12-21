import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "../config/cloudinary";

jest.mock("cloudinary", () => ({
  v2: {
    config: jest.fn(),
  },
}));
describe("connectCloudinary", () => {
  it("should call cloudinary.config with the correct environment variables", async () => {
    process.env.CLOUDINARY_NAME = "test-cloud-name";
    process.env.CLOUDINARY_API_KEY = "test-api-key";
    process.env.CLOUDINARY_SECRET_KEY = "test-secret-key";
    await connectCloudinary();
    expect(cloudinary.config).toHaveBeenCalledWith({
      cloud_name: "test-cloud-name",
      api_key: "test-api-key",
      api_secret: "test-secret-key",
    });
  });
});
