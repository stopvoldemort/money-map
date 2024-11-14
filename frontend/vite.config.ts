import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react()],
    server: {
      port: Number(env.PORT) || 8080,
      proxy: {
        "/api": {
          target: "http://backend:5000", // Your Flask backend
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api /, "/api"),
        },
      },
      cors: true,
    },
  });
});
