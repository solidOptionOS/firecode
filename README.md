FireCode
========

FireCode is a lightweight web-based programming code editor.

Some of the major features include:

- Completely written in native JavaScript
- Codebase is 6 files under 10 Kb gzipped
- Supports all major browsers and mobile devices
- Optimized performance and memory consumption
- Everything is made using DOM, no design mode


Version 1.0a (21 June 2013)
===========================

+ Use base64-encoded inline images
+ Display gutter with line numbers
+ Gutter should float on h-scrolling
+ Deselect when clicking on gutter
+ Per-line text blocks organization
+ Highlight currently edited line
+ Emulate cursor with inline block
  + Blink cursor
  + Hide cursor on blur
  + Show cursor on focus
  + Should follow selection
+ Move cursor with Up/Down/PgUp/PgDown
+ Select all text with Ctrl + A
+ Duplicating line with Ctrl + D
+ Remove line with Ctrl + Y
+ Move cursor with Ctrl + Left/Right
+ Move cursor with Home / End
+ Selection with Ctrl + Shift + Left/Right
+ Remove content with Ctrl + Backspace
+ Selection indent with [selection] + Tab
+ Selection unindent [selection] + Shift + Tab
+ Scroll to cursor with Ctrl + Shift + Left/Right
+ Viewport scrolling with Ctrl + Up/Down
+ Snap cursor to grid on tabulation (4x spaces)
+ Persist line indentation on pressing Enter
+ Persist cursor position on pressing Up/Down
+ Scroll on Backspace/Enter at the end of file


Backlog
=======

- Refactor code to use prototypes
- Support all major browsers
- Prevent line numbers selection
- Implement more cursor styles
  - Block cursor
  - Smooth blinking
- Replace textarea element(s)
- Replace any tag + load remote file
- Automatic language detection
- Create language plugin system
- [BIG] Autocomplete popup window
- [BIG] Snippets with placeholders
- [BIG] Selection on mouse dragging
- [BIG] Change history and Undo/Redo
  - Persist cursor movements
  - Group similar actions (option)
- [BIG] Clean editor API
  - getLineNode(index)
  - getLineText()
  - getFocusNode()
  - getAnchorNode()
  - getSelection()
  - getCursorPosition()
- [BIG] Implement PHP syntax parser
  - Auto-closing brackets and quotes [], {}, (), "", ''
  - Bypass typing closing brackets and quotes
- Function arguments tooltips
- Function help with Ctrl + Click
- Goto line with Ctrl + G
- Duplicate selection with Ctrl + D
- Bookmarks with Ctrl + [Shift] + [0-9]
- Highligh matching brackets
- Highligh matching variables
- Toggle autocomplete with Ctrl + Space
- Toggle snippets with Ctrl + J
- Code folding
- Switch between line home / content start with Home
- Select line with double click on gutter
- Select token with double click
- Multiple cursors
- Context menu
- Modal windows
- Status line
- Open file tabs
- Project tree
- loadCode, saveCode() - ctrl + S
- Implement Cut/Copy/Paste
