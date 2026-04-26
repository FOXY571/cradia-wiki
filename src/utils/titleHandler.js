import config from '../config'

/**
 * Adds a suffix to the document's title. i.e. "Page Title - Cradia Wiki"
 *
 * @param {string} title - The title to set.
 */
export function setTitle(title) {
  document.title = `${title} - ${config.wikiName} Wiki`
}
