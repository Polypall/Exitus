import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // site.webmanifest is already hand-maintained and linked in index.html,
      // so let the plugin only handle the service worker, not generate its own.
      manifest: false,
      includeAssets: [
        'favicon.ico', 'favicon.svg', 'apple-touch-icon.png',
        'web-app-manifest-192x192.png', 'web-app-manifest-512x512.png',
      ],
      workbox: {
        // Keep API calls (Emap chat, Stripe, Supabase) out of the SPA
        // navigation fallback, they're fetch/XHR calls, not page loads,
        // but excluding them here avoids surprises if that ever changes.
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
})
