import path from "path"
import react from "@vitejs/plugin-react"
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [nodePolyfills(), react()],
  optimizeDeps: {
    include: ['webtorrent/webtorrent.min.js'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})