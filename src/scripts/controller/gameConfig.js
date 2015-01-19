/**
 *
 * @name gameConfig
 * @module
 */

define([], function () {

    var generalPath = "../scripts/gameConfig/";
    var filePaths = [
        "teste",
        "Tutorial",
        "Fase1"

    ];

    for (i = 0; i < filePaths.length; i++) {
        require([generalPath + filePaths[i]]);
    }
});