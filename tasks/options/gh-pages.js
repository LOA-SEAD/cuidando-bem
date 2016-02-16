//gh-pages
'use strict';
module.exports = {
    options : {

    },
    rel : {
        options: {
            base: '<%= pkg.production %>',
            tag: 'v'+'<%= pkg.version %>',
            message: 'Auto-generated commit v'+'<%= pkg.version %>'
        },
        src: ['**/*']
    }
};