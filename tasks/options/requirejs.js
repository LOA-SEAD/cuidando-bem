//requirejs
'use strict';
module.exports = {
    options: {

    },
    
    prod: {
        options: {
            appDir: '<%= pkg.development %>',
            dir: '<%= pkg.production %>',
            baseUrl: "./",
            optimize: 'uglify',
            mainConfigFile: '<%= pkg.development %>' + "/javascript/requireConfig.js",


            inlineText:true,
            stubModules: ['text'],

            paths: {
                'text':'javascript/libs/text'
            }
        }
    }
};