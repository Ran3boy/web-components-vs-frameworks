import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/web-components-vs-frameworks/',
  plugins: [react()],
});