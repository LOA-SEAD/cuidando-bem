define(['core'], function(core){

    function changeScreen(css_class){
        //
        $('#backgroundScene').attr('class', css_class);
    }


    return {
        changeScreen: changeScreen
    }

});