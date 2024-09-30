import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:6000",
        changeOrigin: true, // This might help with CORS
        rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite /api to empty string
      },
    },
  },
});
