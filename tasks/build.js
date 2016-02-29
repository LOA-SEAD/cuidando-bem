// build
"use strict";
module.exports = function( grunt ) {
    grunt.registerTask("build", "Builds project", function( n ) {
        var pkg = grunt.file.readJSON("package.json");

        /*
            target: "dev" "prod" "rel"

            "dev" - Builds game to run in a development env.
                minifications :     false,
                removeLogs :        false,
                autoPubilishing :   false,
                autoVersioning :    false,
                setupInitialLevel:  true,
                setupInitialScreen: true

            "prod" - Builds game to be tested in a production env. This is the way the game should be deployed if everything is ok.
                minifications :     true,
                removeLogs :        true,
                autoPubilishing :   false,
                autoVersioning :    false,
                setupInitialLevel:  false,
                setupInitialScreen: false

            "rel" - Takes the game builded in "prod" publishs it and updates the game version
                minifications :     true,
                removeLogs :        true,
                autoPubilishing :   true,
                autoVersioning :    true, //dependent on grunt option "v"
                setupInitialLevel:  false,
                setupInitialScreen: false
        */

        var target = grunt.option("target") || "dev";
        var ver = grunt.option("ver") || "minor";

        grunt.log.write("Building " + pkg.name + ":" + target );

        if ( target == "rel" ) {
            grunt.task.run([
                "version::" + ver
            ]);
        }

        // Build for development
        grunt.task.run([
            "clean:dev",
            "newer:imagemin:dev",
            "copy:dev",
            "copy:libs",
            "replace:version",
            "less:dev"
        ]);

        if ( target == "dev" ) {
            grunt.task.run([
                "replace:configDevScreen",
                "replace:configDevLevel"
            ]);
        }

        if ( target == "prod" || target == "rel" ) {
            // Take what was built for development and treat it for production
            grunt.task.run([
                "clean:prod",
                "copy:prod",
                "htmlmin:prod",
                "cssmin:prod",
                "replace:prod",
                "requirejs:prod"
            ]);
        }

        if ( target == "rel" ) {
            grunt.task.run([
                "compress:rel"
            ]);
        }
    });
};
