/*

This module register which files to load. Each of these files should contain a Level.

@author Otho - Marcelo Lopes Lotufo
 */
define(function () {
    console.info("GameConfig - module loaded");
    var generalPath = "./game/scripts/levels/";
    var filePaths = [

        "Tutorial",
        "Fase1",
        "Fase2",
        "Fase4",
        "Fase8"

    ];

    var i;
    for (i = 0; i < filePaths.length; i++) {
        console.log("\tRequiring Level module: ", filePaths[i]);
        require([generalPath + filePaths[i]]);
    }
});