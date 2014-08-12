module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    clean: {
      build: {
        src: [ 'build' ],
      },

      css: {
        src: [ 'build/style/css', 'build/scripts/libs/less.js'],

      },

      final: {
        src: [ 'final' ],
      }
    },

    copy: {
      build: {
        cwd: 'src',
        src: ['**', '!**/*.less', '!style/less', '!style/gameConfig'],
        dest: 'build',
        expand: true,
      },
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

        files :  [ {
                   
          "./build/index.html" : "./build/index.html",
        },

        {
          expand : true,
          cwd: "src/",
          src: "html/**/*.html",
          dest : "build/"
        } ]


        
      }
    },

    less : {
      build: {
           options: {
               paths: ["src/style/less/"]
           },
           files: {"build/style/styles.css": "src/style/styles.less"}
       },       
    },

    cssmin: {
      build : {
        options : {          
          keepSpecialComments : 0
        },

        src: 'build/style/**/*.css',
        dest: 'build/style/styles.css'

      }

    },

    replace: {
      index: {
        src: ['build/index.html'],             // source files array (supports minimatch)
        dest: 'build/index.html',             // destination directory or file
        replacements: [{
          from: '<link rel="stylesheet/less" type="text/css" href="./style/styles.less">',                   // string replacement
          to: '<link rel="stylesheet" type="text/css" href="./style/styles.css">'
        }]
      },

      bootstrap: {
        src: ['build/scripts/requireJsBootstrap.js'],             // source files array (supports minimatch)
        dest: 'build/scripts/requireJsBootstrap.js',             // destination directory or file
        replacements: [{
          from: 'require(["jquery", "libs/less"]);',                   // string replacement
          to: 'require(["jquery"]);'
        }]        
      },

      logs: {
        overwrite: true,
        src: ['build/**/*.js'],             // source files array (supports minimatch)
        
        replacements: [{
          from: /(console.log)(.)*\)/g,                   // string replacement
          to: ''
        }]        
      },           

    },

    requirejs: {
        compile: {
          options: {
            appDir: "build/",
            baseUrl: ".",    
            dir: "final/", 
            optimize: 'uglify',       
            mainConfigFile: "build/scripts/requireJsBootstrap.js",            
            
            findNestedDependencies: true,
          }
        }
      }

    



  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['clean:build', 'copy', 'replace', 'htmlmin', 'less:build', 'cssmin', 'clean:css', 'clean:final', 'requirejs']);

};