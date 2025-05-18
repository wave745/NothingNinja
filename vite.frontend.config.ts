import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './client/src'),
      '@components': resolve(__dirname, './client/src/components'),
      '@lib': resolve(__dirname, './client/src/lib'),
      '@hooks': resolve(__dirname, './client/src/hooks'),
      '@pages': resolve(__dirname, './client/src/pages'),
      '@shared': resolve(__dirname, './shared'),
      '@assets': resolve(__dirname, './client/assets'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});