<!-- Anything surrounded by "[]" can be replaced freely -->
<!-- It is preferred that you don't touch anything else unless said otherwise-->

<!-- Delete all comments once the page is complete to reduce file size -->

({infobox
# [entry name]
<!-- An image is optional for an entry's infobox -->
<!-- To include an image in the infobox, delete the surrounding comment -->
<!-- ![entry name](backend/images/[image name].png) -->
| Name: [name]
| Aliases: [aliases] <!-- If multiple values, seperate them with <br> (i.e. Value 1 <br> Value 2) -->
| Kingdom of origin: [kingdom of origin]
| Relatives: [relatives] <!-- If multiple values, seperate them with <br> (i.e. Value 1 <br> Value 2) -->
## Combat
| [Magic](/magic): [magic] <!-- If multiple values, seperate them with <br> (i.e. Value 1 <br> Value 2) -->
| Weapon of choice: [weapon of choice]
## Appearances
| First appearance: [first appearance]
| Last appearance: [last appearance]
## Physical description
| [Species](/species): [species]
| Gender: [gender]
})

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
<InfoBox>

<!-- A quote is optional for an entry -->
<!-- To include a quote on the entry, delete the surrounding comment below -->
<!--
  > [quote]
  >
  > ― [speaker]
-->

<!-- Introduce the character here -->
[introduction]

## Backstory

<!-- Put the character's backstory here -->
[backstory]

## Appearance

<!-- Describe the character's appearance here -->
[appearance]

## Personality

<!-- Describe the character's personlity here -->
[personaility]

## Combat & Magic

<!-- Describe the character's combat and magic skills here -->
[combat & magic]

## Trivia

<!-- Add some character trivia here -->
[trivia]