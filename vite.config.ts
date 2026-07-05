import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// Plugin to serve index.html from public subdirectories (like a static server)
function publicIndexPlugin() {
  return {
    name: "serve-public-index",
    configureServer(server: any) {
      server.middlewares.use((req: any, _res: any, next: any) => {
        const url = req.url?.split("?")[0] ?? "";
        if (url.endsWith("/")) {
          const filePath = path.resolve(__dirname, "public", url.slice(1), "index.html");
          if (fs.existsSync(filePath)) {
            req.url = url + "index.html";
          }
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE_URL ?? '/',
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [publicIndexPlugin(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
