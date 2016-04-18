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
 * This method adds all the events to the Conteudo screen
 *
 * @name Screen_conteudo_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage" ], function( Stage ) {

    var Player = require("Player");

    /**
     * This method is called when the screen Conteudo is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_conteudo_Controller
     */
    function load() {
        // $('.menuButton').click(function(){
        //     Player.play(Player.audios.sfx.selecionarMenu);
        // });

        $(".backButton").click(function() {
            Stage.changeScreen( 0 );
        });
    }

    /**
     * This method is called when the screen Conteudo is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_conteudo_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    };

});
