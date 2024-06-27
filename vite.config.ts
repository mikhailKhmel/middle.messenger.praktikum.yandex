import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  root,
  build: {
    outDir,
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        notfound: resolve(root, 'pages', 'notfound', 'index.html'),
        error: resolve(root, 'pages', 'error', 'index.html'),
      },
    },
  },
});
