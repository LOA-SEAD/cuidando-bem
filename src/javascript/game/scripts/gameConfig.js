/**
 *
 * @name gameConfig
 * @module
 */

define([], function () {

    var generalPath = "./game/scripts/";
    var filePaths = [
        "Tutorial",
        "Fase1",
        "teste"
    ];

    for (i = 0; i < filePaths.length; i++) {
        require([generalPath + filePaths[i]]);
    }
});