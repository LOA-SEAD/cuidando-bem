/**
 * This method adds all the events to the Credits screen
 *
 * @name Screen_credits_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define(['Stage'], function (Stage) {

    var Player = require('Player');

    /**
     * This method is called when the screen Credits is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_credits_Controller
     */
    function load() {
        // $('.menuButton').click(function(){
        //     Player.play(Player.audios.sfx.selecionar_menu);
        // });

        $('.backButton').click(function () {
            Stage.changeScreen(0);
        });
    }

    /**
     * This method is called when the screen Credits is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_credits_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    }

});