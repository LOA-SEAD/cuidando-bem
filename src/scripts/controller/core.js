define(['levelsData', 'commandBar', 'dialogModal', 'interactiveObjects', 'modalScene', 'scene'], function(game, CommandBar, Dialog, InteractiveObject, ModalScene, Scene)
{

//Attributes

	var Level;
    var Actions;
    var InteractiveObjects;
    var Dialogs;
    var Flags;
    var cur_scene;

//Methods
	function start(){
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
        var newScene = Level.getCurrentScene();

        Actions = Level.getActions(cur_scene);
        Dialogs = Level.getDialogs(cur_scene);
        InteractiveObjects = Level.getInteractiveObjects(cur_scene);

        Flags = Level.getFlags();

        Scene.setScene(newScene);
        CommandBar.changeToActionsButtons(Actions);
        InteractiveObject.changeToInteractiveObjects(InteractiveObjects);

        newScene.load();
        L.groupEnd();
	}

    //Scene
	function changeScene(_newSceneId){
        L.group("Change Scene to: "+ Level.getCurrentScene().getName(), true);

        var oldScene = Level.getCurrentScene();
        Level.setCurrentSceneById(_newSceneId);
        var newScene = Level.getCurrentScene();

        cur_scene = _newSceneId;
        Actions = Level.getActions(cur_scene);
        Dialogs = Level.getDialogs(cur_scene);
        InteractiveObjects = Level.getInteractiveObjects(cur_scene);

        Flags = Level.getFlags();

        Scene.changeScene(oldScene, newScene);
        CommandBar.changeToActionsButtons(Actions);
        InteractiveObject.changeToInteractiveObjects(InteractiveObjects);

        L.groupEnd();
    }

    //ModalScene
	function openModalScene(_modalSceneId){

    }

    function closeModalScene(){

    }

    //Dialog
	function openDialog(_dialogId){
        var dialog = Dialogs[_dialogId];
        Dialog.show(dialog);
    }
	
	function closeDialog(){
        Dialog.close();
    }

    //End Level
    function openEndLevel(){

    }

    function closeEndLevel(){

    }

//Getters

    function getFlag(_flagId){
        return Level.getFlag(_flagId);
    }



//Setters

    function setFlag(_flagId, _value){
        Level.setFlag(_flagId, _value)
    }

    function setActionVisible(_actionId, _value){
        var action = Level.getAction(_actionId);
        action.setVisible(_value);
        CommandBar.setActionVisible(action, _value);
    }

    function toggleActionVisible(_actionId){
        var action = Level.getAction(_actionId);
        if(action.isVisible())
            action.setVisible(false);
        else
            action.setVisible(true);

        CommandBar.setActionVisible(action, action.isVisible());
    }

    function setInteractiveObjectVisible(_interactiveObjectId, _value){
        var interactiveObject = Level.getAction(_interactiveObjectId);
        interactiveObject.setVisible(_value);
        InteractiveObject.setInteractiveObjectVisible(interactiveObject, _value);
    }

    function toggleInteractiveObjectVisible(_interactiveObjectId){
        var interactiveObject = Level.getAction(_interactiveObjectId);
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

        getCurrentLevel : getCurrentLevel,
        getFlag: getFlag,

        setFlag: setFlag,

        setActionVisible: setActionVisible,
        toggleActionVisible: toggleActionVisible,
        setInteractiveObjectVisible: setInteractiveObjectVisible,
        toggleInteractiveObjectVisible: toggleInteractiveObjectVisible
	}
});