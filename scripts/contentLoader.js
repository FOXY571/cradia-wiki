import * as entries from '../data/entries.js';

const contentBody = document.querySelector('.js-content-body');

const urlParams = new URLSearchParams(window.location.search);
const entryName = urlParams.get('entry');

if (entryName && entries.contains(entryName)) {
  const rawText = await entries.getEntry(entryName);
  contentBody.innerHTML = marked.parse(rawText);
} else {
  contentBody.innerHTML = `
    <h1>404</h1>
    <div class="line-break"></div>

    <p>
      It looks like you steered off course! Unfortunately, There is no entry for <i>${entries.fomratEntryName(entryName)}.</i> :(
    </p>
    <p>
      Please click <b><a href="?entry=home" title="Home">here</a></b> to go back to safety.
    </p>
  `;
}