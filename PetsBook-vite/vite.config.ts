import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'https://localhost:44391',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    port: 5174,
    strictPort: true
  }
})
