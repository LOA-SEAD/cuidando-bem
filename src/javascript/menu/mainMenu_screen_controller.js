/**
 *
 * @name MainMenu_Screen_Controller
 * @module
 */
define(['Stage', 'CuidandoBem'], function (Stage, Core) {

    var Player = require('Player');

    /**
     * Description
     * @method load
     * @memberOf module:MainMenu_Screen_Controller
     */
    function load() {
        //Player.setLoop(Player.audios.fundo, true);
        //Player.play(Player.audios.fundo);

        console.log("Configuring main menu listeners");
        var menuButtons = $('.menuButton');

        menuButtons.click(function(){
           Player.play(Player.audios.selecionar_menu);
        });

        $(menuButtons[0]).click(function () {
            console.log(this);
            Stage.changeScreen(1);
        });

        $(menuButtons[1]).click(function () {
            console.log(this);
            Stage.changeScreen(2);
        });

        $(menuButtons[2]).click(function () {
            console.log(this);
            Stage.changeScreen(4);
        });

        $(menuButtons[3]).click(function () {
            console.log(this);
            Stage.changeScreen(3);
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