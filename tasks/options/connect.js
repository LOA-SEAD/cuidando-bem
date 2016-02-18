//clean
'use strict';
module.exports = {
    options: {

    },

    dev : {
        options : {
            livereload: true,
            port: '<%= pkg.port %>',
            base: '<%= pkg.development %>'
        }
    },

    prod : {
        options : {
            keepalive: true,
            port: '<%= pkg.port %>',
            base: '<%= pkg.production %>'
        }
    },

    docs : {
        port: '<%= pkg.port %>',
        base: '<%= pkg.documentation %>'
    }
};
