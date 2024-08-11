import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), swcPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
<<<<<<< HEAD
        '@': resolve('src/renderer/src')
=======
        '@main': resolve('src/main'),
        '@preload': resolve('src/preload'),
>>>>>>> 5095f491525e76447a40d89d34828e9d282c5da2
      }
    },
    plugins: [react()]
  }
})
