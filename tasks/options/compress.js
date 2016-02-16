//compress
'use strict';
module.exports = {
    rel : {
        options : {
            mode: 'zip',
            archive: '<%= pkg.releases %>'+'/'+'<%= pkg.name %>'+'-'+'<%= pkg.version %>'+'.zip'
        },
        files :[
            {
                expand: true,

                cwd: '<%= pkg.production %>',
                src: ['**/*'],
                dest: '<%= pkg.name %>'+'-'+'<%= pkg.version %>'
            }
        ]
    }
};