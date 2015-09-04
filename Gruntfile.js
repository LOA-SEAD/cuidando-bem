/*
This file is a configuration script fot the tool "Grunt"

This gruntfile minifies html, css and js of the game project CuidandoBem

@author Otho - Marcelo Lopes Lotufo
*/
module.exports = function(grunt) {

    var src_path = 'src/';
    var javascript_path = src_path + 'javascript/';
    var js = 'javascript/';
    var build = 'build/';
    var final = 'build_s1/';

    var libs = build + 'javascript/libs/';

    var documentation_src_path = 'doc_src/';
    var documentation_path = 'docs/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jsdoc : {
            docs : {
                src: [
                    src_path+'/**/*.js',
                    '!'+javascript_path+'/game/scripts/levels/*.js',

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
                src: [ build ]
            },

            build_less:{
                expand: true,
                cwd: build +'assets/css/',
                src: ['**/*.less']
            },

            css: {
                src: [ build + 'assets/css', build + 'javascript/libs/less.js']

            },

            final: {
                src: [ final ]
            },

            docs: {
                src: [documentation_path]
            }
        },

        copy: {
            build: {
                options:{

                },
                files: [
                    {
                        cwd: src_path,
                        src: ['**'],
                        dest: build,
                        expand: true
                    },
                    [
                        {
                            dest: libs + 'jquery.js', 
                            src: ['./libs/jquery/dist/jquery.min.js']
                        },
                        {
                            dest: libs + 'jquery.min.map', 
                            src: ['./libs/jquery/dist/jquery.min.map']
                        },
                        {
                            dest: libs + 'jquery-ui.js', 
                            src: ['./libs/jquery-ui/jquery-ui.min.js']
                        },
                        {
                            dest: libs + 'jquery.mask.js',
                            src: ['./libs/jQuery-Mask-Plugin/dist/jquery.mask.js']
                        },
                        {
                            dest: libs + 'require.js' , 
                            src: ['./libs/requirejs/require.js']
                        },
                        {
                            dest: libs + 'text.js' , 
                            src: ['./libs/requirejs-text/text.js']
                        },
                        {
                            dest: libs + 'simpleStorage.js',
                            src: ['./libs/simpleStorage/simpleStorage.js']
                        }
                    ]
                ]
                
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
                        src : build + "index.html",
                        dest: build + "index.html"
                    },

                    {
                        expand : true,
                        cwd: src_path,
                        src: "assets/html/**/*.html",
                        dest : build
                    }
                ]
            }
        },

        less : {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: src_path + 'assets/css/',
                        src: ['main.less'],
                        dest: build + 'assets/css/',
                        ext: '.css'
                    }
                ]
            }
        },

        cssmin: {
            build : {
                options : {
                    keepSpecialComments : 0
                },

                src: build + 'styles/**/*.css',
                dest: build + 'styles/main.css'

            }

        },

        replace: {
            index: {
                src: [build + 'index.html'],             // source files array (supports minimatch)
                dest: build + 'index.html',             // destination directory or file
                replacements: [
                    {
                        from: '<link rel="stylesheet/less" type="text/css" href="./assets/css/main.less">',                   // string replacement
                        to: '<link rel="stylesheet" type="text/css" href="./assets/css/main.css">'
                    },                    
                    {
                        from: 'src="../libs/requirejs/require.js"',
                        to: 'src="./javascript/libs/require.js"'
                    },
                    {
                        from: '<script src="//localhost:35729/livereload.js"></script>',
                        to: ''
                    }
                ]
            },

            main: {
                src: [build + js + 'main.js'],            
                dest: build + js + 'main.js',   
                replacements: [
                    {
                        from: 'require(["jquery", "less"], function () {',
                        to: 'require(["jquery"], function (){'
                    }
                ]
            },

            bootstrap: {
                src: [build + js + 'requireConfig.js'],
                dest: build + js + 'requireConfig.js',
                replacements: [
                    {
                        from: "jquery: '../../libs/jquery/dist/jquery.min',",
                        to: "jquery: './libs/jquery',"
                    },
                    {
                        from: "jqueryui: '../../libs/jquery-ui/jquery-ui.min',",
                        to: "jqueryui: './libs/jquery-ui',"
                    },
                    {
                        from: "jquerymask: '../../libs/jQuery-Mask-Plugin/dist/jquery.mask',",
                        to: "jquerymask: './libs/jquery.mask',"
                    },
                    {
                        from: "text: '../../libs/requirejs-text/text',",
                        to: "text: './libs/text',"
                    },
                    {
                        from: "less: '../../libs/less/dist/less.min',",
                        to: ""
                    },
                    {
                        from: "SimpleStorage: '../../libs/simpleStorage/simpleStorage',",
                        to: "SimpleStorage: './libs/simpleStorage',"
                    }
                ]
            },

            logs: {
                overwrite: true,
                src: [build + '**/*.js'],

                replacements: [
                    {
                        from: /(console.assert)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.count)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.debug)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.dir)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.error)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.group)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.groupCollapsed)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.groupEnd)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.info)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.log)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.profile)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.profileEnd)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.table)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.time)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.timeEnd)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.trace)(.)*\)/g,
                        to: ''
                    },
                    {
                        from: /(console.warn)(.)*\)/g,
                        to: ''
                    }
                ]
            }
        },

        requirejs: {
            compile: {
                options: {
                    appDir: build,
                    baseUrl: "./",
                    dir: final,
                    optimize: 'uglify',
                    mainConfigFile: build + "javascript/requireConfig.js",


                    inlineText:true,
                    stubModules: ['text'],

                    paths: {
                        'text':'javascript/libs/text'
                    }
                }
            }
        },

        rename: {
            build: {
                files: [
                    {
                        src: [final],
                        dest: build
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
    grunt.registerTask('default', 
        [
            'clean:build', 
            'copy:build', 
            'htmlmin:build', 
            'less:build', 
            'clean:build_less',
            'replace', 
            'cssmin:build', 
            'clean:final', 
            'requirejs:compile', 
            'clean:build', 
            'rename:build'
        ]
    );

    grunt.registerTask('test', 
        [
            'clean:build', 
            'copy:build', 
            'htmlmin:build', 
            'less:build', 
            'clean:build_less'
        ]
    );

    grunt.registerTask('docs', 
        [
            'clean:docs', 
            'jsdoc:docs'
        ]
    );
};