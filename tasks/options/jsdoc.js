// jsdoc
"use strict";
module.exports = {
    options: {

    },

    docs: {
        src: [
            "<%= pkg.source %>" + "/**/*.js",
            "!" + "<%= pkg.source %>" + "/javascript/game/scripts/levels/*.js",

            "README.md"
        ],
        options: {
            destination: "<%= pkg.documentation %>",
            template: "node_modules/minami/",
            configure: "jsdoc.conf.json"
        }
    }
};
