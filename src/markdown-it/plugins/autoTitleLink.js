import { formatEntryName } from '../../utils/formatting'

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
      const entryName = hrefAttr.replace(/^\/+/, '')
      // Set the new title of the entry link here:
      const title = formatEntryName(entryName)

      token.attrSet('title', title)
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}

export default autoTitleLink
