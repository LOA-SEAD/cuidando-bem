/**
 *
 * @name Configuration_Screen_Controller
 * @module
 */
define(['stage'], function (stage) {

    var Player = require('Player');

    /**
     * Description
     * @method load
     * @memberOf module:Configuration_Screen_Controller
     */
    function load() {
        $('.menuButton').click(function(){
            Player.play(Player.audios.selecionar_menu);
        });

        $('.backButton').click(function () {
            stage.changeScreen(0);
        });
    }

    /**
     * Description
     * @method unload
     * @memberOf module:Configuration_Screen_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    }

});