import entriesHandler from '../util/entryHandler'
import entryConverter from './entryConverter'

const { getEntry, entryExists, formatEntryName } = entriesHandler()

const contentLoader = () => {
  const loadContentFromRoute = async (route) => {
    // Decode the last segment of the path to handle unicode characters
    const entryName = decodeURIComponent(route.path.split('/').pop() || 'home')

    if (!entryExists(entryName)) {
      return `
        <h1>404</h1>
        <p>
          It looks like you steered off course! Unfortunately, there is no entry for <i>${formatEntryName(entryName)}</i> :(
        </p>
        <p>
          Please click <a title="Home" href="/">here</a> to go back to safety.
        </p>
      `
    }

    if (entryName !== 'home') {
      document.title = `${formatEntryName(entryName)} - Cradia Wiki`
    }

    const text = await getEntry(entryName)
    return entryConverter.makeHtml(text)
  }

  return {
    loadContentFromRoute,
  }
}

export default contentLoader
