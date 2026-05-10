import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import { componentPlugin } from '@mdit-vue/plugin-component'
import markdownitPlugins from './plugins'

export const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: false,
})

md.use(markdownItAnchor, {
  slugify: (s) => s.replace(/ /g, '_'),
  tabIndex: false,
})

md.use(componentPlugin, {
  // Options
})

Object.values(markdownitPlugins).forEach((plugin) => {
  md.use(plugin)
})

export default md
