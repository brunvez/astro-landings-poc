/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/restoreEnv.js", "./tests/setupHelpers.js"],
  },
});