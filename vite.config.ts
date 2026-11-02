import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/which-cat-are-you/',
  plugins: [react()],
  test: { include: ['src/**/*.test.ts'] },
} as never);
