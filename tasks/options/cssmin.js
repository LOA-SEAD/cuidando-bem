// cssmin
"use strict";
module.exports = {
	options: {

    },

    prod: {
        options: {
            keepSpecialComments: 1
        },

        prod: {
            src: "<%= pkg.development %>" + "styles/**/*.css",
            dest: "<%= pkg.production %>" + "styles/main.css"
        }
    }
};
