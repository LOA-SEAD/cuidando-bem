define(['stateMachine', 'commandBar', 'dialogModal'], function(game, commandBar, dialogModal)
{

//Attributes


	var Level;

//Methods
	function start(){
		console.log("Starting Game");
        Level = game.getCurrentLevel();
		startLevel();
	}

    function getCurrentLevel()
    {
        return Level;
    }

	function changeLevel(){}

	function startLevel(){
        changeScene(Level.getCurrentSceneId());
        var actions = Level.getActions();

        console.log(Level.getCurrentSceneId());

        commandBar.addAllActionButton(actions[Level.getCurrentSceneId()]);
	}

	function changeScene(_newSceneId)
    {
        Level.setCurrentSceneById(_newSceneId);

        var newScene = Level.getCurrentScene();

        console.log("New scnee: "+ newScene.getCssClass());

        $('#backgroundScene').attr('class', newScene.getCssClass());

        var actions = Level.getActions();
        var sceneActions = actions[Level.getCurrentSceneId()];
        commandBar.changeToActionsButtons(sceneActions);
    }

	function openModalScreen(){}

	function startDialog(_dialog){}
	
	function closeDialog(){}

//Getters
	function getSceneActions(){}

//Setters
//Public Interface

	return {
		start : start,
        getCurrentLevel : getCurrentLevel,

        changeScene: changeScene
	}
});