/**
 *
 * @name core
 * @module
 */
define(['levelsData', 'commandBar', 'dialogModal', 'interactiveObjects', 'modalScene', 'scene'], function(game, CommandBar, Dialog, InteractiveObject, ModalScene, Scene_con)
{

//Attributes

	var Level;
    var Scene;
    var Actions;
    var InteractiveObjects;
    var Dialogs;
    var Flags;
    var cur_scene;

//Methods
	function start(_gameState){
		L.group("Game Running:");

        changeLevel(game.getCurrentLevel());
        startLevel();
	}

    //Level
    function getCurrentLevel(){
        return Level;
    }

    function changeLevel (_newLevel){
        Level = $.extend(true, {}, _newLevel);

        cur_scene = Level.getCurrentSceneId();
    }

	function startLevel(){
        L.group('Starting level:' + Level.getName(), true);

        Level.setCurrentSceneById(cur_scene);
        Scene = Level.getCurrentScene();

        Actions = Level.getActions(cur_scene);
        Dialogs = Level.getDialogs(cur_scene);
        InteractiveObjects = Level.getInteractiveObjects(cur_scene);

        Flags = Level.getFlags();

        Scene_con.setScene(Scene);
        CommandBar.changeToActionsButtons(Actions);
        InteractiveObject.changeToInteractiveObjects(InteractiveObjects);

        Scene.load();
        L.groupEnd();
	}

    //Scene
	function changeScene(_newSceneId){


        var oldScene = Scene;
        Level.setCurrentSceneById(_newSceneId);
        Scene = Level.getCurrentScene();

        L.group("Change Scene to: "+ Scene.getName(), true);

        cur_scene = _newSceneId;
        Actions = Level.getActions(cur_scene);
        Dialogs = Level.getDialogs(cur_scene);
        InteractiveObjects = Level.getInteractiveObjects(cur_scene);

        Flags = Level.getFlags();

        oldScene.unload();
        Scene_con.changeScene(Scene);
        Scene.load();

        CommandBar.changeToActionsButtons(Actions);
        InteractiveObject.changeToInteractiveObjects(InteractiveObjects);

        L.groupEnd();
    }

    //ModalScene
	function openModalScene(_modalSceneId){
        var modalScene = Level.getModalScene(_modalSceneId);
        Scene = modalScene;

        ModalScene.open(modalScene);
        CommandBar.changeToActionsButtons(modalScene.getActions());
        InteractiveObject.changeToInteractiveObjects(modalScene.getInteractiveObjects());
    }

    function closeModalScene(){
        ModalScene.close();

        CommandBar.changeToActionsButtons(Actions);
        InteractiveObject.changeToInteractiveObjects(InteractiveObjects);
        Scene =  Level.getCurrentScene();
    }

    //Dialog
	function openDialog(_dialogId){
        var dialog = Dialogs[_dialogId];
        Dialog.show(dialog);

        deactivateAllActionButtons(Actions);
    }
	
	function closeDialog(){
        Dialog.close();

        updateAllActionButtons();
    }

    //End Level
    function openEndLevel(){

    }

    function closeEndLevel(){

    }

    function deactivateAllActionButtons(){
        CommandBar.deactivateAllActionButtons(Actions);
    }

    function updateAllActionButtons(){
        CommandBar.updateAllActionButtons(Actions);
    }

    function disableActionButton(_actionId){
        var action = Scene.getAction(_actionId);
        action.setEnable(false);
        CommandBar.deactivateActionButton(action, _value);
    }

    function enableActionButton(_actionId){
        var action = Scene.getAction(_actionId);
        action.setEnable(true);
        CommandBar.activateActionButton(action);
    }

//Getters

    function getFlag(_flagId){
        return Level.getFlag(_flagId);
    }

//Setters

    function setFlag(_flagId, _value){
        Level.setFlag(_flagId, _value)
    }

    function setActionEnable(_actionId, _value){
        var action = Scene.getAction(_actionId);
        if(_value)
            enableActionButton(action);
        else
            disableActionButton(action);
    }

    function setActionVisible(_actionId, _value){
        var action = Scene.getAction(_actionId);
        action.setVisible(_value);
        CommandBar.setActionVisible(action, _value);
    }

    function toggleActionVisible(_actionId){
        var action = Scene.getAction(_actionId);
        if(action.isVisible())
            action.setVisible(false);
        else
            action.setVisible(true);

        CommandBar.setActionVisible(action, action.isVisible());
    }

    function setInteractiveObjectVisible(_interactiveObjectId, _value){
        var interactiveObject = Scene.getInteractiveObject(_interactiveObjectId);
        interactiveObject.setVisible(_value);
        InteractiveObject.setInteractiveObjectVisible(interactiveObject, _value);
    }

    function toggleInteractiveObjectVisible(_interactiveObjectId){
        var interactiveObject = Scene.getInteractiveObject(_interactiveObjectId);
        if(interactiveObject.isVisible())
            interactiveObject.setVisible(false);
        else
            interactiveObject.setVisible(true);

        InteractiveObject.setInteractiveObjectVisible(interactiveObject, interactiveObject.isVisible());
    }



//Public Interface
	return {
		start : start,
        changeScene: changeScene,
        openDialog: openDialog,
        closeDialog: closeDialog,
        openModalScene: openModalScene,
        closeModalScene: closeModalScene,
        openEndLevel: openEndLevel,
        closeEndLevel: closeEndLevel,

        enableActionButton: enableActionButton,
        disableActionButton: disableActionButton,

        setActionEnable: setActionEnable,

        getCurrentLevel : getCurrentLevel,
        getFlag: getFlag,

        setFlag: setFlag,

        setActionVisible: setActionVisible,
        toggleActionVisible: toggleActionVisible,
        setInteractiveObjectVisible: setInteractiveObjectVisible,
        toggleInteractiveObjectVisible: toggleInteractiveObjectVisible,

        deactivateAllActionButtons: deactivateAllActionButtons,
        updateAllActionButtons: updateAllActionButtons
	}
});