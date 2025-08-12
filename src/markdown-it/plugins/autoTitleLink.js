const autoTitleLink = (md) => {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, _env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefAttr = token.attrGet('href')

    if (hrefAttr && hrefAttr.startsWith('/')) {
      const href = hrefAttr.replace(/^\/+/, '')
      // Set the new title of the entry link here:
      const title = formatHref(href)

      token.attrSet('title', title)
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}

// This is taken from formatEntryName in ../../utils/entryHandler
// Importing entryHandler causes an error (still looking into it)
const formatHref = (href) => {
  let formattedHref = href
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
  return formattedHref
}

export default autoTitleLink
