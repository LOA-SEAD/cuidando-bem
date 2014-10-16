define(['stateMachine', 'commandBar', 'dialogModal', 'interactiveObjects', 'modalScene'], function(game, CommandBar, Dialog, InteractiveObject, ModalScene)
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
	}

    //Scene
	function changeScene(_newSceneId){
        Level.setCurrentSceneById(_newSceneId);
        cur_scene = _newSceneId;

        var newScene = Level.getCurrentScene();

        console.log("New scene: "+ newScene.getCssClass());

            $('#backgroundScene').attr('class', newScene.getCssClass());

        CommandBar.changeToActionsButtons(Actions[cur_scene]);
        InteractiveObject.changeToInteractiveObjects(InteractiveObjects[cur_scene]);
    }

    //ModalScene
	function openModalScene(_modalSceneId){

    }

    function closeModalScene(){

    }

    //Dialog
	function openDialog(_dialog){
        Dialog.show(_dialog);
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