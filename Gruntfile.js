/*/*
This file is a configuration script fot the tool "Grunt"

This gruntfile minifies html, css and js of CuidandoBem, a html5 game

@author Otho - Marcelo Lopes Lotufo
*/
"use strict";
module.exports = function( grunt ) {

    var path = require( "path" );

    // Time how long tasks take to be completed
    require( "time-grunt" )( grunt );

    // Automatically load required grunt tasks
    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    // require( "load-grunt-tasks" )( grunt );

    require( "load-grunt-config" )( grunt, {
        // path to task.js files, defaults to grunt dir
        configPath: path.join( process.cwd(), "grunt/options" ),

        // auto grunt.initConfig
        init: true,

        // data passed into config.  Can use with <%= test %>
        data: {
          pkg: grunt.file.readJSON( "package.json" ),
          env: process.env,
          devCfg: grunt.file.readJSON( "dev.env.json" )
        }

        // loadGruntTasks: false
    });

    grunt.loadTasks( "./grunt/tasks/" );

    grunt.task.run([
        "configDev"
    ]);
};
