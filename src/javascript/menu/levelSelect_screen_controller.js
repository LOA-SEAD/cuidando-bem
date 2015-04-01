/**
 *
 * @name Credits_Screen_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define(['Stage', 'levelsData'], function (Stage, game) {

    var Player = require('Player');
    var SaveLoadGame = require('SaveLoadGame');

    var save = SaveLoadGame.getLoadedSlot();

    /**
     * Description
     * @method load
     * @memberOf module:Credits_Screen_Controller
     */
    function load() {

        //for(i=0; i< save.levels.length; i++){
        for(i in save.levels){
            if(i > save.lastLevel + 1) {
                $($('.level')[i]).addClass('disabled');
            }
        }

        $('.menuButton').click(function(){
            Player.play(Player.audios.sfx.selecionar_menu);
        });

        $('.backButton').click(function () {
            Stage.changeScreen(0);
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