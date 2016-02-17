//watch
'use strict';
module.exports = {
    js : {
        files: [
            '<%= pkg.source %>' + '/javascript/**/*.js'
        ],
        tasks: [
            //'clean:js', 
            'newer:copy:js', 
            'newer:copy:libs'
        ],
        options: {
            livereload: false
        }
    },

    html : {
        files: [
            '<%= pkg.source %>' + '/html/**/*.html'
        ],
        tasks: [
            //'clean:html', 
            'newer:copy:html'
        ],
        options: {
            livereload: false
        }
    },

    less : {
        files: [
            '<%= pkg.source %>' + '/css/**/*.less'
        ],
        tasks: [
            'newer:less:dev'
        ],
        options: {
            livereload: false
        }
    },

    images : {
        options: {
            livereload: false,
        },
        files: [
            '<%= pkg.source %>' + '/images/**/*.{png,jpg,jpeg,gif}'
        ],
        tasks: [
            'newer:copy:images'
        ]
    },

    livereload : {
        files: [
            '<%= pkg.development %>' + '/**/*'
        ],
        options: {
            livereload: true
        }
    }
};