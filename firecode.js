FireCode = 
{
    initialize : function()
    {
        self = this;
        
        parentContainer = document.getElementById('parent');
        gutterContainer = document.getElementById('gutter');
        editorContainer = document.getElementById('editor');
        
        gutter = gutterContainer.firstChild;
        editor = editorContainer.firstChild;
        
        //document.addEventListener('keydown', self.keyHandler, true);
        document.addEventListener('keypress', self.keyHandler, true);
        window.addEventListener('focus', function(e) {self.updateFocus(true);}, true);
        window.addEventListener('blur', function(e) {self.updateFocus(false);}, true);
        
        parentContainer.addEventListener('mousedown', self.mouseHandler, true);
        parentContainer.addEventListener('mousemove', self.mouseHandler, true);
        parentContainer.addEventListener('mouseup', self.mouseHandler, true);
        top.addEventListener('mouseup', self.mouseHandler, true);
        
        document.addEventListener('mousedown', self.gutterHandler, true);
        document.addEventListener('mouseup', self.gutterHandler, true);
    },
    
    keyHandler : function(e)
    {
        var sel = window.getSelection(),
            range = sel.getRangeAt(0),
            key = self.getPressedKey(e), 
            shift = e.shiftKey, 
            ctrl = e.ctrlKey;
        
        // Reset textIndex when not moving cursor.
        if (!key.match(/.(up|down|pageup|pagedown)./))
            self.fixTextIndex();
        
        // Remove contents on whitespace operations.
        if (key.match(/^.(delete|backspace|enter).$/) && !sel.isCollapsed)
        {
            self.replaceCode(/{sel}/gm, '{cf}');
            if (!key.match(/^.(enter).$/)) return;
        }
        
        if (ctrl && key == '[enter]') self.debug();
        else if (ctrl && key == 'F5') return;
        
        else if (ctrl && key == 'A') self.selectAll();
        else if (ctrl && key == 'D') self.replaceCode(/(\n?)(.*){cf}(.*)\n/, '$1$2$3\n$2{cf}$3\n');
        else if (ctrl && key == 'Y') self.replaceCode(/^.*?{cf}.*?\n/m, '{cf}', true);
        
        else if (key == '[tab]' && shift && !sel.isCollapsed) self.replaceCode(/^( *[{cf}{ca}])?    /gm, '$1');
        else if (key == '[tab]' && !shift && !sel.isCollapsed) self.replaceCode(/^(?!$|{cf}$|{ca}$)/gm, '    ');
        else if (key == '[tab]' && !shift && sel.isCollapsed) self.replaceCode(/{cf}/, '{newTab}{cf}', true);
        else if (key == '[tab]' && shift && sel.isCollapsed) self.replaceCode(/{backTab}{cf}/, '{cf}', true);
        
        else if (ctrl && key == '[up]') self.scrollViewPort(-1);
        else if (ctrl && key == '[down]') self.scrollViewPort(+1);
        
        else if (ctrl && key == '[enter]') self.replaceCode(/{cf}/m, '<br />{cf}');
        else if (ctrl && key == ' ') self.replaceCode(/{cf}/m, '&nbsp;{cf}');
        else if (ctrl && key == '7') self.replaceCode(/{cf}/m, '&amp;{cf}');
        
        else if (key == '[up]') self.moveCursor(-1, 0, ctrl, shift);
        else if (key == '[down]') self.moveCursor(1, 0, ctrl, shift);
        else if (key == '[pageup]') self.moveCursor(-self.getLinesPerPage(), 0, ctrl, shift);
        else if (key == '[pagedown]') self.moveCursor(+self.getLinesPerPage(), 0, ctrl, shift);
        else if (key == '[left]') self.moveCursor(0, -1, ctrl, shift);
        else if (key == '[right]') self.moveCursor(0, 1, ctrl, shift);
        else if (key == '[home]') self.moveCursor(0, 'home', ctrl, shift);
        else if (key == '[end]') self.moveCursor(0, 'end', ctrl, shift);
        
        else if (key == '[enter]' && shift) self.replaceCode(/{cf}/g, '\n{lineIndent}{cf}');
        else if (key == '[enter]') self.replaceCode(/{cf}/g, '\n{lineIndent}{newIndent}{cf}', true);
        else if (key == '[backspace]' && ctrl) self.replaceCode(/(\n|[\w\$]+|[^\w\$\n]+){cf}/m, '{cf}', true);
        else if (key == '[backspace]') self.replaceCode(/('{cf}'|\"{cf}\"|\[{cf}\]|\({cf}\)|({backTab}|[^\n]|&[^;]+;|\n){cf})/, '{cf}', true);
        else if (key == '[delete]') self.replaceCode(/{cf}[\w\W]/m, '{cf}', true);
        
        else if (!ctrl && e.charCode > 0) self.replaceCode(/{sel}|{cf}/m, String.fromCharCode(e.charCode) + '{cf}');
        
        e.preventDefault();
    },
    
    mouseHandler : function(e)
    {
        var sel = window.getSelection(),
            rangeParent = e.rangeParent,
            rangeOffset = e.rangeOffset,
            target = e.explicitOriginalTarget;
        
        // Map gutter events to editor.
        if (self.isChildOf(rangeParent, gutter))
        {
            // Yes, we parse line text number!
            var index = parseInt(e.rangeParent.textContent),
                line = self.getLineAt(index - 1);
            
            if (line)
            {
                rangeParent = line;
                rangeOffset = 0;
            }
        }
        
        if (e.type == 'mousedown')
        {
            self.setSelectionFocus(rangeParent, rangeOffset, e.shiftKey);
            self.fixTextIndex();
            
            self.selecting = true;
        }
        
        else if (e.type == 'mousemove' && self.selecting == true &&
            (sel.focusNode != rangeParent || sel.focusOffset != rangeOffset))
        {
            self.setSelectionFocus(rangeParent, rangeOffset, true);
        }
        
        else if (e.type == 'mouseup')
        {
            self.selecting = false;
        }
        
        // Uncommenting this will require to implement mouse drag scrolling from scratch.
        // This, however, will afford a cleaner CSS and more compatibility. In particular,
        // will allow to position gutter correctly during horizontal drag scrolling.
        // Implementing custom drag scrolling will also need coordinates-to-cursor solution.
        
        // e.preventDefault();
    },
    
    gutterHandler : function(e)
    {
        var windowWidth = window.innerWidth - 16,
            windowHeight = window.innerHeight - 16;
        
        // Detect which scrollbar is clicked.
        if (e.clientY > windowHeight) scrollBar = 'H';
        else if (e.clientX > windowWidth) scrollBar = 'V';
        else return;
        
        if (e.type == 'mousedown' && scrollBar == 'H')
            self.fixGutterPosition(true);
        
        if (e.type == 'mouseup' || e.type == 'scroll' ||
            e.type == 'mousedown' && scrollBar == 'V')
            self.fixGutterPosition(false);
        

    },
    
    
    
    selectAll : function()
    {
        var sel = window.getSelection(),
            firstLine = editor.firstChild,
            lastLine = editor.lastChild;
        
        
        self.updateFocus(false);
        
        sel.collapse(firstLine, 0);
        sel.extend(lastLine, lastLine.childNodes.length - 1);
        
        self.selectionToFake();
        self.fakeToSelection();
        self.updateFocus(true);
        self.scrollToCursor();
    },
    
    moveCursor : function(lines, chars, ctrl, shift)
    {
        var pos = self.getCaretPosition(),
            lineText = pos[2],
            lineIndex = pos[0],
            textIndex = pos[1];
        
        // By-words cursor movement.
        if (ctrl && lines == 0)
        {
            var sel = window.getSelection(),
                range = sel.getRangeAt(0),
                focusNode = document.getElementById('focus');
            
            if (chars == -1 && textIndex > 0) // Left
            {
                regexp = !range.collapsed && range.endContainer == focusNode ? /(\s+|\s*\S+)$/gm : /(\S+\s+|\S+|\s+)$/gm;
                delta = -lineText.substr(0, textIndex).match(regexp).toString().length;
            }
            
            if (chars == +1 && textIndex < lineText.length)
            {
                regexp = !range.collapsed && range.startContainer == focusNode ? /^(\s+|\S+\s*)/gm : /^(\s+\S+|\S+|\s+)/gm;
                delta = lineText.substr(textIndex).match(regexp).toString().length;
            }
            
            chars = delta;
        }
        
        
        // textIndex persistence implementation.
        // self::textIndex should be reset when cursor changes position.
        if (chars == 0)
        {
            if (!self.textIndex) self.textIndex = textIndex;
            textIndex = self.textIndex;
            self.setCaretPosition(lineIndex + lines, textIndex, shift);
        }
        
        else if (isNaN(chars)) self.setCaretPosition(lineIndex, chars, shift);
        else if (lines) self.setCaretPosition(lineIndex + lines, chars, shift);
        else if (textIndex + chars < 0) self.setCaretPosition(lineIndex - 1, 'end', shift);
        else if (textIndex + chars > lineText.length) self.setCaretPosition(lineIndex + 1, 'home', shift);
        else self.setCaretPosition(lineIndex, textIndex + chars, shift);
    },
    
    replaceCode : function(search, replace, extend)
    {
        var sel = window.getSelection(),
            range = sel.getRangeAt(0).cloneRange(),
            startLine = range.startContainer,
            endLine = range.endContainer;
        
        while (startLine && startLine.parentNode != editor) startLine = startLine.parentNode;
        while (endLine && endLine.parentNode != editor) endLine = endLine.parentNode;
        
        if (extend == true)
        {
            if (startLine.previousSibling) startLine = startLine.previousSibling;
            if (endLine.nextSibling) endLine = endLine.nextSibling;
        }
        
        range.setStart(editor, self.findNodeIndex(startLine));
        range.setEnd(editor, self.findNodeIndex(endLine) + 1);
        
        text = self.nodeToText(range.extractContents());
        
        if (search && replace)
        {
            var line = text.replace(/^[^\n]*\n|\n[^\n]*$/m, ''),
                cf = '\u2038', ca = '\u2693', tab = '    ',
                sel = '(\u2038[^\u2693]*\u2693|\u2693[^\u2038]*\u2038)', 
                lineIndent = line.match(/^ *(\* )?/g),
                backTab = tab.substr(0, line.indexOf(cf) % tab.length) || tab,
                newIndent = /({|<\w+[^/]>) *\u2038/.test(line) ? tab : '',
                newTab = tab.substr(line.indexOf(cf) % tab.length);
            
            var search = search.toString()
                .replace(/\{backTab\}/g, backTab)
                .replace(/\{cf\}/g, cf)
                .replace(/\{ca\}/g, ca)
                .replace(/\{sel\}/g, sel);
            
            var replace = replace
                .replace(/\{cf\}/g, cf)
                .replace(/\{ca\}/g, ca)
                .replace(/\{tab\}/g, tab)
                .replace(/\{newTab\}/g, newTab)
                .replace(/\{newIndent\}/g, newIndent)
                .replace(/\{lineIndent\}/g, lineIndent);
            
            text = text.replace(eval(search), replace);
        }
        
        text = text.replace(/&/g, '&amp;');
        text = text.replace(/</g, '&lt;');
        text = text.replace(/>/g, '&gt;');
        
        text = self.highlightCode(text);
        
        //text = text.replace(/(\w+|\$\w+|[()[]'"]|[ !@#$%^*()_+=\-.,<>'"]+?|.+)/gm, '<span>$1</span>');
        //text = text.replace(/^(.*)\n|(.+)$/gm, '<div>$1$2<br /></div>');
        text = text.replace(/\u2693/gm, '<span id="anchor"></span>');
        text = text.replace(/\u2038/gm, '<span id="focus"></span>');
        
        range.insertNode(range.createContextualFragment(text));
        
        self.fakeToSelection();
        self.updateFocus(true);
        self.updateGutter();
        self.fixGutterPosition();
        self.scrollToCursor();
    },
    
    
    highlightCode : function(text)
    {
        var lines = text.match(/^(.*)\n|(.+)$/gm),
            html = '';
        
        //console.log(self.parser.tokens);
        
        for (var i = 0; i < lines.length; i++)
        {
            text = lines[i].trimRight();
            text = text.replace(/(\$\w*)/gmi, '<span style="color: green;">$1</span>');
            text = text.replace(/(\d+|\d*\.\d+)/gmi, '<span style="color: green;">$1</span>');
            text = text.replace(/(\/\/.+)$/gm, '<span style="color: #808080;">$1</span>');
            html += '<div>' + text + '<br /></div>';
        }
        
        
        return html;
        
        /*var map = [], html = '';
        
        map.push([/^[\u2038\u2693]/, '<span class="whitespace">$0</span>']);
        map.push([/^\s+/, '<span class="whitespace">$0</span>']);
        map.push([/^&lt;\?php/, '<span class="php-open-tag">$0</span>']);
        map.push([/^\?&gt;/, '<span class="php-close-tag">$0</span>']);
        map.push([/^\/\*(?:\n|.)*?\*\//, '<span class="php-comment">$0</span>']);
        //map.push([/^\n/, '<br />']);
        map.push([/^.*$/, '<span class="php-unexpected">$0</span>']);
        
        
        while (text.length > 0)
        {
            for (var i = 0; i < map.length; i++)
            {
                token = text.match(map[i][0]);
                if (token)
                {
                    text = text.substr(token.toString().length);
                    html += map[i][1].replace(/\$0/, token);
                    break;
                }
            }
        }
        
        
        return html;*/
    },
    
    
    getLineAt : function(index)
    {
        if (index >= 0 && index < editor.childNodes.length)
            return editor.childNodes[index];
        else
            return null;
    },
    
    getLinesCount : function()
    {
        return editor.childNodes.length;
    },
    
    getLinesPerPage : function()
    {
        var lineNode = document.getElementById('line'),
            windowHeight = window.innerHeight - 16;
        
        return Math.floor(windowHeight / lineNode.offsetHeight);
    },
    
    getLineHeight : function()
    {
        return document.getElementById('line').offsetHeight;
    },
    
    
    
    
    getCaretPosition : function()
    {
        var caretNode = document.getElementById('focus'),
            markerNode = document.createTextNode('\u2009'),
            lineNode = document.getElementById('line'),
            lineIndex = self.findNodeIndex(lineNode),
            lineText, textIndex;
        
        // Get line text with marker
        caretNode.appendChild(markerNode);
        lineText = lineNode.textContent;
        caretNode.removeChild(markerNode);
        
        // Get line text and textIndex
        textIndex = lineText.indexOf('\u2009');
        lineText = lineText.replace('\u2009', '');
        
        return [lineIndex, textIndex, lineText];
    },
    
    setCaretPosition : function(lineIndex, textIndex, extend)
    {
        var sel = window.getSelection(),
            linesCount = self.getLinesCount(),
            focusNode = null,
            focusOffset = null;
        
        if (lineIndex < 0) {lineIndex = 0; textIndex = 'home';}
        if (lineIndex > linesCount - 1) {lineIndex = linesCount - 1; textIndex = 'end';}
        
        var lineNode = self.getLineAt(lineIndex), total = 0;
        
        if (!isNaN(textIndex))
        {
            var nodes = self.findTextNodes(lineNode);
            for (var i = 0; i < nodes.length; i++)
            {
                var node = nodes[i];
                
                if (textIndex >= total && textIndex < total + node.length)
                {
                    self.setSelectionFocus(node, textIndex - total, extend);
                    return;
                }
                else
                    total += node.length;
            }
        }
        
        if (textIndex == 'home' || !focusNode && textIndex <= 0)
            self.setSelectionFocus(lineNode, 0, extend);
        
        if (textIndex == 'end' || !focusNode && total <= textIndex)
            self.setSelectionFocus(lineNode, lineNode.childNodes.length - 1, extend);
    },
    
    setSelectionFocus : function(node, offset, extend)
    {
        var sel = window.getSelection(),
            range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null,
            focusNode = document.getElementById('focus'),
            anchorNode = document.getElementById('anchor');
        
        self.updateFocus(false);
        
        if (extend) sel.extend(node, offset);
        else sel.collapse(node, offset);
        
        self.selectionToFake();
        self.fakeToSelection();
        self.updateFocus(true);
        self.scrollToCursor();
    },

    selectionToFake : function()
    {
        var sel = window.getSelection(),
            range = sel.getRangeAt(0),
            focusNode = document.getElementById('focus'),
            anchorNode = document.getElementById('anchor');
        
        if (sel.isCollapsed)
        {
            if (!focus)
            {
                focusNode = document.createElement('SPAN');
                focusNode.id = 'focus';
            }
            else
                focusNode = focusNode.parentNode.removeChild(focusNode);
            
            if (anchorNode)
                anchorNode.parentNode.removeChild(anchorNode);
            
            temp = range.cloneRange();
            temp.collapse(true);
            temp.insertNode(focusNode);
            temp.detach();
        }
        else
        {
            if (!focusNode)
            {
                focusNode = document.createElement('SPAN');
                focusNode.id = 'focus';
            }
            else
                focusNode = focusNode.parentNode.removeChild(focusNode);
            
            if (!anchorNode)
            {
                anchorNode = document.createElement('SPAN');
                anchorNode.id = 'anchor';
            }
            else
                anchorNode = anchorNode.parentNode.removeChild(anchorNode);
            
            temp1 = range.cloneRange();
            temp2 = range.cloneRange();
            
            temp1.collapse(true);
            temp2.collapse(false);
            
            if (range.startContainer == sel.anchorNode &&
                range.startOffset == sel.anchorOffset)
            {
                temp2.insertNode(focusNode);
                temp1.insertNode(anchorNode);
            }
            else
            {
                temp2.insertNode(anchorNode);
                temp1.insertNode(focusNode);
            }
            
            temp1.detach();
            temp2.detach();
        }
        
        //editor.normalize();
    },
    
    fakeToSelection : function()
    {
        var sel = window.getSelection(),
            focusNode = document.getElementById('focus'),
            anchorNode = document.getElementById('anchor');
        
        if (anchorNode && focusNode)
        {
            sel.collapse(anchorNode, 0);
            sel.extend(focusNode, 0);
        }
        else if (focusNode)
        {
            sel.collapse(focusNode, 0);
        }
    },
    
    
    
    updateFocus : function(visible)
    {
        var sel = window.getSelection(),
            focusNode = document.getElementById('focus'),
            lineNode = document.getElementById('line');
        
        // Restore window focus if lost
        if (visible && sel.focusNode == null)
        {
            sel.collapse(editor.firstChild, 0);
            setTimeout(function() {window.focus();}, 0);
        }
        
        // Remove ID from an old line.
        if (lineNode)
            lineNode.removeAttribute('id');
        
        // Assign current line an ID.
        lineNode = focusNode;
        while (lineNode && lineNode.parentNode != editor)
            lineNode = lineNode.parentNode;
        lineNode.id = 'line';
        
        // Clear blinking interval.
        if (self.blinkInterval)
            window.clearInterval(self.blinkInterval);
        
        if (visible)
        {
            var blinkFunction = function(e)
            {
                var hidden = focusNode.style.visibility == 'hidden';
                focusNode.style.visibility = hidden ? 'visible' : 'hidden';
            };
            
            self.blinkInterval = window.setInterval(blinkFunction, 500);
        }
        
        focusNode.style.cssText = visible ? '' : 'visibility: hidden;';
        lineNode.style.cssText = visible ? '' : 'background: none;';
    },
    
    updateGutter : function()
    {
        var linesCount = self.getLinesCount();
        
        if (gutter.childNodes.length == 0)
        {
            var text = '';
            for (var i = 0; i < linesCount; i++)
                text += '<div>' + (i + 1) + '</div>';
            gutter.innerHTML = text;
        }
        else if (gutter.childNodes.length < linesCount)
        {
            for (i = gutter.childNodes.length; i < linesCount; i++)
                gutter.appendChild(document.createElement('div')).appendChild(document.createTextNode(i + 1));
        }
        else if (gutter.childNodes.length > linesCount)
        {
            while (gutter.childNodes.length > linesCount)
                gutter.lastChild.parentNode.removeChild(gutter.lastChild);
        }
    },
    
    scrollToCursor : function()
    {
        var caret = document.getElementById('focus'),
            rect = caret.getBoundingClientRect(),
            windowWidth = window.innerWidth - 16,
            windowHeight = window.innerHeight - 16,
            scrollX = null, scrollY = null;
        
        if (rect.top < 0)
            scrollY = caret.offsetTop - 4;
        else if (rect.bottom > windowHeight)
            scrollY = rect.bottom + window.scrollY - windowHeight + 5;
        
        if (rect.right > windowWidth - 1)
            scrollX = caret.offsetLeft + 16 * 8 - windowWidth;
        else if (rect.left < 0 + 50)
            scrollX = caret.offsetLeft - 16 * 8 - 50;
        
        if (scrollX != null || scrollY != null)
        {
            if (scrollX == null) scrollX = window.pageXOffset;
            if (scrollY == null) scrollY = window.pageYOffset;
            
            self.fixGutterPosition(false, scrollX);
            window.scrollTo(scrollX, scrollY);
        }
    },
    
    scrollViewPort : function(lines)
    {
        var lineNode = document.getElementById('line'),
            lineHeight = lineNode.offsetHeight,
            scrollY = Math.floor(window.scrollY / lineHeight) * lineHeight + lineHeight * lines + 2;
        if (scrollY >= 2) window.scrollTo(0, scrollY);
        if (scrollY <= window.scrollMaxY) window.scrollTo(0, scrollY);
    },
    
    fixGutterPosition : function(fixed, scrollX)
    {
        var scrollX = scrollX == null ? window.pageXOffset : scrollX;
        
        if (scrollX < 0) scrollX = 0;
        
        if (scrollX > window.scrollMaxX)
            scrollX = window.scrollMaxX;

        
        if (fixed)
        {
            gutterContainer.style.position = 'fixed';
            gutterContainer.style.top = (-window.pageYOffset) + 'px';
            gutterContainer.style.left = '';
        }
        else
        {
            gutterContainer.style.position = 'absolute';
            gutterContainer.style.top = '0px';
            gutterContainer.style.left = scrollX + 'px';
        }
    },
    
    fixTextIndex : function()
    {
        self.textIndex = null;
    },
    
    
    
    getPressedKey : function(e)
    {
        // todo: F1 .. F12
        var keys =
        {
            9 : '[tab]',
            8 : '[backspace]',
            33 : '[pageup]',
            34 : '[pagedown]',
            35 : '[end]',
            36 : '[home]',
            27 : '[esc]',
            46 : '[delete]',
            13 : '[enter]',
            37 : '[left]',
            38 : '[up]',
            39 : '[right]',
            40 : '[down]',
            112 : 'F1',
            113 : 'F2',
            114 : 'F3',
            115 : 'F4',
            116 : 'F5',
            117 : 'F6',
            118 : 'F7',
            119 : 'F8',
            120 : 'F9',
            121 : 'F10',
            122 : 'F11',
            123 : 'F12',
        };
        
        return keys[e.keyCode] ? 
            keys[e.keyCode] : 
            String.fromCharCode(e.charCode).toUpperCase();
    },
    
    isChildOf : function(node, parent)
    {
        while (node)
        {
            if (node.parentNode == parent)
                return true;
            else
                node = node.parentNode;
        }
        return false;
    },
    
    findTextNodes : function(node)
    {
        var list = [], 
            child = node.firstChild;
        
        while (child)
        {
            if (child.nodeName == '#text')
                list.push(child);
            else if (child.childNodes.length > 0)
                list = list.concat(self.findTextNodes(child));
            
            child = child.nextSibling;
        }
        
        return list;
    },
    
    findNodeIndex : function(node)
    {
        if (!node.parentNode)
            return null;
        
        for (var index = 0; node = node.previousSibling; ++index);
        
        return index;
    },
    
    nodeToText : function(node)
    {
        var text = '';
        
        if (node.firstChild)
            for (var child = node.firstChild; child; child = child.nextSibling)
                text += self.nodeToText(child);
        else if (node.id == 'anchor')
            text += '\u2693';
        else if (node.id == 'focus')
            text += '\u2038';
        else if (node.nodeName == '#text')
            text += node.nodeValue;
        else if (node.nodeName == 'BR')
            text += '\n';
        
        return text;
    },
    
    debug : function()
    {
    },
}

window.addEventListener('load', function (e) {FireCode.initialize();}, false);
window.addEventListener('load', function (e) {top.FireCode.initialize();}, false);