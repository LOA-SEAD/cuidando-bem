/**
 *
 * @name Credits_Screen_Controller
 * @module
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
            var levelId;
            switch (index){
                case 0:
                default:
                    levelId = 0;
                    break;
                case 1:
                    levelId = 1;
                    break;

                /*
                case 2:
                    levelId = 2;
                    break;
                case 3:
                    levelId = 3;
                    break;
                case 4:
                    levelId = 4;
                    break;
                case 5:
                    levelId = 5;
                    break;
                case 6:
                    levelId = 6;
                    break;
                case 7:
                    levelId = 7;
                    break;
                case 8:
                    levelId = 8;
                    break;
                */
            }
            game.setCurrentLevel(levelId);
            Stage.changeScreen(1);
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