import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Assign the configuration array to a named variable
const eslintConfig = [
  {
    ignores: [
      ".next/**", // Ignore build artifacts
      "node_modules/**", // Ignore node_modules
      "build/**", // Ignore build
      "dist/**", // Ignore dist
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Target source files
  },
  ...compat.extends(
    "next/core-web-vitals", // Core Web Vitals rules
    "next" // General Next.js rules
  ),
];

// Export the variable as the default export
export default eslintConfig;
