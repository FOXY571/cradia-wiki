import showdownHelper from '../showdownHelper'

const { convertSingleLine, escapeQuotes } = showdownHelper()

const note = () => {
  const note = {
    type: 'lang',
    filter: function (text, converter) {
      const regex = /\({(.*?)}\)/gs
      return text.replace(regex, (_match, p1) => {
        const args = p1
          .trim()
          .split('|')
          .map((arg) => arg.trim())

        const [type, label, text] = args
        return makeNote(
          escapeQuotes(convertSingleLine(label || '', converter)),
          escapeQuotes(convertSingleLine(text || '', converter)),
          type,
        )
      })
    },
  }

  const makeNote = (label, text, type) => {
    return `<NoteBlock
      label="${label}"
      text="${text}"
      type="${type}"
    />`
  }

  return [note]
}

export default note
