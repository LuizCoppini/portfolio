import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Ajustado para o nome do seu repositório no GitHub
  base: "/portfolio/",
});