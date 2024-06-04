/// <reference types="vitest" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    testTimeout: 10000,
  },
  plugins: [vue()],
  base: "/Testing-Ecommerce/",
});
