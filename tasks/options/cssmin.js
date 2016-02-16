//cssmin
'use strict';
module.exports = {
    prod : {
        options : {
            keepSpecialComments : 0
        },

        prod : {
            src: '<%= pkg.development %>' + 'styles/**/*.css',
            dest: '<%= pkg.production %>' + 'styles/main.css'
        }
    }
};
