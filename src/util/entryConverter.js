import markdownit from 'markdown-it'
//import showdownExtensions from './showdown-extensions'

const entryConverter = markdownit({
  html: true,
})

export default entryConverter
