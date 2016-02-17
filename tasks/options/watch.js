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
            'newer:copy:js', 
            'newer:copy:libs'
        ]        
    },

    html : {        
        files: [
            '<%= pkg.source %>' + '/html/**/*.html'
        ],
        tasks: [
            //'clean:html', 
            'newer:copy:html'
        ]        
    },

    less : {        
        files: [
            '<%= pkg.source %>' + '/css/**/*.less'
        ],
        tasks: [
            'newer:less:dev'
        ]        
    },

    images : {        
        files: [
            '<%= pkg.source %>' + '/images/**/*.{png,jpg,jpeg,gif}'
        ],
        tasks: [
            'newer:copy:images'
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