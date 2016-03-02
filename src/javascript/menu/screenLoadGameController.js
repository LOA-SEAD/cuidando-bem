/**
 * This method adds all the events to the loadGame screen
 *
 * @name Screen_loadGame_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage" ], function( Stage ) {

    var Player = require("Player");

    /**
     * This method is called when the screen loadGame is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_loadGame_Controller
     */
    function load() {
        $(".menuButton").click(function() {
            Player.play( Player.audios.sfx.selecionarMenu );
        });

        $(".backButton").click(function() {
            Stage.changeScreen( 0 );
        });
    }

    /**
     * This method is called when the screen loadGame is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_loadGame_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    };

});
