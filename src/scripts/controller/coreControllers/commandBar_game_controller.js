define(['core', 'text!../html/templates/actionButtonTemplate.html'], function(core, actionButtonTemplate){

//Attributes
    var barSelector = "#commandBar";
    var actionButtonSelector = ".action_button";

//Methods
    //Init
    function init(){
        //bind event listeners to UI
    }

    function addAllActionButtons(_actions){
        L.group("Adding action Buttons", true);
        var i;

        for(i=0;i<_actions.length;i++)
        {
            L.log("Action to be added " + i +": "+ _actions[i].getName());
            var action = _actions[i];
            addActionButton(action);
        }
        L.groupEnd();
    }

    function changeToActionsButtons(_actions){
        removeAllActionButtons();
        addAllActionButtons(_actions);
    }

    //This function, if called should remove all the listeners and extra interface
    function close(){
        var action_buttons = $(actionButtonSelector);

        for(button in action_buttons)
        {
            var action_button = $(action_buttons[button]);
            action_button.removeAllListeners();
        }
    }

    //Add a button into the UI
    function addActionButton(_action){
        var element = $($(actionButtonTemplate)[0]);


        element.click(_action.getFunction());
        element.attr('title', _action.getName());
        element.addClass(_action.getCssClass());


        $(barSelector).append(element);
        if(!_action.isVisible())
            element.hide();
    }
    //Remove all buttons
    function removeAllActionButtons(){
        $(barSelector).empty();
    }
    //Remove Button
    function removeActionButton(){

    }
    //Deactivate Button
    function deactivateActionButton(){

    }
    //Activate button
    function activateActionButton(){

    }

//Getters

//Setters
    function setActionVisible(_action, _value){
        var actionClass = _action.getCssClass();

        if(_value)
            $("."+actionClass).show();
        else
            $("."+actionClass).hide();
    }

//Public Interface
    return {
        init: init,
        close: close,
        addActionButton: addActionButton,
        addAllActionButtons: addAllActionButtons,
        changeToActionsButtons: changeToActionsButtons,

        removeActionButton: removeActionButton,
        activateActionButton: activateActionButton,
        deactivateActionButton: deactivateActionButton,

        setActionVisible: setActionVisible
    }

});