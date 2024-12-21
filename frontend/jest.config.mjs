export default {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",  // Tells Jest to use babel-jest to transform .js and .jsx files
  },
  testEnvironment: "jsdom",  // Jest uses jsdom as the test environment for testing React components
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",  // Mock CSS imports with identity-obj-proxy
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)", // Tell Jest to transpile axios
  ],
};
