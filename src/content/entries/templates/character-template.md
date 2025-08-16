<!-- Anything surrounded by "[]" can be replaced freely -->
<!-- It is preferred that you don't touch anything else unless said otherwise-->

<!-- Delete all comments once the page is complete to reduce file size -->

<!-- Info boxes are recieiving some massive changes -->
<!-- I highly recommend asking for help when handling them -->
<InfoBox
  label="[entry name]"
  :content="{
    '': [
      { key: 'Name', value: '[name]' },
      { key: 'Aliases', value: '[aliases]' },
      { key: 'Kingdom of Origin', value: '[kingdom of origin]' },
      { key: 'Relatives', value: '[relatives]' },
    ],
    'Combat': [
      { key: 'Magic', keyLink: 'magic', value: '[magic]' },
      { key: 'Weapon of Choice', value: '[weapon of choice]' },
    ],
    'Appearances': [
      { key: 'First appearance', value: '[first appearance]' },
      { key: 'Last appearance', value: '[last appearance]' },
    ],
    'Physical description': [
      { key: 'Species', keyLink: 'species', value: '[species]' },
      { key: 'Gender', value: '[gender]' },
    ],
  }"
>
  <!-- An image is optional for an entry's infobox -->
  <!-- To include an image in the infobox, delete the surrounding comment below -->
  <!-- <img src="../images/[image name].png" alt="[entry name]" /> -->
</InfoBox>

<!-- A quote is optional for an entry -->
<!-- To include a quote on the entry, delete the surrounding comment below -->
<!--
  > [quote]
  >
  > ― [speaker]
-->

<!-- Introduce the character here -->
[introduction]

<TableOfContents
  :contents="[
    { text: 'Backstory' },
    { text: 'Appearance' },
    { text: 'Personality' },
    {
      text: 'Combat_and_magic',
      /* children: [
        // Put children headings for the Combat and magic section here
        // Replace each space of the headings with underscores (_)
        // Format: { text: [heading] },
      ], */
    },
    { text: 'Trivia' },
  ]"
/>

## Backstory

<!-- Put the character's backstory here -->
[backstory]

## Appearance

<!-- Describe the character's appearance here -->
[appearance]

## Personality

<!-- Describe the character's personlity here -->
[personaility]

## Combat and magic

<!-- Describe the character's combat and magic skills here -->
[combat & magic]

## Trivia

<!-- Add some character trivia here -->
[trivia]