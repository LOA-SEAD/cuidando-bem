/**
 *
 * @name Game_Screen_Controller
 * @module
 */
define(['stage', 'core'], function (stage, core) {
    /**
     * Description
     * @method load
     * @memberOf module:Game_Screen_Controller
     */
    function load() {
        $('.backButton').click(function () {
            stage.changeScreen(0);
        });

        core.start();
    }

    /**
     * Description
     * @method unload
     * @memberOf module:Game_Screen_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    }

});