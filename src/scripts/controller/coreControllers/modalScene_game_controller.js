define(['core'], function(core){

//Attributes

    var divSelector = "modalScene";
    var isShowing = false;

    var lastSceneClass = "";
//Methods
    //Init
    function init(){

    }

    function show(){
        isShowing = true;
        $(divSelector).show();
    }

    function changeScene(newSceneClass){
        if(lastSceneClass != ""){
            $(divSelector).addClass(newSceneClass);
        }else
        {
            $(divSelector).removeClass(lastSceneClass);
            $(divSelector).addClass(newSceneClass);

            lastSceneClass = newSceneClass;
        }
    }

    function hide(){
        isShowing = false;
        $(divSelector).hide();
    }

//Getters
    function getIsShowing(){
        return isShowing;
    }

//Setters


//Public Interface
    return {

    }

});