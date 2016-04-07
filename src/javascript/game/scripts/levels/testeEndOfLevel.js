/* by Wellyson */

define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "FreqRespiratoria", "ScoresData" ],
    function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores ) {

        var Dialogs = require("DialogsData").fase3;

        var level = new Level("Level 9");
        console.groupCollapsed( level.getName() );

        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function() {
                core.showEndOfLevel();
            });

        recepcao.registerDialogs([

        ]);

        level.registerScene( recepcao );

        level.setSetupScript(function() {
            // Script that runs once when the level is loaded or reloaded
        });

        level.setInitialScene( 0 );

        game.registerLevel( level, 12 );

        console.groupEnd();

    });
