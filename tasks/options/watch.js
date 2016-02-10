//watch
'use strict';
module.exports = {
    js : {
        files: [
            '<%= pkg.source %>' + '/javascript/**/*.js'
        ],
        tasks: ['clean:js', 'copy:js', 'copy:libs'],
        options: {
            livereload: false
        }
    },
    html : {
        files: [
            '<%= pkg.source %>' + '/html/**/*.html'
        ],
        tasks: ['clean:html', 'copy:html'],
        options: {
            livereload: false
        }
    },
    less : {
        files: [
          '<%= pkg.source %>' + '/css/**/*.less'
        ],
        tasks: ['less:dev'],
        options: {
            livereload: false
        }
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