// imagemin
"use strict";
module.exports = {
    options: {

    },

    dev: {
        options: {
            progressive: true,
            optimizationLevel: 7
        },
        files: [
            {
                expand: true,

                cwd: "<%= pkg.source %>" + "/images",
                dest: "<%= pkg.development %>" + "/images",
                src: [ "**/*.{png,jpg,jpeg}" ]
            }
        ]
    },

    prod: {
        options: {
            progressive: true,
            optimizationLevel: 7
        },
        files: [
            {
                expand: true,

                cwd: "<%= pkg.source %>" + "/images",
                dest: "<%= pkg.production %>" + "/images",
                src: [ "**/*.{png,jpg,jpeg}" ]
            }
        ]
    }
};
