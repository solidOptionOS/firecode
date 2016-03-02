
+ Fix keyboard shortcuts on Mac
+ Fix code to prevent GCC warnings

- Fix auto-scrolling when adding new lines
- Align bottom auto-scrolling of last line (see updateScroll)
- Show one more line in the viewport
- Cover bottom-right corner between scrollbars
- Scrollbars should not overlap on OSX
- Update keystroke map to work on Windows/OSX

- Options
  - Cursor blinking interval
  - Revert animation timeout
  - Animate cursor movements while typing
  - Bound/unbound cursor (and freespace typing)
  - Bound/unbound selection rendering
  - Hide or fade caret on lose focus
  - Expand editor height or scroll (min/max)
  - Horizontal scrolbar overlap gutter or not
  - Show or hide gutter + runtime switch
  - Scrollbar behavior: show / hide / auto
  - Number of prerendered hidden lines
  - Whether to allow scroll down to space
  - Smooth or per-line scrolling
  - Visible frame paddings (auto-scroll)
  - Cursor position in word-click selections

- [BIG] Clean editor API
  - getLineNode(index)
  - getLineText()
  - getFocusNode()
  - getAnchorNode()
  - getSelection()
  - getCursorPosition()
  
- [BIG] Copy/Paste + Multiline
- [BIG] Change history and Undo/Redo
  - Persist cursor movements
  - Group similar actions (option)
  
- [BIG] Implement PHP/HTML/CSS/JS context
  - Auto-closing brackets and quotes [], {}, (), "", ''
  - Bypass typing closing brackets and quotes
  
- [BIG] Autocomplete popup window
- [BIG] Snippets with placeholders
+ [BIG] Selection on mouse dragging
- [BIG] Code folding
- [BIG] Big files support


===================================================================================================

- [NEW] Method for text replace()
- [NEW] Gutter highlight
- [BUG] Prevent line numbers selection
- [NEW] Implement more cursor styles
+ [BUG] Block cursor on blur
+ [NEW] Smooth cursor blinking
- Replace textarea element(s)
- Replace any tag + load remote file
- Automatic language detection
- Create language plugin system

- Function arguments tooltips
- Function help with Ctrl + Click

- Goto line with Ctrl + G
- Duplicate selection with Ctrl + D
- Bookmarks with Ctrl + [Shift] + [0-9]
- Highligh matching brackets
- Highligh matching variables
- Toggle autocomplete with Ctrl + Space
- Toggle snippets with Ctrl + J

- Base class for plugins (e.g. function tooltips)
- Single file for the whole editor (using Gulp)
- Support multiple simultaneous editors

- Context menu
- Modal windows
- Status line
- Open file tabs
- Project tree

- loadCode, saveCode() - ctrl + S
- Complete test coverage, QUnit
- Embed firecode.css into firecode.js
- Cursor duplication: ctrl + alt + up/down

===================================================================================================

+ Use DIV instead of an IFRAME
+ Refactor code to use prototypes
+ Display gutter with line numbers
+ Gutter should float on h-scrolling
+ Deselect when clicking on gutter
+ Per-line text blocks organization
+ Highlight lines wth cursors
+ Emulate cursor with inline-block element
+ Blink cursor
+ Hide cursor on blur
+ Show cursor on focus
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
+ Detect line height automatically
+ Update gutter line numbers dynamically
+ Implement multiline range support
+ Highlight lines with cursor
+ Click to set cursor
+ Implement selecting text with mouse + drag
+ Smooth blinking cursor
+ Use 0-indices for lines and positions