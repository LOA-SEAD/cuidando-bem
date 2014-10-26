/**
 *
 * @name Scene_Game_Controller
 * @module
 */
define(['core'], function (core) {


//Attributes
//Methods

    /**
     * Description
     * @method changeScene
     * @param {} _newScene
     * @memberOf module:Scene_Game_Controller
     */
    function changeScene(_newScene) {
        setScene(_newScene);
    }

    /**
     * Description
     * @method setScene
     * @param {} _scene
     * @memberOf module:Scene_Game_Controller
     */
    function setScene(_scene) {
        $('#backgroundScene').attr('class', _scene.getCssClass());
    }

//Getters
//Setters
//Public Interface
    return {
        changeScene: changeScene,
        setScene: setScene
    }

});