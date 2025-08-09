import entriesHandler from '../util/entryHandler'
import entryConverter from './entryConverter'

const { getEntry, formatEntryName } = entriesHandler()

const contentLoader = () => {
  const loadContentFromRoute = async (route) => {
    // Decode the last segment of the path to handle unicode characters
    const entryName = decodeURIComponent(route.path.split('/').pop() || 'home')

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
