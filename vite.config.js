import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main:              resolve(__dirname, 'index.html'),
        sonoterapia:       resolve(__dirname, 'sonoterapia.html'),
        reiki:             resolve(__dirname, 'reiki.html'),
        'reiki-online':    resolve(__dirname, 'reiki-online.html'),
        'sono-acuatica':   resolve(__dirname, 'sonoterapia-acuatica.html'),
        ceremonias:        resolve(__dirname, 'ceremonias.html'),
      },
    },
  },
});
