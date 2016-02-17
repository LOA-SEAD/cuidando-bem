//compress
'use strict';
module.exports = {
    options: {

    },
    
    rel : {
        options : {
            mode: 'zip',
            archive: '<%= pkg.releases %>'+'/'+'<%= pkg.name %>'+'-'+'<%= pkg.version %>'+'.zip'
        },
        files :[
            {
                expand: true,
                cwd: '<%= pkg.production %>',
                dest: '<%= pkg.name %>'+'-'+'<%= pkg.version %>',
                src: ['**/*']
            }
        ]
    }
};