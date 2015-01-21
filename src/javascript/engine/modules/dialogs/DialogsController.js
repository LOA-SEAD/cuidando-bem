/**
 *
 * @name DialogModal_Game_Controller
 * @module
 */
define(['text!../assets/html/templates/dialogButtonTemplate.html'], function (dialogButtonTemplate) {

//Attributes
    var dialogModalSelector = "#dialogBar";

    var dialogCharNameSelector = ".dialog_charName";
    var dialogCharImg = "#dialog_charImg";
    var dialogTextSelector = ".dialog_mainText";
    var dialogOptionsSelector = ".dialog_options";
    var dialogButtonSelector = ".dialog_right";

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

        $("#dialogBar-mask").show();
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

        // set the text for charName, dialog text and answer options
        $(dialogCharNameSelector).text(_dialog.getSpeakerName());
        $(dialogCharImg).addClass(_dialog.getSpeakerCssClass());
        $(dialogTextSelector).text(_dialog.getText());
        changeDialogOptionsTo(_dialog.getOptions(), _dialog.getRandomize());

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

        // animation for dialog
        function animation(){
            $(dialogCharNameSelector).first().show(charNameAnimation, {
                duration: duration,
                progress: function() {$(dialogCharImg.show(charNameAnimation))},
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
    function changeDialogOptionsTo(_options, randomize) {

        // remove all dialog buttons (answer options)
        removeAllDialogButtons();

        // if only one option and there's no text on it
        // the 'next' arrow will show up on the dialog
        if(_options.length == 1 && _options[0].text == '')
        {
            console.log("Show `next arrow` on dialog");
            var element = $(dialogButtonSelector);
            element.click(_options[0].actionFunction);
            element.on();
            $(dialogButtonSelector).removeClass("off");
            $(dialogButtonSelector).addClass("on");
            $(dialogButtonSelector).append(element);
        }
        // if there's dialog options to be shown (answers)
        else
        {
            console.log("Show 'options' on dialog");
            addAllDialogButtons(_options, randomize);
        }
    }

    /**
     * Description
     * @method close
     * @memberOf module:DialogModal_Game_Controller
     */
    function close() {

        $("#dialogBar-mask").hide();
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

    //Fisher–Yates Shuffle
    function shuffle(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    /**
     * Description
     * @method addAllDialogButtons
     * @param {} _options
     * @memberOf module:DialogModal_Game_Controller
     */
    function addAllDialogButtons(_options, randomize) {
        var i;

        if(randomize)
            _options = shuffle(_options);

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
        $(dialogButtonSelector).empty();
        $(dialogButtonSelector).off();
        $(dialogButtonSelector).removeClass("on");
        $(dialogButtonSelector).addClass("off");
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