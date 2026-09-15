import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The API_PROXY_TARGET env var lets the dev server proxy /api and /uploads
// to the Express backend (site/server) without hard-coding a port.
const apiTarget = process.env.API_PROXY_TARGET || 'http://localhost:4000';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': apiTarget,
      '/uploads': apiTarget,
    },
  },
});
