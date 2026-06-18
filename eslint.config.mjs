import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,

  // Front-end
  {
    files: ["public/**/*.js"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // Back-end
  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Testes
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
]);