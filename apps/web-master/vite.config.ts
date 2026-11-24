import path from "path";
import { createRequire } from 'module';
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const require = createRequire(import.meta.url);
const tailwindPath = path.dirname(require.resolve('tailwindcss/package.json'));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      tailwindcss: tailwindPath,
    },
  },
});
