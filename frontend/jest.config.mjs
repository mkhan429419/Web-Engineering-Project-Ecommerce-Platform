export default {
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest", // Transpile ES modules with Babel
  },
  testEnvironment: "jsdom", // Use jsdom for DOM-related tests
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Jest setup file
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS modules
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)", // Transpile ESM dependencies like Axios
  ],
  testPathIgnorePatterns: ["<rootDir>/tests/e2e/"], // Ignore end-to-end tests
  moduleFileExtensions: ["js", "jsx", "mjs"], // Supported file extensions
};
