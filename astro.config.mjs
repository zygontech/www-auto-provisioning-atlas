// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "static",
  base: "/www-apps-provisioning-encyclopedia/",
  vite: {
    build: {
      outDir: "dist",
    },
  },
});
