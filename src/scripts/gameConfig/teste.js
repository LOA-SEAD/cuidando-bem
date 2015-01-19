/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'core', 'Commons'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib) {
        var Dialogs = require("Dialogs").tutorial;

        var level = new Level("Level Teste");
        console.groupCollapsed(level.getName());

        var lobby = new Scene("lobby", "scene-lobby",
            recepcaoOnLoad, recepcaoOnUnload);

        // Dialogs
        var fala_recepcionista = [];
        fala_recepcionista[0] = new Dialog(
            "Clara", "char-recepcionista",Dialogs.recepcionista[0]);

        fala_recepcionista[0].registerOption({
            text: '',
            actionFunction: function () {
                //core.closeDialog(0);
                console.log("Next dialog");
                core.openDialog(1);
            }});


        fala_recepcionista[1] = new Dialog(
            "Jogador", "char-recepcionista", Dialogs.recepcionista[1]);
        fala_recepcionista[1].registerOption({
            text: '',
            actionFunction: function () {
                core.openDialog(2);
            }});

        fala_recepcionista[2] = new Dialog(
            "Clara", "char-recepcionista", Dialogs.recepcionista[2]);
        fala_recepcionista[2].registerOption({
            text: Dialogs.recepcionista[3],
            actionFunction: function () {
                core.closeDialog(2);
            }});

        lobby.registerDialogs(fala_recepcionista);

        // Functions
        function recepcaoOnLoad() {
            core.openDialog(0);
        }

        function recepcaoOnUnload() {
            core.closeDialog(0);
            core.closeDialog(1);
        }

        level.registerScene(lobby);
        level.setInitialScene(0);

        game.registerLevel(level, -1);
        console.groupEnd();
    });