import react from '@vitejs/plugin-react-swc'

import path from 'path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

const vendors = [`react`, `react-dom`]

export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: vendors,
          packages: ['i18next'],
        },
      },
      onLog(level, log, handler) {
        if (log.code === 'CYCLIC_CROSS_CHUNK_REEXPORT') return // Ignore circular dependency warnings
        handler(level, log)
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
      '/api': 'http://10.4.87.16:8084',
    },
  },
})
