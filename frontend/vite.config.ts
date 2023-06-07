import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { setupProxy } from './setupProxy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/apis': setupProxy,
    }
  }
})
