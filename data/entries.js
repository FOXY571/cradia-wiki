async function getEntries() {
  try {
    const response = await fetch('backend/entries.json');
    const fileContent = await response.json();
    console.log('Fetched entries successfully');
    return fileContent;
  } catch (error) {
    console.error('Error fetching entries:', error);
  }
}

const entries = await getEntries();
export default entries;

export async function getEntry(entryName) {
  try {
    const response = await fetch(`backend/entries/${entryName}.md`);
    const fileContent = await response.text();
    console.log(`Fetched ${entryName} entry successfully`);
    return fileContent;
  } catch (error) {
    console.error(`Error fetching ${entryName} entry:`, error);
  }
}

export function getRandomEntryName() {
  return entries[Math.floor(Math.random() * entries.length)];
}

export function contains(entryName) {
  return entries.includes(entryName);
}

export function formatEntryName(entryName) {
  let formattedName = entryName.replace(/-/g, ' ')
    .split(' ')
    .map(word => {
      let punctuationBefore = word.match(/^[^\w\u00C0-\u017F]+/);
      let punctuationAfter = word.match(/[^\w\u00C0-\u017F]+$/);

      let cleanWord = word.replace(/^[^\w\u00C0-\u017F]+|[^\w\u00C0-\u017F]+$/g, '');
      let formattedWord = cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1);

      return (punctuationBefore ? punctuationBefore[0] : '') + formattedWord + (punctuationAfter ? punctuationAfter[0] : '');
    })
    .join(' ');
  return formattedName;
}