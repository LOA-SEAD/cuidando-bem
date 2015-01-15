/**
 *
 * @name CommandBar_Game_Controller
 * @module
 */
define(['core', 'text!../html/templates/actionButtonTemplate.html'], function (core, actionButtonTemplate) {

//Attributes
    var barSelector = "#commandBar";
    var actionButtonSelector = ".action_button";

//Methods
    //Init
    /**
     * Description
     * @method init
     * @memberOf module:CommandBar_Game_Controller
     */
    function init() {
        //bind event listeners to UI
    }

    /**
     * Description
     * @method addAllActionButtons
     * @param {} _actions
     * @memberOf module:CommandBar_Game_Controller
     */
    function addAllActionButtons(_actions) {
        console.group("Adding action Buttons", true);
        var i;

        for (i = 0; i < _actions.length; i++) {
            console.log("Action to be added " + i + ": " + _actions[i].getName());
            var action = _actions[i];
            addActionButton(action);
        }
        console.groupEnd();
    }

    /**
     * Description
     * @method changeToActionsButtons
     * @param {} _actions
     * @memberOf module:CommandBar_Game_Controller
     */
    function changeToActionsButtons(_actions) {
        removeAllActionButtons();
        addAllActionButtons(_actions);
    }

    //This function, if called should remove all the listeners and extra interface
    /**
     * Description
     * @method close
     * @memberOf module:CommandBar_Game_Controller
     */
    function close() {
        var action_buttons = $(actionButtonSelector);

        for (button in action_buttons) {
            var action_button = $(action_buttons[button]);
            action_button.removeAllListeners();
        }
    }

    function hide(){
        $(barSelector).hide();
    }

    function show(){
        $(barSelector).show();
    }

    //Add a button into the UI
    /**
     * Description
     * @method addActionButton
     * @param {} _action
     * @memberOf module:CommandBar_Game_Controller
     */
    function addActionButton(_action) {
        var element = $($(actionButtonTemplate)[0]);

        element.click(_action.getFunction());
        element.attr('title', _action.getName());
        element.attr('id', _action.getId());
        element.addClass(_action.getCssClass());
        if (_action.isEnabled())
            element.addClass("enabled");
        else
            element.addClass("disabled");


        $(barSelector).append(element);
        if (!_action.isVisible())
            element.hide();
    }

    //Remove all buttons
    /**
     * Description
     * @method removeAllActionButtons
     * @memberOf module:CommandBar_Game_Controller
     */
    function removeAllActionButtons() {
        $(barSelector).empty();
    }

    //Remove Button
    /**
     * Description
     * @method removeActionButton
     * @memberOf module:CommandBar_Game_Controller
     * @todo function to remove only one action button based on ID
     */
    function removeActionButton() {

    }

    //Activate button
    /**
     * Description
     * @method activateActionButton
     * @param {} _action
     * @memberOf module:CommandBar_Game_Controller
     */
    function enableActionButton(_action) {
        var selector = '#' + _action.getId();
        var element = $(selector);
        element.removeClass("disabled");
        element.addClass("enabled");
        element.click(_action.getFunction());
    }

    //Deactivate Button
    /**
     * Description
     * @method deactivateActionButton
     * @param {} _action
     * @memberOf module:CommandBar_Game_Controller
     */
    function disableActionButton(_action) {
        var selector = '#' + _action.getId();
        var element = $(selector);
        element.removeClass("enabled");
        element.addClass("disabled");
        element.unbind("click");
    }

    /**
     * Description
     * @method activeAllActionButtons
     * @param {} _actions
     * @memberOf module:CommandBar_Game_Controller
     */
    function enableAllActionButtons(_actions) {
        console.group("Enabling action Buttons", true);
        var i;

        for (i = 0; i < _actions.length; i++) {
            console.log("Action to be enabled " + i + ": " + _actions[i].getName());
            var action = _actions[i];
            enableActionButton(action);
        }
        console.groupEnd();
    }

    /**
     * Description
     * @method deactivateAllActionButtons
     * @param {} _actions
     * @memberOf module:CommandBar_Game_Controller
     */
    function disableAllActionButtons(_actions) {
        console.group("Disabling action Buttons", true);
        var i;

        for (i = 0; i < _actions.length; i++) {
            console.log("Action to be disabled " + i + ": " + _actions[i].getName());
            var action = _actions[i];
            disableActionButton(action);
        }
        console.groupEnd();
    }

    /**
     * Description
     * @method updateAllActionButtons
     * @param {} _actions
     * @memberOf module:CommandBar_Game_Controller
     */
    function updateAllActionButtons(_actions) {
        console.group("Updating action Buttons", true);
        var i;

        for (i = 0; i < _actions.length; i++) {
            console.log("Action to be updated " + i + ": " + _actions[i].getName());
            var action = _actions[i];
            if (action.isEnabled())
                enableActionButton(action);
            else
                disableActionButton(action);
        }
        console.groupEnd();
    }

//Getters

//Setters
    /**
     * Description
     * @method setActionVisible
     * @param {} _action
     * @param {} _value
     * @memberOf module:CommandBar_Game_Controller
     */
    function setActionVisible(_action, _value) {
        var selector = '#' + _action.getId();

        if (_value)
            $(selector).show();
        else
            $(selector).hide();
    }

//Public Interface
    return {
        init: init,
        close: close,

        hide: hide,
        show: show,

        addActionButton: addActionButton,
        addAllActionButtons: addAllActionButtons,
        changeToActionsButtons: changeToActionsButtons,

        removeActionButton: removeActionButton,
        enableActionButton: enableActionButton,
        disableActionButton: disableActionButton,

        enableAllActionButtons: enableAllActionButtons,
        disableAllActionButtons: disableAllActionButtons,

        updateAllActionButtons: updateAllActionButtons,

        setActionVisible: setActionVisible
    }

});