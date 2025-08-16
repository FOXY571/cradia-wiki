import { formatEntryName, formatHeaderId } from '../../utils/formatting'

function autoTitleLink(md) {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, _env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefAttr = token.attrGet('href')

    if (hrefAttr && hrefAttr.startsWith('/')) {
      const location = hrefAttr.replace(/^\/+/, '')
      const title = formatLocation(location)

      token.attrSet('title', title)
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}

function formatLocation(location) {
  if (location.includes('#')) {
    const headerId = location.split('#')[1]
    return formatHeaderId(headerId)
  } else {
    return formatEntryName(location)
  }
}

export default autoTitleLink
