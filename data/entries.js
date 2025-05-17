let entries = null;

async function getEntries() {
  if (entries) return entries;

  try {
    const response = await fetch('backend/entries.json');
    entries = await response.json();
    console.log('Fetched entries successfully');
    return entries;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return [];
  }
}

export { getEntries };

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

export async function getRandomEntryName() {
  const list = await getEntries();
  return list[Math.floor(Math.random() * list.length)];
}

export async function contains(entryName) {
  const list = await getEntries();
  return list.includes(entryName);
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