define(['core'], function(core){

//Attributes

    var divSelector = "#modalScene";
    var showing = false;

    var lastSceneClass = "";
//Methods
    //Init
    function init(){

    }

    function show(){
        L.info("Show Modal Scene");
        showing = true;
        $(divSelector).show();
    }

    function changeScene(modalScene){
        if(lastSceneClass != ""){
            $(divSelector).addClass(modalScene.getCssClass());
        }else
        {
            $(divSelector).removeClass(lastSceneClass);
            $(divSelector).addClass(modalScene.getCssClass());

            lastSceneClass = modalScene.getCssClass();
        }

        show();
    }

    function hide(){
        L.info("Hide modal Scene");
        showing = false;
        $(divSelector).hide();
    }

//Getters
    function isShowing(){
        return showing;
    }

//Setters


//Public Interface
    return {
        init: init,

        show: show,
        hide: hide,
        changeScene: changeScene,

        isShowing: isShowing

    }

});