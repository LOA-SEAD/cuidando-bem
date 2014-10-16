define(['core'], function(core){

//Attributes
    var dialogModalSelector = "#dialogBar";

    var dialogTextSelector = ".text";
    var dialogCharImgSelector = ".char_img";
    var dialogOptionsSelector = ".dialog_options";

    var isDialogOpen = false;
//Methods
    //Init
    function init(){
        //bind event listeners to UI
    }

    function show(_dialog){
        if(!isDialogOpen)
        {
            openDialog(_dialog);
        }else
        {
            changeDialogTo(_dialog);
        }
    }

    function openDialog(_dialog){
        $(dialogModalSelector).css("display", "normal");
        changeDialogTo(_dialog);
    }

    function changeDialogTo(_dialog){
        $(dialogTextSelector).text(_dialog.getText());
        $(dialogCharImgSelector).addClass(_dialog.getSpeakerCssClass());
        addAllDialogButtons(_dialog.getOptions);

    }

    function close(){
        $(dialogModalSelector).css("display", "none");
    }

    function hide(){

    }

    function printText(){

    }

    function addDialogButton(_option){
        console.log(_option);
    }

    function addAllDialogButtons(_options){
        var i;

        for(i=0; i<_options.length;i++)
        {
            addDialogButton(_options[i]);
        }
    }

    function removeDialogButton(){

    }

    function removeAllDialogButtons(){

    }
    
//Getters
//Setters
//Public Interface
    return {
        init: init,

        show: show,
        close: close
    }

});