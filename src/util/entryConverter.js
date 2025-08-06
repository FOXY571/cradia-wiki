import showdown from 'showdown'
import showdownExtensions from '../showdown-extensions'

const entryConverter = new showdown.Converter({
  extensions: showdownExtensions,
  tables: true,
  ghCompatibleHeaderId: true,
})

export default entryConverter
