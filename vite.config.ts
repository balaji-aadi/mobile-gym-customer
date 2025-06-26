import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://192.168.1.17:5009",
        changeOrigin: true,
      },
    },
  },
});
