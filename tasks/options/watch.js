//watch
'use strict';
module.exports = {
    less : {
        files: [
          '<%= pkg.source %>' + '/css/**/*.less'
        ],
        tasks: ['less:dev'],
        options: {
            livereload: false
        }
    },
    css : {
        files: [
            '<%= pkg.development %>' + '/css/*.css'
        ],
        options: {
            livereload: true
        }
    }
};