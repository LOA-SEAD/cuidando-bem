//clean
'use strict';
module.exports = {
    options: {

    },
    
    dev : {
        options : {
            open: true,
            livereload: true,
            port: '<%= pkg.port %>',
            base: '<%= pkg.development %>'
        }
    },

    prod : {
        options : {
            open: true,
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
