import {getEntryFromUrl, changeRoute} from './navigationHandler.js';
import {getRandomEntryName, formatEntryName} from '../data/entries.js';

let handleSourceButtonClick;

function pageInitialization() {
  let entryName = getEntryFromUrl();

  if (entryName) {
    if (entryName != 'home') {
      document.querySelector('title').innerHTML = `${formatEntryName(entryName)} - Cradia Wiki`;
    } else {
      document.querySelector('title').innerHTML = 'Cradia Wiki';
    }
  } else {
    changeRoute('?entry=home');
    entryName = getEntryFromUrl();
  }

  const sourceButton = document.getElementById('sourceButton');
  const newSourceButton = sourceButton.cloneNode(false);
  sourceButton.parentNode.replaceChild(newSourceButton, sourceButton);
  if (entryName.endsWith('-source')) {
    newSourceButton.innerHTML = `<a class="header-link" title="View the page">View page</a>`;
    handleSourceButtonClick = () => {
      changeRoute(`?entry=${entryName.replace('-source', '')}`);
    };
  } else {
    newSourceButton.innerHTML = `<a class="header-link" title="View the page's source">View source</a>`;
    handleSourceButtonClick = () => {
      changeRoute(`?entry=${entryName}-source`);
    };
  }
  newSourceButton.addEventListener('click', handleSourceButtonClick);
}

pageInitialization();

document.addEventListener('onRouteChanged', () => {
  pageInitialization();
});

// This may only run once, hence it not being in the pageInitialization function
document.getElementById('randomPageLink')
  .addEventListener('click', async () => {
    changeRoute(`?entry=${await getRandomEntryName()}`);
  });