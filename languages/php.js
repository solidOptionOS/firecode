FireCode.parser = 
{
    expect : ['whitespace', 'newline'],
    
    tokens :
    {
        'whitespace' : /^ +/,
        'newline' : /^\n/,
        'php-open-tag' : /^<\?php/,
        'php-close-tag' : /^\?>/,
        
        'php-var' : /^\$\w+/,
        'php-func' : /^\w+(?=\s*\()/,
        'php-const' : /^[A-Z0-9_]+/,
        'php-semicolon' : /^;/,
        'php-operator' : /^(=|<|>|<=|>=|==|===|!=|!==)/,
        'php-number' : /^(\d+|\d*\.\d+)/,
        'php-string-1' : /^'(\\'|[^'])*'/,
        'php-string-2' : /^"(\\"|[^"])*"/,
        
        'php-open-scope' : /^\(/,
        'php-close-scope' : /^\)/,
        
        'php-comment-start' : /^\/\*\*?/ ,
        'php-comment-text' : /^(\n|.)+(?!\*\/)/,
        'php-comment-end' : /^\*\//,
        
    },
    
    sequence : 
    {
        'php-comment-start' : ['php-comment-text', 'php-comment-end'],
        
    },
    
};