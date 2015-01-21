/**
 *
 * @name Credits_Screen_Controller
 * @module
 */
define(['Stage'], function (Stage) {

    var Player = require('Player');

    /**
     * Description
     * @method load
     * @memberOf module:Credits_Screen_Controller
     */
    function load() {
        $('.menuButton').click(function(){
            Player.play(Player.audios.sfx.selecionar_menu);
        });

        $('.backButton').click(function () {
            Stage.changeScreen(0);
        });
    }

    /**
     * Description
     * @method unload
     * @memberOf module:Credits_Screen_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    }

});