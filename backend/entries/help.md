# Help

:: Welcome to the Cradia Wiki! Below are many topics that can help you if you get stuck.

## Navigation

* To begin learning about this wiki and the wonderful world of Cradia, visit the [home page](?entry=home "Home"). From there, you can view the wiki's main pages, such as main characters, important places, cool topics, and much more!
* Don't just stop there! Most pages will contain light blue text that can take you to other pages when clicked. These can be used to learn even more about topics and gain context about certain pages.
* On the left side of the webpage are other useful links that can take you to different parts of the wiki.
    * The "Main page" button will bring you back to the home page.
    * The "All pages" button will take you to a list of every page in the wiki. You can use this page to easily find other pages.
    * The "Random page" button will take you to—you guessed it—a random page. This is useful if you're interested in learning something new.
    * The "Help" button will take you to this page.

## Page Structure

* Pages about most topics will be similarly structured.
    * Subtopics are seperated by headings for cleaner and clearer navigation.
    * The right side of most pages will contain an infobox. They give basic information about the topic and can also contain links to other pages.
    * Some pages contain tables. These are used to easily organize structured information.

## Page Creation

* Pages are written using a modified version of the formatting style, [Markdown](https://en.wikipedia.org/wiki/Markdown "Markdown").
* To get an idea of how the source version of pages look like, you can click the "View source" button at the top of the page to view the page's source.

## Markdown Syntax

* Below are some basic Markdown syntax rules that this wiki mainly uses for creating its pages.

### Headings

* Headings are created by putting one or more ```#``` symbols before the heading text. The number of ```#``` determines the level of the heading.

<pre>
# Heading one
## Heading two
### Heading three
</pre>

### Bold Text

* Text is bolded by putting ```**``` on both sides of the text that you want bolded.
* When bolding text in the wiki, it is usually the first instance of the page name that is bolded. Other than that, text is kept at a normal weight.

<pre>
**This text will be bold**
</pre>

## Links

* You can create a link by wrapping the link text in brackets ```[ ]```, and the wrapping the actual link in paranthesis ```( )```.
* When making links to another page, you append the entry name to ```?entry=```.
* For all links, put the name of the page or website in quotes ```" "``` after the actual link.

<pre>
[The Cradia Wiki](?entry=home "Home")
</pre>

### Blockquotes

* Blockquotes are represented as quotes on the wiki. They are created by putting a ```>``` at the beginning of your text.
* To go to a new line, you must have an empty line in the blockquote.

<pre>
> Pardon my french
>
> ― Abraham Lincoln
</pre>

* The text above will look like the blockquote below.

> Pardon my french
>
> ― Abraham Lincoln

### Tables

* Tables can be tricky to get the hang of but are very useful when used correctly.
* All columns of a table start with a ```|```.
* The first line of the table will be the table columns' headings. The second line must contain ```|:--:``` for every column the table has.

<pre>
|We |Love |Tables
|:--: |:--: |:--:
|Row 1 |Some text |Cradia
|Row 2 |Some other text |Wiki
|Row 3 |Even more text |Rules
</pre>

* The text above will look like the table below.

|We |Love |Tables
|:--: |:--: |:--:
|Row 1 |Some text |Cradia
|Row 2 |Some other text |Wiki
|Row 3 |Even more text |Rules

## Wiki Syntax

* Below are some custom syntax rules that have been created specifically for this wiki.

### Hatnotes

* A hatnote is created by putting two colons ```::``` at the beginning of the text.

<pre>
&colon;: This is a hatnote
</pre>

### Notes & Warnings

* Notes and warnings are each created by putting three colons ```:::```, followed by the type, followed by three more colons ```:::``` at the begining of text, and three colons ```:::``` at the end of the text.

<pre>
&colon;::note:::
  This is a note
&colon;::
&colon;::warning:::
  This is a warning
&colon;::
</pre>

* The text above will look like the note and warning below.

:::note:::
  This is a note
:::
:::warning:::
  This is a warning
:::

### Infoboxes

* Infoboxes are created first created by surroudning the text in ```({ })```.
* The first line of the infobox will be its title. The title will have ```#``` at the beginning of it.
* The following lines will begin with ```|``` and contain the property name and its value seperated by a colon ```:```.
* Headers can be created by putting ```##``` at the beginning of the header text. (Make sure an infobox does not end with a header!)

<pre>
&lpar;{
  # Infobox
  | Property: Value
  | Name: Heisenburg
  ## Header
  | Wiki: Cradia Wiki
  | French: Baguette
}&rpar;
</pre>

* The text above will look like the infobox below.

({
  # Infobox
  | Property: Value
  | Name: Heisenburg
  ## Header
  | Wiki: Cradia Wiki
  | French: Baguette
})