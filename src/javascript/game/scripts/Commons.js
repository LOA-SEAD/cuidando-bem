/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core) {
        console.groupCollapsed("Commons:");

        var lib = {
            sceneLobby : new Scene("lobby", "scene-lobby")
        };

        console.groupEnd();
        return lib;
    });