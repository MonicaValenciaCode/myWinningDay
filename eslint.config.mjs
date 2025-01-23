import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Ignore configuration block
  {
    ignores: [
      ".next/**", // Ignore all .next files
      "node_modules/**", // Ignore node_modules
      "build/**", // Ignore build artifacts
      "dist/**", // Ignore dist directory
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Lint source files
  },
  ...compat.extends(
    "next/core-web-vitals", // Core Web Vitals rules
    "next" // General Next.js rules
  ),
];
