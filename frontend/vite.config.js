import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/login': 'http://localhost:3050',
      '/conteudos': 'http://localhost:3050',
      '/infoads': 'http://localhost:3050',
      '/perguntas': 'http://localhost:3050',
      '/respostas': 'http://localhost:3050',
      '/vestibulares': 'http://localhost:3050',
      '/api-status': 'http://localhost:3050'
    }
  }
})
