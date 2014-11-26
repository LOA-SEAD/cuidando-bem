/**
 *
 * @name gameConfig
 * @module
 */

define([], function () {

    var generalPath = "../scripts/gameConfig/";
    var filePaths = [
        "file1",
        "file2",
        "teste"
    ];

    for (i = 0; i < filePaths.length; i++) {
        require([generalPath + filePaths[i]]);
    }
});