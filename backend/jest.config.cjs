module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  setupFiles: ["dotenv/config"],
  testTimeout: 30000,
  moduleFileExtensions: ["js", "jsx"],
};
