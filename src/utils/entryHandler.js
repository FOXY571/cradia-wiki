import entries from '../content/entries'

/**
 * Get the names of all loaded entries.
 *
 * @returns {string[]} An array of all entry names.
 */
export function getAllEntryNames() {
  return Object.keys(entries)
}

/**
 * Get the content of a specific entry.
 *
 * @param {string} entryName - The name of the entry to retrieve.
 * @returns {string} The content of the entry.
 */
export function getEntry(entryName) {
  return entries[entryName].default
}

/**
 * Get a specific property of an entry.
 *
 * @param {string} entryName - The name of the entry.
 * @param {string} propName - The name of the property to retrieve.
 * @returns {boolean} The value of the property, or true if not found.
 */
export function getEntryProp(entryName, propName) {
  const entryProps = { ...entries[entryName] }
  delete entryProps.default // Remove the default content from props

  return entryProps[propName] != false
}

/**
 * Get a random entry name.
 *
 * @returns {string|null} A random entry name, or null if no entries exist.
 */
export function getRandomEntryName() {
  const entryNames = Object.keys(entries)
  if (entryNames.length === 0) return null

  return entryNames[Math.floor(Math.random() * entryNames.length)]
}
