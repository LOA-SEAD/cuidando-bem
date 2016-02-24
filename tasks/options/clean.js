// clean
"use strict";
module.exports = {
    options: {

    },

    js: {
        src: [ "<%= pkg.development %>" + "/javascript/**/*.js" ]
    },

    html: {
        src: [ "<%= pkg.development %>" + "/html/**/*.html" ]
    },

    dev: {
        src: [ "<%= pkg.development %>" ]
    },

    prod: {
        src: [ "<%= pkg.production %>" ]
    },

    images: {
        src: [ "<%= pkg.production %>" + "/images" ]
    },

    docs: {
        src: [ "<%= pkg.documentation %>" ]
    }
};
