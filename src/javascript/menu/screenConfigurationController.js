/**
 * This method adds all the events to the configuration screen
 *
 * @name Screen_configuration_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage" ], function( Stage ) {

    var Player = require("Player");

    /**
     * This method is called when the screen Configuration is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_configuration_Controller
     */
    function load() {
        $(".menuButton").click(function() {
            Player.play( Player.audios.sfx.selecionarMenu );
        });

        $("#muteSoundButton").click(function() {
            Player.mute();
        });

        $(".backButton").click(function() {
            Stage.changeScreen( 0 );
        });

        $(".slider").slider();
    }

    /**
     * This method is called when the screen Configuration is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_configuration_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    };

});
