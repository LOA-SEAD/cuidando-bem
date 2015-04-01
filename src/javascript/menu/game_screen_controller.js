/**
 *
 * @name Game_Screen_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define(['Stage', 'CuidandoBem'], function (Stage, Core) {

    var Player = require('Player');

    /**
     * Description
     * @method load
     * @memberOf module:Game_Screen_Controller
     */
    function load() {
        $('.menuButton').click(function(){
            Player.play(Player.audios.sfx.selecionar_menu);
        });

        $('.backButton').click(function () {
            Stage.changeScreen(0);
        });

        Core.start();
    }

    /**
     * Description
     * @method unload
     * @memberOf module:Game_Screen_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    }

});