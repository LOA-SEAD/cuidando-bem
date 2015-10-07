/* by Wellyson */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores){

        //region Imports
        var Dialogs = require("Dialogs_data").fase3;
        // var Scores = require("Scores_data").fase3;
        //endregion

        var level = new Level("Level 7");
        console.groupCollapsed(level.getName());

        //region Scenes

        //region Recepcao

        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function () {
                console.log("Load scene: " + recepcao.getName());
                core.openDialog(0);
            });

        recepcao.registerDialogs([
            // Dialog 0
            new Dialog(lib.characters.recepcionista)
                .setText("Essa fase ainda está em construção, por favor volte mais tarde.")
                .registerOption("", function(){
                    core.goBackToMenu();
                })
        ]);

        //endregion

        //endregion

        //region ModalScenes

        //endregion

        //region Level

        //region Register Scenes

        level.registerScene(recepcao);

        // endregion

        //region Register Modal Scenes

        //endregion

        //region Flags

        //endregion

        level.setSetupScript(function () {
            //Script that runs once when the level is loaded or reloaded
        });

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 7);

        console.groupEnd();

    });