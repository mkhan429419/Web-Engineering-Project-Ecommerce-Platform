export default {
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest", // Transpile ES modules with Babel
  },
  testEnvironment: "jsdom", // Use jsdom for DOM-related tests
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Jest setup file
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS modules
    "\\.(mp4|webm)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)", // Transpile ESM dependencies like Axios
  ],
  testPathIgnorePatterns: ["<rootDir>/tests/e2e/"], // Ignore end-to-end tests
  moduleFileExtensions: ["js", "jsx", "mjs"], // Supported file extensions
  // jest.config.js (ESM version)
  reporters: [
    "default",
    [
      "jest-stare",
      {
        resultDir: "jest-stare",
        reportTitle: "My Jest Report",
        coverageLink: "./coverage/lcov-report/index.html", // Optional
        jestStareConfigJson: "jest-stare.json",
        jestGlobalConfigJson: "global-jest-config.json",
      },
    ],
  ],
};
