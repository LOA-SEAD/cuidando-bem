define(['core', 'text!../html/templates/dialogButtonTemplate.html'], function(core, dilogButtonTemplate){

//Attributes
    var dialogModalSelector = "#dialogBar";

    var dialogTextSelector = ".dialog_mainText";
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
        $(dialogModalSelector).css("display", "table");
        changeDialogTo(_dialog);

        isDialogOpen = true;
    }

    function changeDialogTo(_dialog){
        $(dialogTextSelector).text(_dialog.getText());
        $(dialogCharImgSelector).addClass(_dialog.getSpeakerCssClass());
        changeDialogOptionsTo(_dialog.getOptions());
    }
    function  changeDialogOptionsTo(_options){
        removeAllDialogButtons();
        addAllDialogButtons(_options);
    }
    function close(){
        $(dialogModalSelector).css("display", "none");

        isDialogOpen = false;
    }

    function hide(){

    }

    function printText(){

    }

    function addDialogButton(_option){
        console.log(_option);

        var element = $(dilogButtonTemplate);

        element.click(_option.actionFunction);
        $('.text', element).text(_option.text);


        $(dialogOptionsSelector).append(element);
    }

    function addAllDialogButtons(_options){
        var i;

        for(i=0; i<_options.length;i++)
        {
            addDialogButton(_options[i]);
        }
    }

    function removeDialogButton(_option){
        $('.'+_option.getCssClass(), element).remove();
    }

    function removeAllDialogButtons(){
        $(dialogOptionsSelector).empty();
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