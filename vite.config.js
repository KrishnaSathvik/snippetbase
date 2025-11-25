import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            return 'vendor';
          }
          // Separate large data files (they're already dynamically imported, so this helps with caching)
          if (id.includes('seedSnippets')) {
            return 'snippets-data';
          }
          if (id.includes('cheatSheets')) {
            return 'cheatsheets-data';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600, // Increase limit since we're splitting chunks
  }
})
