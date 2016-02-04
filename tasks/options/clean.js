//clean
'use strict';
module.exports = {

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
