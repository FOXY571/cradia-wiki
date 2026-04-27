-# This page is for wiki developers. As of now, only wiki developers may edit, create, or delete wiki entries. For more help, see also: [Help](/help)

<TableOfContents />

## Entry titles

Titles should generally follow a general naming format based on the type of title. Generally, titles should be written in singular form except when the title is to general for a singular form.

**For entry titles based on characters**
* Titles should reflect the character's full name. Middle names, aliases, or extra names should be exempt.
  * Example: [Qatil Ikaru](/Qatil_Ikaru) or [Heyvan Sow](/Heyvan_Sow)
* A character who is generally referred to as something other than their name should be used instead.
  * Example: [Order](/Order)
* If a character does not have a last name, or their last name is unknown, it need not be included.
  * Example: [Ümid](/Ümid)
* Include any and all special characters in the character's name. If this is not possible, find the closest substitute and supply the name property of the entry with their true name.
  * Example: [Möhnət Ikaru](/Möhnət_Ikaru)

**For entry titles based on books**
* Titles should be written exactly as is the book's title. For any special characters that cannot be written in the title, supply the name property of the entry with the true title.
  * Example: [The Prince's Truth](/The_Prince's_Truth)

**For entry titles based on locations**
* Titles should reflect the location's name exactly as it is spelt.
  * Example: [Canavar](/Canavar) or [Ikarye](/Ikarye)

**Titles on other types of entries**
* Important objects should be titled as they are referred to in books. Do not begin titles based on objects with "The" unless it is explicitly included in the object's name.
  * Example: [Chaos Orb](/Chaos_Orb)
* Entries that contain a colletion of information should have a title that reflects the content in the entry. These titles should be in plural form when applicable.
  * Example: [Magic](/Magic) or [Species](/Species)

**Other title guidelines**
* Titles should follow proper naming conventions as used for most media.
* Titles should not include space characters. Use underscores (```_```) instead.
* If a title is too similar to an existing title and may cause confusion, include a subtitle at the end that is surrounded in parenthesis.
  * Subtitles should generally be all lowercase unless it is more fitting otherwise.
  * Example: [Heyvan (book)](/Heyvan_(book))

## Entry content

Entry content should only contain information related to the Cradia universe. Non-canon content is allowed as long as it is relevant and is not protrayed as canon. Non-canon information should not be included in the same pages as canon information. Speculative, unproven, or misinformation is not allowed and should not be added to pages.

### Hatnotes

Hatnotes generally do not need to be included in a page. However, if they do, they should be the first element of the page. Hatnote usages are as follows:

* Eliminating confusion surrounding entries with similar titles
* Linking a page or pages that would be helpful to read in tandem
* Small intros for exotic entries (such as the one used in this entry)

Hatnotes may also be added to the beginning of a section, but these hatnotes should only be used to point the reader to a lower section in the same page. However, these should only be done if deemed reasonable and not generally.

### Infoboxes

Infoboxes should be placed above the intro section of a page. Infoboxes should only be included in pages that are based on a singular topic (such as a character, location, or object). It contains quick, useful information related to the topic. Infoboxes should strictly follow the format used by infoboxes that share a similar topic. Entry templates contain the structure of the infobox for specific types of entries.

### Images

Some entries may need images to give readers an idea of what a character, place, or obejct looks like, or to describe content in a more descriptive way. Images should be related to the content described in an entry. Images are always optional for an entry and need not be added.

**Images in infoboxes**
* There should only be one image per infobox. Adding more than one image to an infobox is not supported.
* The image should directly relate to the content described.
  * For example, an image of a character should be of the character in their most general or well*known form.
  * This also applies to images of objects and locations in the infobox.
* The alt text for the image must be the title of the entry extacly as it is spelt but with underscores (```_```) replaced with space characters.

**Other images in pages**
* Other images located in pages should be placed in a content figure with a proper caption.
* Images should be placed above page sections in which they are relevent to.
  * For example, an image denoting a character's appearance should be placed above the "Appearance" section.
* Image captions should use proper grammatical structure and should include links when necessary.
* The alt text of the image should replicate the image caption.

### Note blocks

If a page is not complete and is in development, include the following warning note block at the top of the entry. If the entry has a hatnote, put the noteblock underneath it.

```
<NoteBlock
  label="This page is currently unfinished and is in development."
  text="Please be patient while we get it set up."
  type="warning"
/>
```

### Quotes

All quotes should be copied verbatim. Any additional content added within the quotation marks must be enclosed in square brackets. Terminal punctuation must go inside the quote only if it is in the original; otherwise, it must go outside. If the speaker of the quote has a page in the wiki, their name must be a link that points to their page.

### Table of contents

The table of contents must be included in every entry. It should be placed below the intro. If the entry does have an intro, then place it below any elements that would generally appear above the intro. The table of contents should not the first element in the page.

## Formatting guidelines

-# See also: [Entry format and sections](/Style_Guide#Entry_format_and_sections) below

* The first instance of an entry name on a page should always be linked. This does not apply to the page title (which should be in proper **bold** instead; see below). Further mentions of the same entity should generally not be linked, though multiple identical links can exist if they occur far from each other and would be helpful to readers. An example might be one link in the introductory section along with an identical link in a section occurring further down. Duplicate links may be especially helpful on larger pages that would require scrolling to find a topic's first mention.
  * Instances of entry names should always be linked when used in a hatnote, *infobox, content figure, and table. Instances of these entry names do not count as a "first instance."
* Links to a subtopic in an exisitng page should direct to that subtopic in that page. Similar guidelines apply to these in that further mentions of a subtopic should generally not be linked unless it is helpful to readers.
* The first instance of the page title should be **bold**. This should usually be in the first sentence of the article. No other instance of the page title should be bold. Bold print should usually be avoided for emphasis on other words.

*Instances of page subtopics should not be linked in infoboxes if the name of their respective heading is already linked.

## Entry format and sections

Different entry types require different formats and sections. Developers should look at the template entries to see what sections should be included for a specific entry type. However, the sections below should exist on almost every page. Any section that is not listed here or on the specific entry template should be given careful consideration. Often, the content of such an inconsistent section fits into one of the consistent, standard sections without problems.

Note that the bullet lists with questions in the following sections are not meant to be exhaustive guides but merely examples.

### Intro

*This section is located at the very top of the page. It is usually one of the first things that is read on the page.*

This section has no heading. The first paragraph should contain the entry's topic, as well alternative names in **bold** when first used. A classification should be made in the first one or two sentences:

* What is the character's role in the story?
* Where is the kingdom located?
* What books does it appear in?
* Is it a magical item, a weapon, or something else?

The next paragraphs in the intro should give a general overiew of the role that the topic plays in the story, such as major events tied to it.

### Trivia

*This section should be omitted if there is nothing notable.*

This section of the page should have a bulleted list of facts that are related to the entry topic but have no bearing on the story of Cradia in any way. Examples of trivia are explanations of the etymology of the topic's name, explanations of why this content was written in the books, some creator quotes on the topic, etc.