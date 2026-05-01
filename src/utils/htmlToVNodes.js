import { h } from 'vue'

/**
 * Builds a lookup map from exact PascalCase component names to component definitions.
 */
function buildComponentMap(components) {
  const map = {}
  for (const [name, component] of Object.entries(components)) {
    map[name] = component
  }
  return map
}

/**
 * Attempts to parse a value as JSON if it looks like an object or array,
 * otherwise returns it as a plain string.
 */
function parseAttrValue(value) {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    try {
      return JSON.parse(trimmed)
    } catch {
      /* empty */
    }
  }
  return value
}

/**
 * Scans from `start` (the opening `<`) to the end of the tag, properly
 * handling both `"..."` and `'...'` attribute values. In single-quoted
 * values, `\'` is treated as an escaped apostrophe and does not end the value.
 * Returns the index immediately after the closing `>`.
 */
function scanTagEnd(html, start) {
  let i = start + 1 // skip <
  while (i < html.length) {
    const ch = html[i]
    if (ch === '>') return i + 1
    if (ch === '"') {
      i++ // skip opening "
      while (i < html.length && html[i] !== '"') i++
      if (i < html.length) i++ // skip closing "
    } else if (ch === "'") {
      i++ // skip opening '
      while (i < html.length) {
        if (html[i] === '\\') {
          i += 2
        } // skip escape sequence
        else if (html[i] === "'") {
          i++
          break
        } else i++
      }
    } else {
      i++
    }
  }
  return i
}

/**
 * Pre-processes raw markdown before md.render(), converting `\'` inside
 * single-quoted component attribute values to `&apos;` so that markdown-it's
 * HTML inline regex (`'[^']*'`) does not reject the tag.
 *
 * Convention: within single-quoted component attributes use `\'` for apostrophes
 * and `\"` for double-quotes. Bare `'` always closes the attribute value.
 *
 * @param {string} markdown - Raw markdown string.
 * @returns {string} Markdown with escaped apostrophes in component attributes replaced.
 */
export function preprocessMarkdown(markdown) {
  const out = []
  let i = 0

  while (i < markdown.length) {
    if (markdown[i] !== '<') {
      out.push(markdown[i++])
      continue
    }

    let j = i + 1
    const isClosing = markdown[j] === '/'
    if (isClosing) j++
    let tagName = ''
    while (j < markdown.length && /[A-Za-z0-9_-]/.test(markdown[j])) tagName += markdown[j++]

    if (!tagName || !(tagName[0] >= 'A' && tagName[0] <= 'Z')) {
      out.push(markdown[i++])
      continue
    }

    // Emit tag open and name
    out.push('<')
    if (isClosing) out.push('/')
    out.push(tagName)
    i = j

    // Process attributes, converting \' to &apos; in single-quoted values
    while (i < markdown.length) {
      const ch = markdown[i]
      if (ch === '>') {
        out.push('>')
        i++
        break
      }
      if (ch === '"') {
        out.push('"')
        i++
        while (i < markdown.length && markdown[i] !== '"') out.push(markdown[i++])
        if (i < markdown.length) {
          out.push('"')
          i++
        }
      } else if (ch === "'") {
        out.push("'")
        i++
        while (i < markdown.length) {
          const c = markdown[i]
          if (c === '\\' && markdown[i + 1] === "'") {
            out.push('&apos;')
            i += 2
          } else if (c === "'") {
            out.push("'")
            i++
            break
          } else {
            out.push(c)
            i++
          }
        }
      } else {
        out.push(ch)
        i++
      }
    }
  }

  return out.join('')
}

/**
 * Parses an attribute string into a props object.
 * Double-quoted values are read verbatim. In single-quoted values, `\'`
 * is treated as a literal apostrophe and does not end the value.
 * `&apos;` (inserted by preprocessMarkdown) is decoded back to `'`.
 */
function parseAttributes(attrStr) {
  const props = {}
  let i = 0
  while (i < attrStr.length) {
    while (i < attrStr.length && /\s/.test(attrStr[i])) i++
    if (i >= attrStr.length || attrStr[i] === '/') break

    let name = ''
    while (i < attrStr.length && !/[\s=/>]/.test(attrStr[i])) name += attrStr[i++]
    if (!name) {
      i++
      continue
    }

    while (i < attrStr.length && /\s/.test(attrStr[i])) i++
    if (attrStr[i] !== '=') {
      props[name] = true
      continue
    }
    i++ // skip =
    while (i < attrStr.length && /\s/.test(attrStr[i])) i++

    const quote = attrStr[i]
    if (quote === '"') {
      i++ // skip opening "
      let value = ''
      while (i < attrStr.length && attrStr[i] !== '"') value += attrStr[i++]
      if (attrStr[i] === '"') i++ // skip closing "
      props[name] = parseAttrValue(value)
    } else if (quote === "'") {
      i++ // skip opening '
      let value = ''
      while (i < attrStr.length) {
        if (attrStr[i] === '\\') {
          value += attrStr[i + 1] ?? ''
          i += 2
        } else if (attrStr[i] === "'") {
          i++
          break
        } else {
          value += attrStr[i++]
        }
      }
      // Decode &apos; inserted by preprocessMarkdown
      value = value.replace(/&apos;/g, "'")
      props[name] = parseAttrValue(value)
    }
  }
  return props
}

/**
 * Converts a DOMParser node to a VNode (used for non-component HTML fragments).
 */
function domNodeToVNode(node, componentMap) {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent || null
  if (node.nodeType !== Node.ELEMENT_NODE) return null
  const tagName = node.tagName
  const tag = componentMap[tagName] ?? tagName.toLowerCase()
  const props = {}
  for (const { name, value } of node.attributes) props[name] = parseAttrValue(value)
  const children = Array.from(node.childNodes)
    .map((c) => domNodeToVNode(c, componentMap))
    .filter((n) => n !== null && n !== '')
  return h(tag, props, children.length ? children : undefined)
}

/**
 * Converts an HTML string to an array of Vue vnodes, resolving any registered
 * components by their exact PascalCase tag name as defined.
 *
 * Component tags (uppercase first letter) are parsed directly — bypassing
 * DOMParser — so that `'` inside JSON attribute values is handled correctly,
 * even when it appears inside arrays or objects. All other HTML is passed
 * through DOMParser as normal.
 *
 * Attribute values that look like JSON objects or arrays are automatically parsed.
 *
 * @param {string} html - The HTML string to convert.
 * @param {Object} components - A map of PascalCase component names to component definitions.
 * @returns {VNode[]}
 */
export function htmlToVNodes(html, components) {
  const componentMap = buildComponentMap(components)
  const vnodes = []
  let i = 0
  let htmlBuffer = ''

  const flushHtmlBuffer = () => {
    if (!htmlBuffer) return
    const parser = new DOMParser()
    const doc = parser.parseFromString(`<div>${htmlBuffer}</div>`, 'text/html')
    for (const node of doc.body.firstChild.childNodes) {
      const vnode = domNodeToVNode(node, componentMap)
      if (vnode !== null && vnode !== '') vnodes.push(vnode)
    }
    htmlBuffer = ''
  }

  while (i < html.length) {
    if (html[i] !== '<') {
      htmlBuffer += html[i++]
      continue
    }

    // Peek: is this a component tag (uppercase first letter after < or </)?
    let j = i + 1
    const isClosing = html[j] === '/'
    if (isClosing) j++
    let tagName = ''
    while (j < html.length && /[A-Za-z0-9_-]/.test(html[j])) tagName += html[j++]

    if (!tagName || !(tagName[0] >= 'A' && tagName[0] <= 'Z')) {
      htmlBuffer += html[i++]
      continue
    }

    flushHtmlBuffer()

    const end = scanTagEnd(html, i)

    if (isClosing) {
      // Closing tags are consumed when processing their opening tag; skip.
      i = end
      continue
    }

    const fullTag = html.slice(i, end)
    const selfClosing = fullTag.trimEnd().endsWith('/>')

    const attrStart = i + 1 + tagName.length
    const attrEnd = selfClosing ? end - 2 : end - 1
    const attrStr = html.slice(attrStart, attrEnd).trim()
    const props = parseAttributes(attrStr)

    const component = componentMap[tagName] ?? tagName

    if (selfClosing) {
      vnodes.push(h(component, props))
      i = end
    } else {
      // Find the matching closing tag and recurse for children.
      const closeTag = `</${tagName}>`
      const closeIdx = html.indexOf(closeTag, end)
      const innerHtml = closeIdx === -1 ? '' : html.slice(end, closeIdx)
      const children = htmlToVNodes(innerHtml, components)
      vnodes.push(h(component, props, children.length ? children : undefined))
      i = closeIdx === -1 ? end : closeIdx + closeTag.length
    }
  }

  flushHtmlBuffer()
  return vnodes
}
