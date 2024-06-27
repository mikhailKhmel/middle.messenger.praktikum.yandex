import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
  root,
  build: {
    outDir,
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        main: resolve(root, 'pages', 'main', 'index.html'),
        signin: resolve(root, 'pages', 'signin', 'index.html'),
        signup: resolve(root, 'pages', 'signup', 'index.html'),
        notfound: resolve(root, 'pages', 'notfound', 'index.html'),
        error: resolve(root, 'pages', 'error', 'index.html'),
        profile: resolve(root, 'pages', 'profile', 'index.html'),
        edit: resolve(root, 'pages', 'profile', 'edit', 'index.html'),
        password: resolve(root, 'pages', 'profile', 'password', 'index.html'),
      },
    },
  },
})
