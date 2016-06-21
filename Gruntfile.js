/*/*
This file is a configuration script fot the tool "Grunt"

This gruntfile minifies html, css and js of CuidandoBem, a html5 game

@author Otho - Marcelo Lopes Lotufo
*/
"use strict";
module.exports = function( grunt ) {

    // Time how long tasks take to be completed
    require( "time-grunt" )( grunt );

    var config = {
        pkg: grunt.file.readJSON( "package.json" ),
        env: process.env
    };

    // Automatically load required grunt tasks
    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require( "load-grunt-tasks" )( grunt );
    grunt.loadTasks( "./grunt/tasks/" );

    grunt.task.run([
        "configDev"
    ]);

    config.devCfg = grunt.file.readJSON( "dev.env.json" );

    // Function to load config separately
    function loadConfig( path ) {
        var glob = require( "glob" );
        var object = {};
        var key;

        glob.sync( "*", { cwd: path }).forEach(function( option ) {
            key = option.replace( /\.js$/, "" );
            object[ key ] = require( path + option );
        });

        return object;
    }

    // Magical line that actually load tasks configs from path below
    grunt.util._.extend( config, loadConfig( "./grunt/options/" ) );

    // Inits configuration
    grunt.initConfig( config );

};
