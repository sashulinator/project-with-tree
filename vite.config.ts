import presetWind from '@unocss/preset-wind'
import react from '@vitejs/plugin-react-swc'

import path from 'path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

const vendors = [`react`, `react-dom`]

export default defineConfig({
  plugins: [
    react(),
    checker({ typescript: true }),
    UnoCSS({
      presets: [presetWind()],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: vendors,
          packages: ['i18next'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/v1': 'http://localhost:3000',
    },
  },
})
