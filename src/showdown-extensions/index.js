import object from './object'
import note from './note'
import hatnote from './hatnote'
import soundCloudPlayer from './soundCloudPlayer'
import autoTitleLink from './autoTitleLink'
import tableWrapper from './tableWrapper'

const bindingsOverride = () => {
  const classMap = {
    table: 'content-table',
  }

  const bindings = Object.keys(classMap).map((key) => ({
    type: 'output',
    regex: new RegExp(`<${key}>`, 'g'),
    replace: `<${key} class="${classMap[key]}">`,
  }))

  return bindings
}

export default [
  ...bindingsOverride(),
  object,
  note,
  hatnote,
  soundCloudPlayer,
  autoTitleLink,
  tableWrapper,
]
