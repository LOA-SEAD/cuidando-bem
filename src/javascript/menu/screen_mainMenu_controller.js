/**
 * This method adds all the events to the mainMenu screen
 * 
 * @name Screen_mainMenu_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define(['Stage', 'CuidandoBem'], function (Stage, Core) {

    var Player = require('Player');

    /**
     * This method is called when the screen mainMenu is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_mainMenu_Controller
     */
    function load() {
        //Player.setLoop(Player.audios.fundo, true);
        //Player.play(Player.audios.fundo);

        //Player.playInLoop(Player.audios.loops.test2);
        //Player.playInRange(Player.audios.sfx.objeto);

        console.log("Configuring main menu listeners");
        //var menuButtons = $('.menuButton');

        $('.menuButton').click(function(){
           Player.play(Player.audios.sfx.selecionar_menu);
        });

        //Iniciar Jogo
        $('#initGame_btn').click(function () {
            console.log(this);
            Stage.changeScreen(5);
        });

        //Carregar Jogo
        $('#loadGame_btn').click(function () {
            console.log(this);
            Stage.changeScreen(2);
        });

        //Configurações
        $('#config_btn').click(function () {
            console.log(this);
            Stage.changeScreen(4);
        });

        //Créditos
        $('#credits_btn').click(function () {
            console.log(this);
            Stage.changeScreen(3);
        });
    }

    /**
     * This method is called when the screen mainMenu is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_mainMenu_Controller
     */
    function unload() {
        //$('.menuButton')

    }

    return {
        load: load,
        unload: unload
    }

});