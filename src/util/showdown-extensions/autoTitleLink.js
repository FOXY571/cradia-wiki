import entryHandler from '../entryHandler'

const { formatEntryName } = entryHandler()

const autoTitleLink = () => {
  const autoTitle = {
    type: 'output',
    filter: function (text) {
      const regex = /(<a[^>]*href="[^"]*\/([^"&]*)")([^>]*)(?!\s+title="[^"]*")([^>]*>)/g
      return text.replace(regex, (_match, p1, p2) => {
        const title = p2.includes('#') ? p2.split('#')[1] : p2
        return `${p1} title="${formatEntryName(title)}">`
      })
    },
  }

  return [autoTitle]
}

export default autoTitleLink
