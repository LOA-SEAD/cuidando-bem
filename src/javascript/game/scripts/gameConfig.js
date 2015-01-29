/**
 *
 * @name gameConfig
 * @module
 */

define([], function () {
    console.info("GameConfig - module loaded");
    var generalPath = "./game/scripts/levels/";
    var filePaths = [
        "Tutorial",
        "Fase1",
        "Fase8"
    ];

    for (i = 0; i < filePaths.length; i++) {
        console.log("\tRequiring Level module: ", filePaths[i]);
        require([generalPath + filePaths[i]]);
    }
});