define(['core'], function(core){


//Attributes
//Methods

    function changeScreen(css_class){
        //
        $('#backgroundScene').attr('class', css_class);
    }

//Getters
//Setters
//Public Interface
    return {
        changeScreen: changeScreen
    }

});