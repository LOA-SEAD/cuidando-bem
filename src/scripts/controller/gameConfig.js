/**
 *
 * @name gameConfig
 * @module
 */

define([], function () {

    var generalPath = "../scripts/gameConfig/";
    var filePaths = [
        "Tutorial",
        "Fase1",
        "teste"
    ];

    for (i = 0; i < filePaths.length; i++) {
        require([generalPath + filePaths[i]]);
    }
});