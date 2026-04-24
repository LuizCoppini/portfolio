import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Se seu repositório for github.com/LuizCoppini/portfolio, defina o base:
  // base: "/portfolio/",
  // Se for github.com/LuizCoppini/LuizCoppini.github.io, deixe como "/":
  base: "/",
});
