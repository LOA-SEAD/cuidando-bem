//clean
'use strict';
module.exports = {

    dev : {
        port: '<%= pkg.port %>',
        base: '<%= pkg.development %>'
    },

    prod : {
        port: '<%= pkg.port %>',
        base: '<%= pkg.production %>'
    },

    docs : {
        port: '<%= pkg.port %>',
        base: '<%= pkg.documentation %>'
    }
};
