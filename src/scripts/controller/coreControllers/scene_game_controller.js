define(['core'], function(core){


//Attributes
//Methods

    function changeScene(_old, _new) {
        _old.unload();
        setScene(_new);
        _new.load();
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