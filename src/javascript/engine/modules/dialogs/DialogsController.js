/**
 *
 * @name DialogModal_Game_Controller
 * @module
 */
define(['text!../assets/html/templates/dialogButtonTemplate.html'], function (dialogButtonTemplate) {

//Attributes
    var dialogModalSelector = "#dialogBar";

    var dialogCharNameSelector = ".dialog_charName";
    var dialogTextSelector = ".dialog_mainText";
    var dialogOptionsSelector = ".dialog_options";

    var isDialogOpen = false;
//Methods
    //Init
    /**
     * Description
     * @method init
     * @memberOf module:DialogModal_Game_Controller
     */
    function init() {
        //bind event listeners to UI
    }

    /**
     * Description
     * @method show
     * @param {} _dialog
     * @memberOf module:DialogModal_Game_Controller
     */
    function show(_dialog) {
        if (!isDialogOpen) {
            openDialog(_dialog);
        } else {
            changeDialogTo(_dialog);
        }
    }

    /**
     * Description
     * @method openDialog
     * @param {} _dialog
     * @memberOf module:DialogModal_Game_Controller
     */
    function openDialog(_dialog) {
        dialog = _dialog;

        //$(dialogModalSelector).css("display", "table");
        //$(dialogModalSelector).hide()
        $(dialogModalSelector).show("fade",{
            duration: 200,
            complete: function() {
                changeDialogTo(_dialog);
            }
        });

        isDialogOpen = true;
    }

    /**
     * Description
     * @method changeDialogTo
     * @param {} _dialog
     * @memberOf module:DialogModal_Game_Controller
     */
    function changeDialogTo(_dialog) {

        // type of animation to be executed
        var charNameAnimation = "blind";
        var textAnimation = "clip";
        var duration = 250;

        // if first time hide everything to animate later
        if( isDialogOpen == false){
            $(dialogModalSelector + " div").hide();
            animation();
        }
        // if already opened, keep the charName and animate the rest
        else {
            $(dialogTextSelector).hide();
            $(dialogOptionsSelector).hide();
            animation();
        }

        // set the text for charName, dialog text and answer options
        $(dialogCharNameSelector).text(_dialog.getSpeakerName());
        $(dialogTextSelector).text(_dialog.getText());
        changeDialogOptionsTo(_dialog.getOptions());

        // animation for dialog
        function animation(){
            $(dialogCharNameSelector).first().show(charNameAnimation, {
                duration: duration,
                complete: function() {
                    $(dialogTextSelector).show(textAnimation, {
                        duration: duration,
                        complete: function() {
                            $(dialogOptionsSelector).show(textAnimation)
                        }
                    })
                }
            });
        }
        //$(dialogCharNameSelector).attr('class', dialogCharNameSelector.substr(1) + ' ' + _dialog.getSpeakerCssClass());
    }

    /**
     * Description
     * @method changeDialogOptionsTo
     * @param {} _options
     * @memberOf module:DialogModal_Game_Controller
     */
    function changeDialogOptionsTo(_options) {
        removeAllDialogButtons();
        addAllDialogButtons(_options);
    }

    /**
     * Description
     * @method close
     * @memberOf module:DialogModal_Game_Controller
     */
    function close() {

        $(dialogModalSelector).hide("fade", 200);

        isDialogOpen = false;
    }

    /**
     * Description
     * @method hide
     * @memberOf module:DialogModal_Game_Controller
     */
    function hide() {

    }

    /**
     * Description
     * @method printText
     * @memberOf module:DialogModal_Game_Controller
     */
    function printText() {

    }

    /**
     * Description
     * @method addDialogButton
     * @param {} _option
     * @memberOf module:DialogModal_Game_Controller
     */
    function addDialogButton(_option) {
        console.log(_option);

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
    function addAllDialogButtons(_options) {
        var i;

        for (i = 0; i < _options.length; i++) {
            addDialogButton(_options[i]);
        }
    }

    /**
     * Description
     * @method removeDialogButton
     * @param {} _option
     * @memberOf module:DialogModal_Game_Controller
     */
    function removeDialogButton(_option) {
        $('.' + _option.getCssClass(), element).remove();
    }

    /**
     * Description
     * @method removeAllDialogButtons
     * @memberOf module:DialogModal_Game_Controller
     */
    function removeAllDialogButtons() {
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