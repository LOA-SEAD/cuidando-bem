/*
This file is part of Cuidando Bem.

    Cuidando Bem is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Cuidando Bem is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Cuidando Bem.  If not, see <http://www.gnu.org/licenses/>.
*/
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
