FireCode = 
{
    attachAll : function()
    {
        t = document.getElementsByTagName('textarea');
        for (var i = 0, n = t.length; i < n; i++)
            if (t[i].className.match('firecode'))
                FireCode.attach(t[i]);
    },
    
    attach : function(textarea)
    {
        // Create top iframe tag for editor
        self = document.createElement('IFRAME');
        self.src = 'firecode.html';
        self.style.height = textarea.clientHeight + 'px';
        self.style.width = textarea.clientWidth + 'px';
        self.style.border = '1px solid gray';
        self.frameBorder = 0; // remove IE internal iframe border
        
        // Insert our editor and hide textarea
        self.textarea = textarea;
        self.textarea.parentNode.insertBefore(self, textarea);
        self.textarea.style.display = 'none';
    },
    
    initialize : function()
    {
        var engine = self.contentWindow.FireCode;
        engine.updateFocus(true);
        engine.replaceCode(/{cf}/gm, '{cf}' + self.textarea.value);
    },
}

if (window.attachEvent) window.attachEvent('onload', FireCode.attachAll);
else window.addEventListener('DOMContentLoaded', FireCode.attachAll, false);