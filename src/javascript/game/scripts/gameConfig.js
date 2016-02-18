/*

 This module register which files to load. Each of these files should contain a Level.

 @author Otho - Marcelo Lopes Lotufo
 */
define(function() {
    console.info("GameConfig - module loaded");
    var generalPath = "./game/scripts/levels/";
    var filePaths = [

        "fase0",
        "fase1",
        "fase2",
        "fase3",
        "fase4",
        "fase5",
        "fase6",
        "fase7",
        "fase8",
        "faseTeste"
        // "fase9"

    ];

    var i;
    for ( i = 0; i < filePaths.length; i++ ) {
        console.log("\tRequiring Level module: ", filePaths[ i ] );
        require([ generalPath + filePaths[ i ] ]);
    }
});
