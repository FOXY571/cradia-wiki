export function createToc(headings) {
  const content = Array.from(headings).map((h) => ({
    id: h.id,
    level: parseInt(h.tagName.substring(1)),
  }))

  return createTocHelper(content).toc
}

function createTocHelper(content, index = 0, currentLevel = 0) {
  const toc = []

  while (index < content.length) {
    const { id, level } = content[index]

    // If heading is equal to or larger than current heading - end of list of subheadings
    if (level <= currentLevel) {
      break
    }

    // If heading is smaller than current heading, get subheadings
    if (level > currentLevel) {
      const { toc: children, index: newIndex } = createTocHelper(content, index + 1, level)
      const heading = { text: id, children: children }
      toc.push(heading)
      index = newIndex
    }
  }

  return { toc, index }
}
