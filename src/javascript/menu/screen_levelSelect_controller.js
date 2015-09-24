/**
 * This method adds all the events to the levelSelect screen
 *
 * @name Screen_levelSelect_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define(['Stage', 'levelsData'], function (Stage, game) {

    var Player = require('Player');
    var Storage = require('Storage');
    var Dialogs = require('Dialogs_data');
    var Lib = require('Commons');

    var save;

    /**
     * This method is called when the screen levelSelect is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_levelSelect_Controller
     */
    function load() {

        save = Storage.getLoadedSlot();

        //Change player name to save slot name
        Lib.characters.jogador.setName(save.name);



        var i;
        for(i in save.levels){
            if(i > save.lastLevel + 1) {
                $($('.level')[i]).addClass('disabled');
            }
        }

        $('.menuButton').click(function(){
            Player.play(Player.audios.sfx.selecionar_menu);
        });

        $('.backButton').click(function () {
            Stage.changeScreen(5);
        });

        $('.level').click(function(){
            var index = $('.level').index(this);
            var levelId = index;

            console.log("Grr: "+levelId + "/" + save.lastLevel);
            if(levelId <= save.lastLevel + 1){
                game.setCurrentLevel(levelId);
                Stage.changeScreen(1);
            }

        });
    }

    /**
     * This method is called when the screen levelSelect is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_levelSelect_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    }

});