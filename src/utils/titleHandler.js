import config from '../config'

/**
 * Adds a suffix to the document's title. i.e. "Page Title - Some Wiki"
 *
 * @param {string} title - The title to set.
 */
export function setTitle(title) {
  document.title = `${title} - ${config.wikiName} Wiki`
}

/**
 * Resets the document's title to the default wiki name. i.e. "Some Wiki"
 */
export function resetTitle() {
  document.title = `${config.wikiName} Wiki`
}
