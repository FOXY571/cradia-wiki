import {formatEntryName} from '../../data/entries.js';

const entryConverter = new showdown.Converter({
  extensions: [...bindingsOverride(), infoboxExt, noteExt, hatnoteExt, autoTitleExt],
  tables: true
});
export default entryConverter;

function bindingsOverride() {
  const classMap = {
    table: 'content-table'
  }
  
  const bindings = Object.keys(classMap)
    .map(key => ({
      type: 'output',
      regex: new RegExp(`<${key}>`, 'g'),
      replace: `<${key} class="${classMap[key]}" $1>`
    }));
  
  return bindings;
}

function infoboxExt() {
  const infobox = {
    type: 'lang',
    filter: function(text, converter) {
      const regex = /\({(.*?)}\)/gs;
      return text.replace(regex, (match, p1, p2) => {
        const lines = p1.trim().split('\n').map(line => line.trim());
        let output = '<div class="infobox">';

        lines.forEach(line => {
          if (line.startsWith('|')) {
            const parts = line.slice(1).split(':')

            if (parts.length == 2) {
              const header = parts[0];
              const value = parts[1];

              output += `<tr><th>${converter.makeHtml(header)}</th><td>${converter.makeHtml(value)}</td></tr>`;
            }
          } else if (line.startsWith('#')) {
            if (output) {
              output += '</tbody></table>';
            }
            output += `<div class="infobox-${line.startsWith('##') ? 'header' : 'title'}">${line.replace(/#/g, ' ')}</div><table cellpadding="4"><tbody>`;
          }
        });

        output += '</tbody></table></div>';
        output = output.replace(/<p>/g, '');
        output = output.replace(/<\/p>/g, '');

        return output;
      });
    }
  }

  return [infobox];
}

function noteExt() {
  const note = {
    type: 'lang',
    filter: function(text, converter) {
      const regex = /:::(note):::(.*?):::/gs;
      return text.replace(regex, (match, p1, p2) => {
        return makeNote('note', p2, converter);
      });
    }
  }

  const warning = {
    type: 'lang',
    filter: function(text, converter) {
      const regex = /:::(warning):::(.*?):::/gs;
      return text.replace(regex, (match, p1, p2) => {
        return makeNote('warning', p2, converter);
      });
    }
  }

  function makeNote(type, text, converter) {
    let output = `<div class="${type}"><div>${converter.makeHtml(text)}</div></div>`;
    output = output.replace(/<p>/g, '<span>');
    output = output.replace(/<\/p>/g, '</span>');
    return output;
  }

  return [note, warning];
}

function hatnoteExt() {
  const hatnote = {
    type: 'lang',
    filter: function(text, converter) {
      const regex = /^(::)[ \t]*(.*?)[ \t]*#*\n+/gm;
      return text.replace(regex, (match, p1, p2) => {
        return `<div class="hatnote">${converter.makeHtml(p2)}</div>`;
      });
    }
  }

  return [hatnote];
}

function autoTitleExt() {
  const autoTitle = {
    type: 'output',
    filter: function(text) {
      const regex = /(<a[^>]*href="[^"]*\?entry=([^"&]*)")([^>]*)(?!\s+title="[^"]*")([^>]*>)/g;
      return text.replace(regex, (match, p1, p2) => {
        return `<a ${p1.replace('<a', '')} title="${formatEntryName(p2)}">`;
      });
    }
  }

  return [autoTitle];
}