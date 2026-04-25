/**
 * Formats the entry name by replacing underscores with spaces
 * Example: "My_entry" -> "My entry"
 *
 * @param {string} entryName - The entry name to format.
 * @returns {string} The formatted entry name.
 */
export function formatEntryName(entryName) {
  return entryName.replace(/_/g, ' ')
}

/**
 * Formats the header id by replacing underscores with spaces.
 * Example: "My_header" -> "My header"
 *
 * @param {string} headerId - The header id to format.
 * @returns {string} The formatted header id.
 */
export function formatHeaderId(headerId) {
  return headerId.replace(/_/g, ' ')
}
