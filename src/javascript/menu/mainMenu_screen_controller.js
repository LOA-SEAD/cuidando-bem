/**
 *
 * @name MainMenu_Screen_Controller
 * @module
 */
define(['stage', 'CuidandoBem'], function (stage, core) {

    var Player = require('Player');

    /**
     * Description
     * @method load
     * @memberOf module:MainMenu_Screen_Controller
     */
    function load() {
        console.log("Configuring main menu listeners");
        var menuButtons = $('.menuButton');

        menuButtons.click(function(){
           Player.play(Player.audios.selecionar_menu);
        });

        $(menuButtons[0]).click(function () {
            console.log(this);
            stage.changeScreen(1);
        });

        $(menuButtons[1]).click(function () {
            console.log(this);
            stage.changeScreen(2);
        });

        $(menuButtons[2]).click(function () {
            console.log(this);
            stage.changeScreen(4);
        });

        $(menuButtons[3]).click(function () {
            console.log(this);
            stage.changeScreen(3);
        });
    }

    /**
     * Description
     * @method unload
     * @memberOf module:MainMenu_Screen_Controller
     */
    function unload() {
        //$('.menuButton')

    }

    return {
        load: load,
        unload: unload
    }

});