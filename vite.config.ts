import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@libs': path.resolve(__dirname, './src/libs'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  base: '/utidocarro-frontend/',
});
