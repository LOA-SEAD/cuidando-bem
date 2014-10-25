/**
 *
 * @name Scene Game Controller
 * @module
 */
define(['core'], function(core){


//Attributes
//Methods

    function changeScene(_newScene) {
        setScene(_newScene);
    }

    function setScene(_scene){
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