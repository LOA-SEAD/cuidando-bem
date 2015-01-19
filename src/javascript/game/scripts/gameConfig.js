/**
 *
 * @name gameConfig
 * @module
 */

define([], function () {

    console.info("Game Config module loaded");
    var generalPath = "./game/scripts/levels/";
    var filePaths = [
        "teste",
        "Tutorial",
        "Fase1"
<<<<<<< HEAD:src/javascript/game/scripts/gameConfig.js
=======

>>>>>>> master:src/scripts/controller/gameConfig.js
    ];

    for (i = 0; i < filePaths.length; i++) {
        console.log("requiring level module");
        require([generalPath + filePaths[i]]);
    }
});