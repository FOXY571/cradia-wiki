import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownitPlugins from './plugins'

export const md = new MarkdownIt({
  html: true,
})

md.use(markdownItAnchor, {
  slugify: (s) => s.replace(/ /g, '_'),
  tabIndex: false,
})

Object.values(markdownitPlugins).forEach((plugin) => {
  md.use(plugin)
})

export default md
