// watch
"use strict";
module.exports = {
    options: {
        livereload: false
    },

    js: {
        files: [
            "<%= pkg.source %>" + "/javascript/**/*.js"
        ],
        tasks: [
            // 'clean:js',
            "newer:copy:js",
            "newer:copy:libs"
        ]
    },

    html: {
        files: [
            "<%= pkg.source %>" + "/html/**/*.html"
        ],
        tasks: [
            // 'clean:html',
            "newer:copy:html"
        ]
    },

    less: {
        files: [
            "<%= pkg.source %>" + "/css/**/*.less"
        ],
        tasks: [
            "less:dev"
        ]
    },

    images: {
        files: [
            "<%= pkg.source %>" + "/images/**/*.{png,jpg,jpeg,gif}"
        ],
        tasks: [
            "newer:imagemin:dev"
        ]
    },

    livereload: {
        options: {
            livereload: true
        },
        files: [
            "<%= pkg.development %>" + "/**/*"
        ]
    }
};
