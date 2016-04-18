// requirejs
"use strict";
module.exports = {
    options: {

    },

    prod: {
        options: {
            appDir: "<%= pkg.production %>",
            dir: "<%= pkg.production %>",
            baseUrl: "./",
            optimize: "uglify",
            mainConfigFile: "<%= pkg.production %>" + "/javascript/requireConfig.js",
            allowSourceOverwrites: true,
            keepBuildDir: true,

            inlineText: true,
            stubModules: [ "text" ],

            paths: {
                "text":"javascript/libs/text"
            }
        }
    }
};
