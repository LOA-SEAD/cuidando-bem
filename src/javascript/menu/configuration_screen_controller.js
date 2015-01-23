/**
 *
 * @name Configuration_Screen_Controller
 * @module
 */
define(['Stage'], function (Stage) {

    var Player = require('Player');

    /**
     * Description
     * @method load
     * @memberOf module:Configuration_Screen_Controller
     */
    function load() {
        $('.menuButton').click(function(){
            Player.play(Player.audios.sfx.selecionar_menu);
        });

        $('#muteSoundButton').click(function(){
           Player.mute();
        });

        $('.backButton').click(function () {
            Stage.changeScreen(0);
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