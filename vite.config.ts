import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel 部署：Vite 輸出 dist/，根目錄 api/ 由 Vercel 視為 Serverless Functions
export default defineConfig({
  plugins: [react()],
  server: { port: 24781, host: true },
  build: { outDir: 'dist', chunkSizeWarningLimit: 1600 }
})
