//clean
'use strict';
module.exports = {

    dev : {
        options : {
            livereload: true,
            open: true,
            port: '<%= pkg.port %>',
            hostname: 'localhost',
            base: '<%= pkg.development %>'
        }
    },

    prod : {
        port: '<%= pkg.port %>',
        base: '<%= pkg.production %>',
        open: {
          target: 'http://localhost:' + '<%= pkg.port %>'
        }
    },

    docs : {
        port: '<%= pkg.port %>',
        base: '<%= pkg.documentation %>'
    }
};
