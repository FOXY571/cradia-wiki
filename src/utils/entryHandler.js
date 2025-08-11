const entries = import.meta.glob('../content/entries/*.md', { query: '?raw', import: 'default' })

const entryHandler = () => {
  const getAllEntryNames = () => {
    const entryPaths = Object.keys(entries)
    return entryPaths.map((path) => extractNameFromPath(path))
  }

  const getEntry = async (entryName) => {
    const module = await import(`../content/entries/${entryName}.md`)
    return module.default
  }

  const getRandomEntryName = () => {
    const entryPaths = Object.keys(entries)
    if (entryPaths.length === 0) return null

    const randomPath = entryPaths[Math.floor(Math.random() * entryPaths.length)]
    return extractNameFromPath(randomPath)
  }

  const formatEntryName = (entryName) => {
    let formattedName = entryName
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => {
        let punctuationBefore = word.match(/^[^\w\u00C0-\u017F]+/)
        let punctuationAfter = word.match(/[^\w\u00C0-\u017F]+$/)

        let cleanWord = word.replace(/^[^\w\u00C0-\u017F]+|[^\w\u00C0-\u017F]+$/g, '')
        let formattedWord = cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1)

        return (
          (punctuationBefore ? punctuationBefore[0] : '') +
          formattedWord +
          (punctuationAfter ? punctuationAfter[0] : '')
        )
      })
      .join(' ')
    return formattedName
  }

  return {
    getAllEntryNames,
    getEntry,
    getRandomEntryName,
    formatEntryName,
  }
}

const extractNameFromPath = (path) => {
  const match = path.match(/\/([^/]+)\.md$/)
  return match ? match[1] : null
}

export default entryHandler
