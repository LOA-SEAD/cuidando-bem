//cssmin
module.exports = {
    prod : {
        options : {
            keepSpecialComments : 0
        },

        src: '<%= pkg.development %>' + 'styles/**/*.css',
        dest: '<%= pkg.production %>' + 'styles/main.css'
    }
};
