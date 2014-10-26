/**
 *
 * @name DialogModal_Game_Controller
 * @module
*/
define(['core', 'text!../html/templates/dialogButtonTemplate.html'], function(core, dialogButtonTemplate){

//Attributes
    var dialogModalSelector = "#dialogBar";

    var dialogTextSelector = ".dialog_mainText";
    var dialogCharImgSelector = ".char_img";
    var dialogOptionsSelector = ".dialog_options";

    var isDialogOpen = false;
//Methods
    //Init
    /**
     * Description
     * @method init
     * @memberOf module:DialogModal_Game_Controller
*/
    function init(){
        //bind event listeners to UI
    }

    /**
     * Description
     * @method show
     * @param {} _dialog
     * @memberOf module:DialogModal_Game_Controller
*/
    function show(_dialog){
        if(!isDialogOpen)
        {
            openDialog(_dialog);
        }else
        {
            changeDialogTo(_dialog);
        }
    }

    /**
     * Description
     * @method openDialog
     * @param {} _dialog
     * @memberOf module:DialogModal_Game_Controller
*/
    function openDialog(_dialog){
        $(dialogModalSelector).css("display", "table");
        changeDialogTo(_dialog);

        isDialogOpen = true;
    }

    /**
     * Description
     * @method changeDialogTo
     * @param {} _dialog
     * @memberOf module:DialogModal_Game_Controller
*/
    function changeDialogTo(_dialog){
        $(dialogTextSelector).text(_dialog.getText());
        $(dialogCharImgSelector).addClass(_dialog.getSpeakerCssClass());
        changeDialogOptionsTo(_dialog.getOptions());
    }
    /**
     * Description
     * @method changeDialogOptionsTo
     * @param {} _options
     * @memberOf module:DialogModal_Game_Controller
*/
    function  changeDialogOptionsTo(_options){
        removeAllDialogButtons();
        addAllDialogButtons(_options);
    }
    /**
     * Description
     * @method close
     * @memberOf module:DialogModal_Game_Controller
*/
    function close(){
        $(dialogModalSelector).css("display", "none");

        isDialogOpen = false;
    }

    /**
     * Description
     * @method hide
     * @memberOf module:DialogModal_Game_Controller
*/
    function hide(){

    }

    /**
     * Description
     * @method printText
     * @memberOf module:DialogModal_Game_Controller
*/
    function printText(){

    }

    /**
     * Description
     * @method addDialogButton
     * @param {} _option
     * @memberOf module:DialogModal_Game_Controller
*/
    function addDialogButton(_option){
        L.log(_option);

        var element = $(dialogButtonTemplate);

        element.click(_option.actionFunction);
        $('.text', element).text(_option.text);


        $(dialogOptionsSelector).append(element);
    }

    /**
     * Description
     * @method addAllDialogButtons
     * @param {} _options
     * @memberOf module:DialogModal_Game_Controller
*/
    function addAllDialogButtons(_options){
        var i;

        for(i=0; i<_options.length;i++)
        {
            addDialogButton(_options[i]);
        }
    }

    /**
     * Description
     * @method removeDialogButton
     * @param {} _option
     * @memberOf module:DialogModal_Game_Controller
*/
    function removeDialogButton(_option){
        $('.'+_option.getCssClass(), element).remove();
    }

    /**
     * Description
     * @method removeAllDialogButtons
     * @memberOf module:DialogModal_Game_Controller
*/
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