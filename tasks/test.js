module.exports = function (grunt) {
    grunt.registerTask('test',
        [
            'clean:build',
            'copy:build',
            'htmlmin:build',
            'less:build',
            'clean:build_less'
        ]
    );
};
