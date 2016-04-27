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
/**
 * This method adds all the events to the Game screen
 *
 * @name Screen_game_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage", "CuidandoBem" ], function( Stage, Core ) {

    var Player = require("Player");

    /**
     * This method is called when the screen Game is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_game_Controller
     */
    function load() {
        $(".menuButton").click(function() {
            Player.play( Player.audios.sfx.selecionarMenu );
        });

        $(".backButton").click(function() {
            Stage.changeScreen( 0 );
        });

        $("#pauseButton").click(function() {
            $( "#pauseMenu" ).toggle();
        });

        $(".quit.button").click(function() {
            Stage.changeScreen( 6 );
        });

        $(".replay.button").click(function() {
            Core.restartLevel();
            $( "#pauseMenu" ).hide();
        });

        $(".config.button").click(function() {
            //TODO não é possível voltar ao jogo depois de ir à tela de configuração
            Stage.changeScreen( 4 );
        });

        $(".back.button").click(function() {
            $( "#pauseMenu" ).hide();
        });

        Core.init();
        Player.stopAll();
        Player.playInRange( Player.audios.musics.inGame );
    };

    /**
     * This method is called when the screen Game is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_game_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    };

});
