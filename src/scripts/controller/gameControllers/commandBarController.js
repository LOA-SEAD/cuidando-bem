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
        console.log(_actions);
        for(i=0;i<_actions.length;i++)
        {
            console.log("Action to be added " + i +": "+ _actions[i].getName());
            action = _actions[i];
            addActionButton(action);
        }
    }

    function changeToActionsButtons(_actions)
    {
        removeAllActionButtons();
        addAllActionButtons(_actions);
    }

    //This function if called should remove all the listeners and extra interface
    function close(){}

    //Add a button into the UI
    function addActionButton(_action)
    {
        $(barSelector).append(actionButtonTemplate);
        var action_buttons = $(actionButtonSelector);

        var action_button = $(action_buttons[action_buttons.length-1])
        action_button.click(_action.getFunction());
        action_button.attr('title', _action.getName());
    }
    //Remove all buttons
    function removeAllActionButtons()
    {
        $(barSelector).empty();
    }
    //Remove Button
    function removeActionButton(){}
    //Deactivate Button
    function deactivateActionButton(){}
    //Activate button
    function activateActionButton(){}

    //Roll bar to the left
    function rollLeft(){}
    //Roll bar to the
    function rollRight(){}
//Getters

//Setters





//Public Interface
    return {
        init: init,
        addActionButton: addActionButton,
        addAllActionButton: addAllActionButtons,
        changeToActionsButtons: changeToActionsButtons,

        removeActionButton: removeActionButton,
        activateActionButton: activateActionButton,
        deactivateActionButton: deactivateActionButton
    }

});