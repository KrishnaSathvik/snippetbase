import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'vite.svg'],
      manifest: {
        name: 'SnippetBase - Code Knowledge Base',
        short_name: 'SnippetBase',
        description: 'Your complete knowledge base for developers. Find production-tested code snippets, quick reference cheat sheets, and more.',
        theme_color: '#000000',
        background_color: '#FAFAF5',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ],
        start_url: '/',
        scope: '/',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 3001,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Put React and all React-dependent libraries in the same chunk
          if (id.includes('node_modules')) {
            // React core and router - MUST be in react-vendor
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Radix UI and cmdk (they depend on React)
            if (id.includes('@radix-ui') || id.includes('cmdk')) {
              return 'react-vendor';
            }
            // Other React-dependent libraries
            if (id.includes('react-hot-toast') || id.includes('lucide-react')) {
              return 'react-vendor';
            }
            // Libraries that might use React hooks or APIs - catch all React dependencies
            if (id.includes('use-') || id.includes('react-') || id.includes('sidecar') || 
                id.includes('react-remove-scroll') || id.includes('react-style-singleton') ||
                id.includes('use-callback-ref') || id.includes('use-sidecar') ||
                id.includes('goober') || id.includes('@floating-ui')) {
              return 'react-vendor';
            }
            // Other vendor libraries (non-React)
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
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  }
})
