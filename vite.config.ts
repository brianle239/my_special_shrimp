import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://brianle239.github.io/my_special_shrimp/',
  plugins: [react()],
})
