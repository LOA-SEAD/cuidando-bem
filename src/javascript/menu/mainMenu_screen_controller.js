/**
 *
 * @name MainMenu_Screen_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
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