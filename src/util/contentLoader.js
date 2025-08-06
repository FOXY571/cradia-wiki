import entriesHandler from '../util/entryHandler.js'

const { getEntry, entryExists, formatEntryName } = entriesHandler()

const contentLoader = () => {
  const loadContentFromRoute = async (route) => {
    const entryName = route.path.split('/').pop() || 'home'

    if (!entryExists(entryName)) {
      return `
        <h1>404</h1>
        <p>
          It looks like you steered off course! Unfortunately, there is no entry for <i>${formatEntryName(entryName)}</i> :(
        </p>
        <p>
          Please click <a href="?entry=home" title="Home">here</a> to go back to safety.
        </p>
      `
    }

    return await getEntry(entryName)
  }

  return {
    loadContentFromRoute,
  }
}

export default contentLoader
