/**
 *
 * @name gameConfig
 * @module
 */

define([], function () {

    console.info("Game Config module loaded");
    var generalPath = "./game/scripts/levels/";
    var filePaths = [
        "Tutorial",
        "Fase1"
    ];

    for (i = 0; i < filePaths.length; i++) {
        console.log("requiring level module");
        require([generalPath + filePaths[i]]);
    }
});