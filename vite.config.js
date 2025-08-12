import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import markdown from 'unplugin-vue-markdown/vite'

import markdownItAnchor from 'markdown-it-anchor'
import markdownitExtensions from './src/markdown/plugins'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // Allows Vue to compile Markdown files
    }),
    vueDevTools(),
    markdown({
      markdownItOptions: {
        html: true,
        wrapperComponent: true,
      },
      markdownItSetup(md) {
        md.use(markdownItAnchor, {
          slugify: (s) => s.trim().toLowerCase().replace(/\s+/g, '-'),
          tabIndex: false,
        })

        Object.values(markdownitExtensions).forEach((plugin) => {
          md.use(plugin)
        })
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
