//htmlmin
'use strict';
module.exports = {
    options: {

    },
    
    prod : {
        options : {
            removeComments : true,
            collapseWhitespace : true,
            collapseBooleanAttributes : true,
            removeAttributeQuotes : true,
            removeEmptyAttributes : true,
            removeRedundantAttributes : true,
            caseSensitive : true
        },

        prod : {
            files :  [
                {
                    src : '<%= pkg.development %>' + "index.html",
                    dest: '<%= pkg.production %>' + "index.html"
                },

                {
                    expand : true,
                    cwd: '<%= pkg.development %>',
                    dest : '<%= pkg.production %>',
                    src: "assets/html/**/*.html"
                }
            ]
        }
    }
};
