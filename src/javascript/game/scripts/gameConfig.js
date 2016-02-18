/*

 This module register which files to load. Each of these files should contain a Level.

 @author Otho - Marcelo Lopes Lotufo
 */
define(function() {
    console.info("GameConfig - module loaded");
    var generalPath = "./game/scripts/levels/";
    var filePaths = [

        "Fase0",
        "Fase1",
        "Fase2",
        "Fase3",
        "Fase4",
        "Fase5",
        "Fase6",
        "Fase7",
        "Fase8",
        "FaseTeste"
        // "Fase9"

    ];

    var i;
    for ( i = 0; i < filePaths.length; i++ ) {
        console.log("\tRequiring Level module: ", filePaths[ i ] );
        require([ generalPath + filePaths[ i ] ]);
    }
});
