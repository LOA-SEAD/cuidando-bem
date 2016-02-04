//htmlmin
module.exports = {
    prod : {
        options : {
            removeComments : true,
            collapseWhitespace : true,
            collapseBooleanAttributes : true,
            removeAttributeQuots : true,
            removeRedundantAttributes : true,
            caseSensitive : true
        },

        files :  [
            {
                src : '<%= pkg.development %>' + "index.html",
                dest: '<%= pkg.production %>' + "index.html"
            },

            {
                expand : true,
                cwd: '<%= pkg.development %>',
                dest : '<%= pkg.production %>',
                src: "assets/html/**/*.html"
            }
        ]
    }
};
