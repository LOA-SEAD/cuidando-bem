/**
 *
 * @name MainMenu_Screen_Controller
 * @module
 */
define(['stage', 'core'], function (stage, core) {
    /**
     * Description
     * @method load
     * @memberOf module:MainMenu_Screen_Controller
     */
    function load() {
        console.log("Configuring main menu listeners");
        $($('.menuButton')[0]).click(function () {
            console.log(this);
            stage.changeScreen(1);
            //core.start();
        });

        $($('.menuButton')[1]).click(function () {
            console.log(this);
            stage.changeScreen(2);
        });

        $($('.menuButton')[2]).click(function () {
            console.log(this);
            stage.changeScreen(4);
        });

        $($('.menuButton')[3]).click(function () {
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
        unload: unload,
    }

});