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
 * This method adds all the events to the loadGame screen
 *
 * @name Screen_loadGame_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage" ], function( Stage ) {

    var Player = require("Player");

    /**
     * This method is called when the screen loadGame is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_loadGame_Controller
     */
    function load() {
        $(".menuButton").click(function() {
            Player.play( Player.audios.sfx.selecionarMenu );
        });

        $(".backButton").click(function() {
            Stage.changeScreen( 6 );
        });

        animation();
    }

    function wait( time, callback ) {
      setTimeout( callback, time );
    }

    function animation() {
      var container = "#screen-vitoria";
      var recepcao = $(".cena.recepcao", container);
      var escritorio = $(".cena.escritorio", container);
      var contrato = $(".cena.contrato", container);
      wait( 1000, function() {
        $(".balao", recepcao).show();

        wait( 2000, function() {
          recepcao.animate({
            opacity: 0.0
          }, 1000, "swing", function () {
            alert("complete");
          });
        })
      })

    }

    /**
     * This method is called when the screen loadGame is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_loadGame_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    };

});
