import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Optional: Ensures local dev runs on this port
  },
  build: {
    outDir: "dist", // Ensures build files go to the right directory
  },
  preview: {
    port: 4173, // Optional: Vite preview port
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
