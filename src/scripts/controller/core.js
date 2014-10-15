define(['stateMachine', 'commandBar', 'dialogModal', 'interactiveObjects'], function(game, CommandBar, Dialog, InteractiveObject)
{

//Attributes

	var Level;
    var Actions;
    var InteractiveObjects;
    var Flags;
    var cur_scene;

//Methods
	function start(){
		console.log("Starting Game");

        changeLevel(game.getCurrentLevel());
        startLevel();
	}

    //Level
    function getCurrentLevel(){
        return Level;
    }

    function changeLevel (_newLevel){
        Level = $.extend(true, {}, _newLevel);
        Actions = Level.getActions();
        InteractiveObjects = Level.getInteractiveObjects();
        Flags = Level.getFlags();
        cur_scene = Level.getCurrentSceneId();
    }

	function startLevel(){
        changeScene(Level.getCurrentSceneId());
        console.log(Level.getCurrentSceneId());
        CommandBar.addAllActionButton(Actions[cur_scene]);
        InteractiveObject.addAllInteractiveObjects(InteractiveObjects[cur_scene])
	}

    //Scene
	function changeScene(_newSceneId){
        Level.setCurrentSceneById(_newSceneId);

        var newScene = Level.getCurrentScene();

        console.log("New scene: "+ newScene.getCssClass());

            $('#backgroundScene').attr('class', newScene.getCssClass());

        var actions = Level.getActions();
        var sceneActions = actions[Level.getCurrentSceneId()];
        CommandBar.changeToActionsButtons(sceneActions);
    }

    //ModalScene
	function openModalScene(_modalSceneId){

    }

    function closeModalScene(){

    }

    //Dialog
	function openDialog(_dialog){
        Dialog.openDialog(_dialog);
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

    function getFlag(_sceneId, _actionId){
        return Flags[_sceneId][_actionId];
    }

//Setters

    function setFlag(_sceneId, _actionId, _value){
        Flags[_sceneId][_actionId] = _value;
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

        setFlag: setFlag
	}
});