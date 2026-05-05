import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ВАЖНО: замени 'bulatov-resume' на имя твоего GitHub-репозитория
// Например, если репозиторий https://github.com/username/my-cv → ставь '/my-cv/'
export default defineConfig({
  plugins: [react()],
  base: '/cv/',
})
