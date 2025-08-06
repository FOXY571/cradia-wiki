import entryHandler from '../util/entryHandler'

const { formatEntryName } = entryHandler()

const autoTitleLink = () => {
  const autoTitle = {
    type: 'output',
    filter: function (text) {
      const regex = /(<a[^>]*href="[^"]*\/([^"&]*)")([^>]*)(?!\s+title="[^"]*")([^>]*>)/g
      return text.replace(regex, (_match, p1, p2) => {
        return `<a ${p1.replace('<a', '')} title="${formatEntryName(p2)}">`
      })
    },
  }

  return [autoTitle]
}

export default autoTitleLink
