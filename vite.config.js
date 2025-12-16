import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/star-wars-english/", // <--- AÑADE ESTA LÍNEA (asegúrate que coincida con el nombre de tu repo en GitHub)
})