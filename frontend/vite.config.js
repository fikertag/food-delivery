import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginRequire from "vite-plugin-require";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginRequire.default()],
  server: {
    host: "0.0.0.0", // Allows network access
    port: 3000, // You can change this if needed
  },
});
