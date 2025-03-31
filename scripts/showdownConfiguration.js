const entryConverter = new showdown.Converter({
  extensions: [...bindingsOverride(), infoboxExtension, noteExtension, hatnoteExtension],
  tables: true
});

function bindingsOverride() {
  const classMap = {
    table: 'content-table'
  }
  
  const bindings = Object.keys(classMap)
    .map(key => ({
      type: 'output',
      regex: new RegExp(`<${key}(.*)>`, 'g'),
      replace: `<${key} class="${classMap[key]}" $1>`
    }));
  
  return bindings;
}

function infoboxExtension() {
  const infobox = {
    type: 'output',
    filter: function(text) {
      const regex = /\({(.*?)}\)/gs;
      return text.replace(regex, (match, p1, p2) => {
        const lines = p1.trim().split('\n').map(line => line.trim());
        let output = '<div class="infobox">';

        lines.forEach(line => {
          if (line.startsWith('|')) {
            const parts = line.slice(1).split(':').map(str => str.trim());

            if (parts.length == 2) {
              const header = parts[0];
              const value = parts[1];

              output += `<tr><th>${header}</th><td>${value}</td></tr>`;
            }
          } else if (line.startsWith('#')) {
            if (output) {
              output += '</tbody></table>';
            }
            output += `<div class="infobox-${line.startsWith('##') ? 'header' : 'title'}">${line.replace(/#/g, ' ')}</div><table cellpadding="4"><tbody>`;
          }
        });

        return output + '</tbody></table></div>';
      });
    }
  }

  return [infobox];
}

function generateInfobox(text) {
  const lines = text.trim().split('\n');
  let currentSection = null;
  let output = '';

  lines.forEach(line => {
    line = line.trim();

    if (line.startsWith('|')) {

    } else {
      output += line + '\n';
    }
  });

  return output;
}

function generateTable(sectionName, data) {
  let tableHTML = `<h1>${sectionName}</h1><table border="1"><tbody>`;
  data.forEach(row => {
      tableHTML += `<tr><td>${row.header}</td><td>${row.value}</td></tr>`;
  });
  tableHTML += '</tbody></table>';
  return tableHTML;
}

function noteExtension() {
  const note = {
    type: 'output',
    filter: function(text) {
      const regex = /:::(note):::(.*?):::/gs;
      return text.replace(regex, (match, p1, p2) => {
        return `<div class="note"><div>${p2}</div></div>`;
      });
    }
  }
  const warning = {
    type: 'output',
    filter: function(text) {
      const regex = /:::(warning):::(.*?):::/gs;
      return text.replace(regex, (match, p1, p2) => {
        return `<div class="warning""><div>${p2}</div></div>`;
      });
    }
  }

  return [note, warning];
}

function hatnoteExtension() {
  const hatnote = {
    type: 'output',
    filter: function(text) {
      const regex = /::(.*?)::/g;
      return text.replace(regex, (match, p1, p2) => {
        return `<div class="hatnote">${p1}</div>`;
      });
    }
  }

  return [hatnote];
}