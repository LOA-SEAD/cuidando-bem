module.exports = function(grunt) {

    var src_path = 'src/';
    var build_path = 'build/';
    var build_step_1_path = 'build_s1/';

    var documentation_src_path = 'doc_src/';
    var documentation_path = 'docs/';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        jsdoc : {
            docs : {
                src: [
                    src_path+'/**/*.js',
                    '!'+src_path+'/scripts/libs/*.js',
                    '!'+src_path+'/scripts/gameConfig/*.js',
                    '!'+src_path+'/scripts/stageConfig/*.js',
                    '!'+src_path+'/scripts/main.js',
                    '!'+src_path+'/scripts/requireJsBootstrap.js',
                    'README.md'
                ],
                options: {
                    destination: documentation_path,
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "jsdoc.conf.json"
                }
            },
            dist : {
                src: ['!src/**/*.js', 'README.md'],
                options: {
                    destination: 'doc',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        },

        clean: {
            build: {
                src: [ build_path ]
            },

            css: {
                src: [ build_path + 'styles/css', build_path + 'scripts/libs/less.js']

            },

            final: {
                src: [ build_step_1_path ]
            },

            docs: {
                src: [documentation_path]
            }
        },

        copy: {
            build: {
                cwd: src_path,
                src: ['**', '!**/*.less', '!styles/less', '!styles/gameConfig'],
                dest: build_path,
                expand: true
            },

            docs: {
                cwd: src_path,
                src: [
                    '**/*.js',
                    '!scripts/libs/*.js',
                    '!scripts/gameConfig/*.js',
                    '!scripts/stageConfig/*.js',
                    '!scripts/main.js',
                    '!scripts/requireJsBootstrap.js'
                ],
                dest: documentation_src_path,
                expand: true
            }
        },

        htmlmin : {
            build : {
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

                        src : build_path + "index.html",
                        dest: build_path + "index.html"
                    },

                    {
                        expand : true,
                        cwd: src_path,
                        src: "html/**/*.html",
                        dest : build_path
                    }
                ]
            }
        },

        less : {
            build: {
                options: {
                    paths: [
                        "src/styles/gameConfig/"
                    ]
                },
                files: [
                    {
                        "build/style/styles.css": "src/styles/styles.less"
                    }
                ]
            }
        },

        cssmin: {
            build : {
                options : {
                    keepSpecialComments : 0
                },

                src: build_path + 'styles/**/*.css',
                dest: build_path + 'styles/styles.css'

            }

        },

        replace: {
            index: {
                src: [build_path + '/index.html'],             // source files array (supports minimatch)
                dest: build_path + 'index.html',             // destination directory or file
                replacements: [{
                    from: '<link rel="stylesheet/less" type="text/css" href="./styles/styles.less">',                   // string replacement
                    to: '<link rel="stylesheet" type="text/css" href="./styles/styles.css">'
                }]
            },

            bootstrap: {
                src: [build_path + 'scripts/requireJsBootstrap.js'],             // source files array (supports minimatch)
                dest: build_path + 'scripts/requireJsBootstrap.js',             // destination directory or file
                replacements: [{
                    from: 'require(["jquery", "libs/less"]);',                   // string replacement
                    to: 'require(["jquery"]);'
                }]
            },

            logs: {
                overwrite: true,
                src: [build_path + '**/*.js'],             // source files array (supports minimatch)

                replacements: [{
                    from: /(console.log)(.)*\)/g,                   // string replacement
                    to: ''
                }]
            }

        },

        requirejs: {
            compile: {
                options: {
                    appDir: build_path,
                    baseUrl: "./",
                    dir: build_step_1_path,
                    optimize: 'uglify',
                    mainConfigFile: build_path + "scripts/requireJsBootstrap.js",


                    inlineText:true,
                    stubModules: ['text'],

                    paths: {
                        'text':'scripts/libs/text'
                    }
                }
            },

            inline: {
                options: {
                    appDir: build_path,
                    baseUrl: "./",
                    dir: build_step_1_path,
                    optimize: 'none',
                    mainConfigFile: build_path+ "scripts/requireJsBootstrap.js",
                    inlineText: true,
                    stubModules: ['text'],
                    paths: {
                        "text" : "text"
                    }
                }
            }
        },

        rename: {
            build: {
                files: [
                    {
                        src: [build_step_1_path],
                        dest: build_path
                    }
                ]
            }
        }
    });

    // Loading grunt plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Registering tasks
    grunt.registerTask('default', ['clean:build', 'copy:build', 'replace', 'htmlmin:build', 'less:build', 'cssmin:build', 'clean:css', 'clean:final', 'requirejs:compile', 'clean:build', 'rename:build']);
    grunt.registerTask('docs', ['clean:docs', 'jsdoc:docs']);
};