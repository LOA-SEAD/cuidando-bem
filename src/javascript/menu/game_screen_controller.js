/**
 *
 * @name Game_Screen_Controller
 * @module
 */
define(['stage', 'CuidandoBem'], function (stage, core) {

    var Player = require('Player');

    /**
     * Description
     * @method load
     * @memberOf module:Game_Screen_Controller
     */
    function load() {
        $('.menuButton').click(function(){
            Player.play(Player.audios.selecionar_menu);
        });

        $('.backButton').click(function () {
            stage.changeScreen(0);
        });

        core.start();
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