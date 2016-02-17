'use strict';
module.exports = function (grunt) {
    grunt.registerTask('publish', 'Publishs project to gh-pages', function (n) {
        grunt.option('target', 'prod');

        grunt.task.run([
            'build',
            'gh-pages'
        ]);
    });
};
