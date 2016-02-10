//clean
'use strict';
module.exports = {

    js : {
        src : ['<%= pkg.development %>' + '/javascript/**/*.js']
    },
    html: {
        src : ['<%= pkg.development %>' + '/html/**/*.html']
    },
    dev : {
        src : ['<%= pkg.development %>']
    },

    prod : {
        src : ['<%= pkg.production %>']
    },

    docs : {
        src : ['<%= pkg.documentation %>']
    }
};
