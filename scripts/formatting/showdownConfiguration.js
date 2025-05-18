import {formatEntryName} from '../../data/entries.js';

const entryConverter = new showdown.Converter({
  extensions: [...bindingsOverride(), objectExt, noteExt, hatnoteExt, autoTitleExt, tableWrapperExt],
  tables: true,
  ghCompatibleHeaderId: true
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
      replace: `<${key} class="${classMap[key]}">`
    }));
  
  return bindings;
}

function objectExt() {
  const object = {
    type: 'lang',
    filter: function(text, converter) {
      const regex = /\({(.*?)}\)/gs;
      return text.replace(regex, (_match, p1, _p2) => {
        const type = p1.trim().split('\n')[0];
        type.trim();
        const text = p1.replace(type, '');

        switch (type) {
          case 'infobox': return makeInfobox(text, converter);
          case 'figure': return makeFigure(text, converter);
          case 'linkbox': return makeLinkbox(text, converter);
          default: return converter.makeHtml(p1);
        }
      });
    }
  }

  function makeInfobox(text, converter) {
    const lines = text.trim().split('\n').map(line => line.trim());
    let output = '<div class="infobox">';

    lines.forEach(line => {
      if (line.startsWith('|')) {
        const parts = line.slice(1).split(':');

        if (parts.length == 2) {
          const header = parts[0];
          const value = parts[1];

          output += `<tr><th>${converter.makeHtml(header)}</th><td>${converter.makeHtml(value)}</td></tr>`;
        }
      } else if (line.startsWith('#')) {
        if (output) {
          output += '</tbody></table>';
        }
        output += `<div class="infobox-${line.startsWith('##') ? 'header' : 'title'}">${line.replace(/#/g, '')}</div><table cellpadding="4"><tbody>`;
      } else {
        output += converter.makeHtml(line);
      }
    });

    output += '</tbody></table></div>';
    output = output.replace(/<p>/g, '');
    output = output.replace(/<\/p>/g, '');

    return output;
  }

  function makeFigure(text, converter) {
    const lines = text.trim().split('\n').map(line => line.trim());
    let output = '<figure>';

    output += converter.makeHtml(lines[0]) + '\n<figcaption>';
    for (let i = 1; i < lines.length; i++) {
      output += converter.makeHtml(lines[i]);
    }

    output += '</figcaption></figure>';
    output = output.replace(/<p>/g, '');
    output = output.replace(/<\/p>/g, '');

    return output;
  }

  function makeLinkbox(text, converter) {
    const lines = text.trim().split('\n').map(line => line.trim());
    let output = '<div class="linkbox">';

    output += `<div class="linkbox-title">${lines[0].replace(/#/g, '')}</div><ul>`
    for (let i = 1; i < lines.length; i++) {
      output += '<li>' + converter.makeHtml(lines[i]) + '</li>';
    }

    output += '</ul></div>';
    output = output.replace(/<p>/g, '');
    output = output.replace(/<\/p>/g, '');

    return output;
  }

  return [object];
}

function noteExt() {
  const note = {
    type: 'lang',
    filter: function(text, converter) {
      const regex = /:::(note):::(.*?):::/gs;
      return text.replace(regex, (_match, _p1, p2) => {
        return makeNote('note', p2, converter);
      });
    }
  }

  const warning = {
    type: 'lang',
    filter: function(text, converter) {
      const regex = /:::(warning):::(.*?):::/gs;
      return text.replace(regex, (_match, _p1, p2) => {
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
      return text.replace(regex, (_match, _p1, p2) => {
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
      return text.replace(regex, (_match, p1, p2) => {
        const title = p2.includes('#') ? p2.split('#')[1] : p2;
        return `${p1} title="${formatEntryName(title)}">`;
      });
    }
  }

  return [autoTitle];
}

function tableWrapperExt() {
  const tableWrapper = {
    type: 'output',
    filter: function(text) {
      const regex = /<table[^>]*class=["'][^"'>]*\bcontent-table\b[^"'>]*["'][^>]*>[\s\S]*?<\/table>/g;
      return text.replace(regex, (match, _p1, _p2) => {
        return `<div class="content-table-wrapper">${match}</div>`;
      });
    }
  }

  return [tableWrapper];
}