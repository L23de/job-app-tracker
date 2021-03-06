import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

const path = require('path')

export default defineConfig({
  base: '/job-app-tracker/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    quasar({
      autoImportComponentCase: 'combined',
      sassVariables: 'src/css/quasar-variables.sass'
    })
  ]
})