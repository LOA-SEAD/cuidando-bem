// clean
"use strict";
module.exports = {
    options: {
        force: true
    },

    js: {
        src: [ "<%= pkg.development %>" + "/javascript/**/*.js" ]
    },

    html: {
        src: [ "<%= pkg.development %>" + "/html/**/*.html" ]
    },

    dev: {
        src: [
            "./<%= pkg.development %>/{css,javascript,html,fonts,sounds,index.html}"
        ]
    },

    prod: {
        src: [ "./<%= pkg.production %>" ]
    },

    images: {
        src: [ "./<%= pkg.production %>" + "/images" ]
    },

    docs: {
        src: [ "./<%= pkg.documentation %>/" ]
    }
};
