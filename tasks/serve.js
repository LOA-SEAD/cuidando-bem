'use strict';
module.exports = function (grunt) {
    grunt.registerTask('serve', 'Creates simple http server', function (n) {
        var pkg = grunt.file.readJSON('package.json');

        var target = grunt.option('target') || 'dev';

        grunt.log.write('Building and serving ' + pkg.name + ':' + target);

        if(target == 'docs') {
            //Build and serve docs
            grunt.task.run([
                'docs',
                'connect:docs'
            ]);
        } else if(target == 'dev') {
            //Build and serve development
            grunt.task.run([
                'build',
                'connect:dev',
                'watch'
            ]);
        } else if(target == 'prod') {
            //Build and serve production
            grunt.task.run([
                'build',
                'connect:prod',
                'watch'
            ]);
        }
    });
};
