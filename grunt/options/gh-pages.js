// gh-pages
"use strict";
module.exports = {
    options: {

    },

    rel: {
        options: {
            base: "<%= pkg.production %>",
            message: "Auto-generated commit v" + "<%= pkg.version %>"
        },
        src: [ "**/*" ]
    }
};
