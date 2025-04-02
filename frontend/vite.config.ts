import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      // Configuración para manejar rutas de la API si es necesario
    },
  },
  preview: {
    port: 5000,
  },
  build: {
    outDir: "dist",
  },
});
