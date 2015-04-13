/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.

 */
define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, Commons, Pulseira, Prontuario) {

        //region Imports
        var Dialogs = require('Dialogs').fase1;
        var Alerts = require('Dialogs').alertas;
        var HTML = require('HTML');
        //endregion

        var level = new Level("Level 8");
        console.groupCollapsed(level.getName());

        var flags_on = true;
        var visibility = false;

        //region Scenes

        //region Recepcao
        var recepcao = new Scene("recepcao", "scene-recepcao")
            .setCssClass("scene-lobby")
            .onLoad(function(){
                //Pulseira.open();
                Prontuario.open();
            });
        //endregion

        //endregion

        //region Level
        //region Register Scenes
        level.registerScene(recepcao);
        //endregion

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 8);

        console.groupEnd();
    });