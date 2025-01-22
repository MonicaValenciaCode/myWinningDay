const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom", // Explicitly specify the environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Jest setup file
  collectCoverage: true, // Enable coverage collection
  coverageThreshold: {
    // Set coverage thresholds
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
