export default {
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest", // Ensure Jest transpiles ES modules
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS files
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios|axios/lib)/)", // Transpile Axios and its submodules
  ],
  testPathIgnorePatterns: ["<rootDir>/tests/e2e/"], // Ignore Playwright tests
  moduleFileExtensions: ["js", "jsx", "mjs"],
};
