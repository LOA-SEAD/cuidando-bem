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
        src: [ "<%= pkg.development %>" + "**/*.js" ],
        dest: [ "<%= pkg.production %>" ],

        replacements: [
            {
                from: /(console.assert)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.count)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.debug)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.dir)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.error)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.group)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.groupCollapsed)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.groupEnd)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.info)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.log)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.profile)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.profileEnd)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.table)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.time)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.timeEnd)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.trace)(.)*\)/g,
                to: ""
            },
            {
                from: /(console.warn)(.)*\)/g,
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
                from: "Stage.setStartingScreenId( 0 );",
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
