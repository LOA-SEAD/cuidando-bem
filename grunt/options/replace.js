// replace
"use strict";
module.exports = {
    options: {

    },

    /*
        Remove console stuff from code before minification,
    so code on production won't fill console.
    */
    prod: {
        // expand: true,
        src: [ 
                "<%= pkg.production %>" + "/javascript/**/*.js",
                "!<%= pkg.production %>" + "/javascript/libs/*.js"
        ],
        overwrite: true,

        // Replace console.(anything)
        // Replace @dev tags
        replacements: [
            {
                from: / *(\/\/)? *console\.(.*?\))*;?\n?/g,
                to: ""
            },
            {
                from: /\/\/ *@dev *{(.|\n|\r)*?\/\/ *}/g,
                to: ""
            }
        ]
    },
    /*
        Put game name and version in html title
    */
    version: {
        src: [ "<%= pkg.source %>" + "/index.html" ],
        dest: [ "<%= pkg.development %>" + "/index.html" ],

        replacements: [
            {
                from: "<title>Cuidando Bem</title>",
                to: "<title>" + "Cuidando Bem v" + "<%= pkg.version %>" + "</title>"
            }
        ]
    },
    configDevScreen: {
        src: [ "<%= pkg.development %>" + "/javascript/game/scripts/stageConfig.js" ],
        dest: [ "<%= pkg.development %>" + "/javascript/game/scripts/stageConfig.js" ],

        replacements: [
            {
                from: "Stage.setStartingScreenId( 2 );",
                to: "Stage.setStartingScreenId( <%= devCfg.initScreen %> );"
            }
        ]
    },
    configDevLevel: {
        src: [ "<%= pkg.development %>" + "/javascript/game/modules/levelsData.js" ],
        dest: [ "<%= pkg.development %>" + "/javascript/game/modules/levelsData.js" ],

        replacements: [
            {
                from: "var currentLevel = 0;",
                to: "var currentLevel = <%= devCfg.initLevel %>;"
            }
        ]
    }
};
