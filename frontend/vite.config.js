import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/login': 'http://localhost:3000',
      '/conteudos': 'http://localhost:3000',
      '/infoads': 'http://localhost:3000',
      '/perguntas': 'http://localhost:3000',
      '/respostas': 'http://localhost:3000',
      '/vestibulares': 'http://localhost:3000',
      '/api-status': 'http://localhost:3000'
    }
  }
})
