//jsdoc
'use strict';
module.exports = {
    options: {

    },
    
    docs : {
        src: [
            '<%= pkg.source %>'+'/**/*.js',
            '!'+'<%= pkg.source %>'+'/javascript/game/scripts/levels/*.js',

            'README.md'
        ],
        options: {
            destination: '<%= pkg.documentation %>',
            template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
            configure : "jsdoc.conf.json"
        }
    }
};