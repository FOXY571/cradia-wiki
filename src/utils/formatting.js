/**
 * Formats the entry name by replacing dashes with spaces and capitalizing the first letter of each word.
 * Example: "my-entry" -> "My Entry"
 *
 * @param {string} entryName - The entry name to format.
 * @returns {string} The formatted entry name.
 */
export function formatEntryName(entryName) {
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
