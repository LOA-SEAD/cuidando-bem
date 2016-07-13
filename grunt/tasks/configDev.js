// configDev
"use strict";
module.exports = function( grunt ) {
    grunt.registerTask( "configDev", "Config local variables to enhance testing", function( target ) {
        var pkg = grunt.file.readJSON( "package.json" );

        if ( !grunt.file.exists( "dev.env.json" ) ) {
            var defaultDev = {
                initScreen: 0,
                initLevel: 2
            };
            grunt.file.write( "dev.env.json", JSON.stringify( defaultDev, undefined, 4 ) );
        }
    });
};
