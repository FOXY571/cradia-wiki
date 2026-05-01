import { getCollection, getDocument } from '../firebase/databaseHandler'

const COLLECTION = 'entries'

/**
 * Get the names of all registered entries.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of all registered entry names.
 */
export async function getAllEntryNames() {
  const snapshot = await getCollection(COLLECTION)
  return snapshot.map((d) => d.id)
}

/**
 * Get the data of a specific registered entry.
 *
 * @param {string} entryName - The name of the entry to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to an object containing the entry ID and data, or null if not found.
 */
export async function getEntry(entryName) {
  const snap = await getDocument(COLLECTION, entryName)
  if (!snap) return null
  return snap
}
