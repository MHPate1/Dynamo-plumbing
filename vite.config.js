import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [react(), imagetools()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // rolldown (Vite v8) requires manualChunks to be a function, not an object
        manualChunks(id) {
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('react-router-dom')) return 'router';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
})
