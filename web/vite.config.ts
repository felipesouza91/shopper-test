import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig( ({mode}) => {
  const {GOOGLE_API_KEY = ''} = loadEnv(mode, process.cwd(), '')
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return {
    server: {
      port: 80
    },
    plugins: [react()]
  }
})


