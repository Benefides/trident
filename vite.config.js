import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_BASE lets the same build run from a sub-folder (e.g. "./" for a static preview).
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
});
