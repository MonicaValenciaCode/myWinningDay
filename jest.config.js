const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom", // Explicitly specify the environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Jest setup file
};

module.exports = createJestConfig(customJestConfig);
