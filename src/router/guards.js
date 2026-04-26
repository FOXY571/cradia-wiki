import { getAllEntryNames } from '../utils/entryHandler'

export function registerGuards(router) {
  router.beforeEach((to) => {
    if (to.path === '/wiki' || to.path === '/wiki/') {
      return '/'
    }

    if (to.path !== '/') {
      return entryRedirectGuard(to)
    }
  })
}

function entryRedirectGuard(to) {
  let newPath = to.path

  // Make sure path starts with /wiki
  if (!newPath.startsWith('/wiki')) {
    newPath = `/wiki/${newPath.replace(/^\//, '')}`
  }

  // Capitalize first letter of entry name
  const entryName = newPath.split('/wiki/')[1]
  const capitalizedEntryName = entryName.charAt(0).toUpperCase() + entryName.slice(1)
  newPath = `/wiki/${capitalizedEntryName}`

  // Check if it matches an existing entry name
  const allEntryNames = getAllEntryNames()
  const matchingEntry = allEntryNames.find(
    (name) => name.toLowerCase() === capitalizedEntryName.toLowerCase(),
  )
  if (matchingEntry) {
    newPath = `/wiki/${matchingEntry}`
  }

  if (newPath !== to.path) {
    return newPath
  }
}
