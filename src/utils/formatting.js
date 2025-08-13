/**
 * Formats the entry name by replacing dashes with spaces and capitalizing the first letter of each word.
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
