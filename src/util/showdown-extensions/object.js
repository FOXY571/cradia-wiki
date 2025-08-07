const object = () => {
  const object = {
    type: 'lang',
    filter: function (text, converter) {
      const regex = /\({(.*?)}\)/gs
      return text.replace(regex, (_match, p1) => {
        const type = p1.trim().split('\n')[0]
        type.trim()
        const text = p1.replace(type, '')

        switch (type) {
          case 'infobox':
            return makeInfobox(text, converter)
          case 'figure':
            return makeFigure(text, converter)
          case 'linkbox':
            return makeLinkbox(text, converter)
          default:
            return converter.makeHtml(p1)
        }
      })
    },
  }

  const makeInfobox = (text, converter) => {
    const lines = text
      .trim()
      .split('\n')
      .map((line) => line.trim())
    let output = '<div class="infobox">'

    lines.forEach((line) => {
      if (line.startsWith('|')) {
        const parts = line.slice(1).split(':')

        if (parts.length == 2) {
          const header = parts[0]
          const value = parts[1]

          output += `<tr><th>${converter.makeHtml(header)}</th><td>${converter.makeHtml(value)}</td></tr>`
        }
      } else if (line.startsWith('#')) {
        if (output) {
          output += '</tbody></table>'
        }
        output += `<div class="infobox-${line.startsWith('##') ? 'header' : 'title'}">${line.replace(/#/g, '')}</div><table cellpadding="4"><tbody>`
      } else {
        output += converter.makeHtml(line)
      }
    })

    output += '</tbody></table></div>'
    output = output.replace(/<p>/g, '')
    output = output.replace(/<\/p>/g, '')

    return output
  }

  const makeFigure = (text, converter) => {
    const lines = text
      .trim()
      .split('\n')
      .map((line) => line.trim())
    let output = '<figure>'

    output += converter.makeHtml(lines[0]) + '\n<figcaption>'
    for (let i = 1; i < lines.length; i++) {
      output += converter.makeHtml(lines[i])
    }

    output += '</figcaption></figure>'
    output = output.replace(/<p>/g, '')
    output = output.replace(/<\/p>/g, '')

    return output
  }

  const makeLinkbox = (text, converter) => {
    const lines = text
      .trim()
      .split('\n')
      .map((line) => line.trim())
    let output = '<div class="linkbox">'

    output += `<div class="linkbox-title">${lines[0].replace(/#/g, '')}</div><ul>`
    for (let i = 1; i < lines.length; i++) {
      output += '<li>' + converter.makeHtml(lines[i]) + '</li>'
    }

    output += '</ul></div>'
    output = output.replace(/<p>/g, '')
    output = output.replace(/<\/p>/g, '')

    return output
  }

  return [object]
}

export default object
