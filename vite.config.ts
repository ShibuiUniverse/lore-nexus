import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Production builds are served at shibuiuniverse.com/lorekeeper/* via a
// Cloudflare Worker reverse proxy → Cloudflare Pages. Dev runs at the root
// of localhost so the workflow stays unchanged.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/lorekeeper/" : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));