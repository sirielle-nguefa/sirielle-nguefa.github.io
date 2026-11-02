import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Chemins relatifs : fonctionne sur <pseudo>.github.io comme sur <pseudo>.github.io/portfolio
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { chunkSizeWarningLimit: 1200 },
})
