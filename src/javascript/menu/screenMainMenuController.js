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
 * This method adds all the events to the mainMenu screen
 *
 * @name Screen_mainMenu_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage" ], function( Stage ) {

    var Player = require("Player");

    /**
     * This method is called when the screen mainMenu is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_mainMenu_Controller
     */
    function load() {
        Player.playInLoop( Player.audios.musics.menu );

        console.log("Configuring main menu listeners");

        $(".menuButton").click(function() {
            Player.play( Player.audios.sfx.selecionarMenu );
        });

        // Iniciar Jogo
        $("#initGame_btn").click(function() {
            console.log( this );
            Player.play( Player.audios.sfx.selecionarMenu );
            Stage.changeScreen( 5 );
        });

        // Carregar Jogo
        $("#conteudo_btn").click(function() {
            console.log( this );
            Player.play( Player.audios.sfx.selecionarMenu );
            Stage.changeScreen( 7 );
        });

        // Configurações
        $("#config_btn").click(function() {
            console.log( this );
            Player.play( Player.audios.sfx.selecionarMenu );
            Stage.changeScreen( 4 );
        });

        // Créditos
        $("#credits_btn").click(function() {
            console.log( this );
            Player.play( Player.audios.sfx.selecionarMenu );
            Stage.changeScreen( 3 );
        });
    }

    /**
     * This method is called when the screen mainMenu is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_mainMenu_Controller
     */
    function unload() {
        // $('.menuButton')

    }

    return {
        load: load,
        unload: unload
    };

});
