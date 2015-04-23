/**
 * This method adds all the events to the Game screen
 *
 * @name Screen_game_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define(['Stage', 'CuidandoBem'], function (Stage, Core) {

    var Player = require('Player');

    /**
     * This method is called when the screen Game is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_game_Controller
     */
    function load() {
        $('.menuButton').click(function(){
            Player.play(Player.audios.sfx.selecionar_menu);
        });

        $('.backButton').click(function () {
            Stage.changeScreen(0);
        });

        Core.start();
        $('.content').tabs();
    }

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
    }

});