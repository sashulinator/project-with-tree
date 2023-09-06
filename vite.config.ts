import react from '@vitejs/plugin-react-swc'

import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import checker from 'vite-plugin-checker'

const vendors = [`react`, `react-dom`]

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
        '/api/v1/tree': env.DECISIONS_URL,
        '/api/v1/attribute': env.ATTRIBUTES_URL,
        '/api/v1/rule': env.RULES_URL,
      },
    },
  }
})
