import entries from '../content/entries'

const entryHandler = () => {
  const getAllEntryNames = () => {
    return Object.keys(entries)
  }

  const getEntry = (entryName) => {
    return entries[entryName].default
  }

  const getEntryProp = (entryName, propName) => {
    const entryProps = { ...entries[entryName] }
    delete entryProps.default // Remove the default content from props

    return entryProps[propName] != false
  }

  const getRandomEntryName = () => {
    const entryNames = Object.keys(entries)
    if (entryNames.length === 0) return null

    return entryNames[Math.floor(Math.random() * entryNames.length)]
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
    getEntryProp,
    getRandomEntryName,
    formatEntryName,
  }
}

export default entryHandler
