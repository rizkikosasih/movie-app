import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/movie-app/',
  plugins: [tailwindcss(), react()],
  server: {
    host: true
  }
});
