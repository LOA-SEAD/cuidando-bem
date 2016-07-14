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
                autoPublishing :   false,
                autoVersioning :    false,
                setupInitialLevel:  true,
                setupInitialScreen: true

            "prod" - Builds game to be tested in a production env. This is the way the game should
            be deployed if everything is ok.
                minifications :     true,
                removeLogs :        true,
                autoPublishing :   false,
                autoVersioning :    false,
                setupInitialLevel:  false,
                setupInitialScreen: false

            "rel" - Takes the game builded in "prod" publishs it and updates the game version
                minifications :     true,
                removeLogs :        true,
                autoPublishing :   true,
                autoVersioning :    true, //dependent on grunt option "v"
                setupInitialLevel:  false,
                setupInitialScreen: false
        */

        // Get target option or set it to "dev"
        var target = grunt.option("target") || "dev";
        // Get ver option or set it to "minor"
        var ver = grunt.option("ver") || "minor";

        grunt.log.write("Building " + pkg.name + ":" + target );

        // Build for development
        grunt.task.run([
            "clean:dev",
            "newer:imagemin:dev",
            "copy:dev",
            "copy:libs",
            "replace:version",
            "less:dev",
            "postcss:dev"
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
    });
};
