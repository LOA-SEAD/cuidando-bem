//watch
'use strict';
module.exports = {
    options: {
        livereload: false
    },

    js : {
        files: [
            '<%= pkg.source %>' + '/javascript/**/*.js'
        ],
        tasks: [
            //'clean:js',
            'copy:js',
            'copy:libs'
        ]
    },

    html : {
        files: [
            '<%= pkg.source %>' + '/html/**/*.html'
        ],
        tasks: [
            //'clean:html',
            'copy:html'
        ]
    },

    less : {
        files: [
            '<%= pkg.source %>' + '/css/**/*.less'
        ],
        tasks: [
            'less:dev'
        ]
    },

    images : {
        files: [
            '<%= pkg.source %>' + '/images/**/*.{png,jpg,jpeg,gif}'
        ],
        tasks: [
            'copy:images'
        ]
    },

    livereload : {
        options: {
            livereload: true
        },
        files: [
            '<%= pkg.development %>' + '/**/*'
        ]
    }
};
