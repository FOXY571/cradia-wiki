const entries = import.meta.glob('../content/entries/*.md', { query: '?raw', import: 'default' })

const entryHandler = () => {
  const getEntry = async (entryName) => {
    const entry = entries[`../content/entries/${entryName}.md`]
    if (!entry) throw new Error(`Entry "${entryName}" does not exist.`)

    console.log(`Fetched ${entryName} entry successfully`)
    return await entry()
  }

  const getRandomEntryName = () => {
    const entryPaths = Object.keys(entries)
    if (entryPaths.length === 0) return null

    const randomPath = entryPaths[Math.floor(Math.random() * entryPaths.length)]
    return extractNameFromPath(randomPath)
  }

  const entryExists = (entryName) => {
    return Object.keys(entries).includes(`../content/entries/${entryName}.md`)
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
    getEntry,
    getRandomEntryName,
    entryExists,
    formatEntryName,
  }
}

const extractNameFromPath = (path) => {
  const match = path.match(/\/([^/]+)\.md$/)
  return match ? match[1] : null
}

export default entryHandler
