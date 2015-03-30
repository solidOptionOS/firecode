
- Сделать smart indent
- Indent/unindent блока
- Подсветка синтаксиса
- Метод замены replace()

===================================================================================================

- Options
    - Animate cursor movements while typing
    - Bound/unbound cursor (and freespace typing)
    - Bound/unbound selection rendering
    - Hide or fade caret on lose focus
    - Expand editor height or scroll (min/max)
    - Horizontal scrolbar overlap gutter or not
    - Show or hide gutter
    - Scrollbar hehavior: show / hide / auto
    - Number of prerendered hidden lines
    - Whether to allow scroll down to space
    - Smooth or per-line scrolling
    - Visible frame paddings (auto-scroll)
    - Cursor position in word-click selections

- Single file for the whole editor

- Gutter highlight
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
- [BIG] Big files support

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

- Code folding
- Switch between line home / content start with Home
- Select line with double click on gutter
- Select token with double click
- Multiple cursors

- Multiple simultaneous editors

- Context menu
- Modal windows
- Status line
- Open file tabs
- Project tree

- loadCode, saveCode() - ctrl + S
- Implement Cut/Copy/Paste
- Запечатать CSS в JS-файл
- Minify and compress with GCC
- Fix GCC errors and warnings
- Complete test coverage, QUnit
- Отдельный класс Cursor/SelectionRange
- Запечатать CSS в firecode.js
- Дублирование курсоров ctrl + alt + up/down

===================================================================================================

+ Use DIV instead of an IFRAME
+ Refactor code to use prototypes
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

+ Detect line height automatically
+ Update gutter line numbers
+ Implement multiline range support
+ Highlight line with cursor
+ Editor focus management
+ Click to set cursor
+ Mouse selection
+ Smooth blinking cursor
+ Use 0-indices for lines and positions

+ Метод pingCaret, hideCaret
+ Методы для работы с текстом
+ Выставлять текст
+ Парсер файлов
+ Определять ширину скролбара
+ Разделить функции get/setLineText()
+ Не использовать сдвиг для гаттера
+ Настраивать макет редактора
+ Самодельный скролинг
+ Поддержка mousewheel
+ Баг с перескакиванием длины и дублированием строк (down)
+ Баг с перекрыванием текстового блока скрол-баром
+ Горизонтальный скрол
+ Плавающий гаттер
+ Переименовать select -> marker
+ Отдельный контейнер backer
+ Метод updateEditor
  + Рендеринг текста
  + Рендеринг гаттера
  + Переиспользовать DIV
  + Рендеринг подсветки
  + Рендеринг выделения
  + Рендеринг курсоров
+ Одно замыкание с self
+ Методы attach, detach
+ Определение координат по клику
+ Клик меняет выделение
+ Ctrl + клик добавляет курсор
+ Не добавлять курсор, где уже есть
+ Отдельная функция координат
+ Выделение с помощью drag
+ Выделение через shift + click
+ Не хардкодить ширину подсветки
+ Починить отображение гаттера
+ Не хардкодить ширину выделения
+ Отдельная функция getMetrics
+ Ошибка getLineText is null
+ Оптимизировать выделение
+ Не хардкодить ширину гаттера
+ Одна функция для всех блоков
+ Баг с шириной скролбаров
+ При старте курсор не двигается
+ Функция getMousePosition(e)
+ Функция getPressedKey(e)
+ Упростить функции рендеринга
+ Пропускать необработанные клавиши
+ Затемнять курсор при потере фокуса
+ При потере фокуса теряет keyhandler
+ Прыгает выделение при скроле
+ Переход курсора между строками (ошибки)
+ Починить Internet Explorer
+ Сохранять позицию выделения
+ Скролинг при перемещении курсоров
+ Баг перемещения двух курсоров
+ Баг с самой длинной строкой
+ Баг с выделением
+ Скролинг при выделении мышкой
+ Навигация по словам ctrl + left/right
+ Баг с последней строкой выделения
+ Прокрутка фрейма ctrl + up/down
+ Выделение shift + стрелки
+ Двойной клик выделяет слово
+ Класс SelectionRange
  + Fix constructor (support collapsed ranges)
  + clearSelection()
  + getSelectionRanges()
  + addSelectionRange(startLine, startPosition, endLine, endPosition)
  + addWordSelectionRange(line, position)
  + addLineSelectionRange(line)
+ Сделать класс FireCode.SelectionPoint
+ Сделать класс FireCode.SelectionRange
  + getLinesCount()
  + copyFrom(range)
  + extendTo() - should update fixedPosition
  + addWordSelectionRange() - should clear selection (3rd parameter)
  + addLineSelectionRange() - should clear selection (3rd parameter)
  + addSelectionRange() - add 5th argument replaceAll
+ Сделать класс FireCode.ScrollingFrame
  + collidesFrame(frame)
  + collidesRange(range)
  + containsPoint(point)
  + getTopPoint()
  + getEndPoint()
+ Переписать метод updateEditor()
  + Слово выделяется только на первой строке
  + Исправить пропадание выделения
  + Ошибка при рендеринге гаттера
  + Исправить навигацию стрелками
  + Исправить сдвиг выделения влево (FireFox)
+ Не дублировать код авто-скрола
+ Поправить авто-скрол
+ Баг с двойным кликом (строки)
+ Баг с высотой фрейма
+ Отдельная createLineSelectionRange()
+ Отдельная createWordSelectionRange()
+ Выделение по целым словам
+ Баг с выделением первого символа строки
+ Bug selecting word at the line start
+ Improve per-word selection mode: AA|#|#|AAA
+ Добавление слова к выделению
+ Учесть накладывание курсоров
+ Починить выделение ###-слова
+ Клик по гаттеру выделяет строку
+ Баг с обрезанием текста
+ Баг с выделением
+ Баг с короткими строками
+ Тройной клик - выделить строку
+ Первый непробел в строке по home
+ Навигация клавишами pgup/pgdn
+ updateScroll не учитывает высоту скролбара
+ Ensure autoscroll on double click
+ Не дублировать код в handleMouseEvent
+ Ликвидировать методы addLine/WordSelectionRange
+ Метод SelectionPoint.belongsTo(range)
+ Метод SelectionPoint.lessThan(point)
+ Метод SelectionPoint.equalsTo(point)
+ Метод SelectionPoint.greaterThan(point)
+ Метод normalizeSelection()
+ Учитывать нахлест выделения
+ Метод replaceText(range, text)
+ Удаление выделения del/backspace/enter
+ Баг с originalTarget -> target
+ Merge выделения при drag
+ Отдельная функция getLineLength(line)
+ Функция getTextAt(line, [position[, +-length]])
+ Баг с удалением трех выделений в одной строке

+ removeTextAt(range)
+ insertTextAt(range, text)
+ insertLineAt(range, text)

+ Печатает только заглавные
+ Ввод символов

+ BOF, EOF, BOL, EOL, BOT

+ moveCursor(range, line, position, extend)
+ moveCursorTo(range, FireCode.BOF, extend)
+ moveCursorTo(range, FireCode.EOF, extend)
+ moveCursorTo(range, FireCode.BOL, extend)
+ moveCursorTo(range, FireCode.EOL, extend)
+ moveCursorTo(range, FireCode.BOT, extend)

+ moveCursorBy(range, FireCode.PAGE, +-1, extend)
+ moveCursorBy(range, FireCode.LINE, +-1, extend)
+ moveCursorBy(range, FireCode.WORD, +-1, extend)
+ moveCursorBy(range, FireCode.CHAR, +-1, extend)

+ Клавиша delete
+ Клавиша backspace
+ Клавиша enter
  + Respect leading whitespace

+ Перестал пропускать ctrl + key
+ Не работают home/end
+ При удалении строки bs появляется null
+ Ошибки при печати в Opera
+ Заступает за конец строки

+ Диапазон сбрасывается при merge
+ Не всегда сливается выделение
+ Иногда выделение сбрасывается
+ Оптимизировать range вычисления

+ ctrl + right/left не переходит по строкам
+ Не срабатывает drag, если всего один курсор
+ Пословное удаление delete/backspace

+ Ввод табуляции
+ Сделть ctrl + A
+ Сделть ctrl + D

+ Fix cursor negative line positioning
+ Reuse cursor/highlight nodes + animate
+ Ctrl + home on empty line bug
+ Bug with cursor inside selection
+ Big selection rendering bug
+ Ошибка с blank + backspace + type
+ Ошибка с gutter - нумерует пустые строки
+ Ctrl + стрелки не проскакивает пробелы
+ Сделать ctrl + backspace
+ Поправить выделение слов кликом
+ Одиночный клик по гаттеру
