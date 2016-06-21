// postcss
"use strict";
module.exports = {
    options: {
        map: true,
        processors: [
            require("autoprefixer")({ browsers: [ "last 2 versions" ] })
        ]
    },

    dev: {
        src: "<%= pkg.development %>/css/main.css"
    }
};
