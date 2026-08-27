import { defineConfig } from "vitest/config";
import dotenv from "dotenv";


export default defineConfig({
  test: {
    globalSetup: ["./vitest.global-setup.ts"],
    setupFiles: ["./vitest.setup.ts"],
  },
});