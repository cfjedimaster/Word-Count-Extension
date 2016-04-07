Word Count Extension
=================

A stupid simple word and character count extension. I write a lot of articles in
Markdown and needed a simple way to count words. Note that this extension is just
splitting on whitespace which means it will count embedded code a bit high. I *could*
strip out code in Markdown (everything tabbed over once), but code counts in article 
length as well.

History
=======

2/25/16: Accepted PR from @vankasteelj:

* Adds french localization
* Allows dynamic string format (using utils/StringUtils)
* Displays current selection wordcount when there's a selection, total words otherwise.

7/28/2015: Accepted PR from Toni to add a Spanish version.
Got "word count as you type" working thanks to Prashanth Nethi helping me out on Slack!

7/25/2015: Switch to using a bottom statusbar. Fixes #1.

6/22/2014: Initial release.
