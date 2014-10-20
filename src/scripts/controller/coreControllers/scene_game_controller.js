define(['core'], function(core){


//Attributes
//Methods

    function changeScene(css_class){
        $('#backgroundScene').attr('class', css_class);
    }

//Getters
//Setters
//Public Interface
    return {
        changeScene: changeScene
    }

});