// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Amazon-clone-final/", // replace with your actual repository name
  build: {
    chunkSizeWarningLimit: 1000, // Adjust the chunk size limit as needed
  },
});
