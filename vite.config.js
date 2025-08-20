import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      failOnError: false, // 🚫 don't stop dev server for lint errors
      failOnWarning: false, // 🚫 don't stop for warnings either
    }),
  ],
  server: {
    hmr: {
      overlay: false, // 🚫 disable in-browser error overlay
    },
  },
});
