define(['stateMachine', 'commandBar', 'dialogModal'], function(game, CommandBar, Dialog)
{

//Attributes

	var Level;
    var Actions;
    var InteractiveObjects;
    var Flags;

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
    }

	function startLevel(){
        changeScene(Level.getCurrentSceneId());
        console.log(Level.getCurrentSceneId());
        CommandBar.addAllActionButton(Actions[Level.getCurrentSceneId()]);
	}

    //Scene
	function changeScene(_newSceneId){
        Level.setCurrentSceneById(_newSceneId);

        var newScene = Level.getCurrentScene();

        console.log("New scnee: "+ newScene.getCssClass());

        $('#backgroundScene').attr('class', newScene.getCssClass());

        var actions = Level.getActions();
        var sceneActions = actions[Level.getCurrentSceneId()];
        CommandBar.changeToActionsButtons(sceneActions);
    }

    //ModalScene
	function openModalScene(){

    }

    //Dialog
	function startDialog(_dialog){

    }
	
	function closeDialog(){

    }

//Getters
	function getSceneActions(){

    }

//Setters

//Public Interface
	return {
		start : start,
        getCurrentLevel : getCurrentLevel,

        changeScene: changeScene
	}
});