import markdownItAnchor from 'markdown-it-anchor'
import markdownitPlugins from './plugins'

const markdownItConfig = {
  markdownItOptions: {
    html: true,
  },
  markdownItSetup(md) {
    setUpMarkdownIt(md)
  },
}

const setUpMarkdownIt = (md) => {
  md.use(markdownItAnchor, {
    slugify: (s) => s.trim().toLowerCase().replace(/\s+/g, '-'),
    tabIndex: false,
  })

  Object.values(markdownitPlugins).forEach((plugin) => {
    md.use(plugin)
  })
}

export default markdownItConfig
