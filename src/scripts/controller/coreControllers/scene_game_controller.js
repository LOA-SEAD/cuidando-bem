define(['core'], function(core){


//Attributes
//Methods

    function changeScene(_old, _new) {

        setScene(_new);

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