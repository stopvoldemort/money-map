import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log("FRONTEND ENV:", env);

  const formVersion = process.env.VITE_GIT_VERSION || 'dev';

  return defineConfig({
    plugins: [react()],
    define: {
      FORM_VERSION: JSON.stringify(formVersion),
    },
  });
});
