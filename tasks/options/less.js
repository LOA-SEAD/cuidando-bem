//less
module.exports = {
    dev: {
        files: [
            {
                expand: true,
                cwd: '<%= pkg.source %>' + '/css/',
                dest: '<%= pkg.development %>' + '/css/',
                src: ['main.less'],
                ext: '.css'
            }
        ]
    }
};
