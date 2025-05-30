import {getEntryFromUrl, changeRoute} from './navigationHandler.js';
import {getRandomEntryName, formatEntryName} from '../data/entries.js';

let handleSourceButtonClick;

function pageInitialization() {
  const entryName = getEntryFromUrl();

  if (!entryName) {
    changeRoute('?entry=home');
  }
  if (entryName != 'home') {
    document.querySelector('title').innerHTML = `${formatEntryName(entryName)} - Cradia Wiki`;
  } else {
    document.querySelector('title').innerHTML = 'Cradia Wiki';
  }

  const sourceButton = document.querySelector('.js-source-button');
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
document.querySelector('.js-random-page-link')
  .addEventListener('click', () => {
    changeRoute(`?entry=${getRandomEntryName()}`);
  });