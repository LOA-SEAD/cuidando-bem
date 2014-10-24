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

    function open(_modalScene){
        if(lastSceneClass != ""){
            $(divSelector).addClass(_modalScene.getCssClass());
        }else
        {
            $(divSelector).removeClass(lastSceneClass);
            $(divSelector).addClass(_modalScene.getCssClass());

            lastSceneClass = _modalScene.getCssClass();
        }

        show();
    }

    function close(){
        L.info("Close modal Scene");
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

        close: close,
        open: open,

        isShowing: isShowing

    }

});