define(['stateMachine'], function(game)
{
	var currentLevel;

	function start(){
		console.log("Starting Game");
		
		currentLevel = game.getCurrentLevel();
		startLevel();
		
	}
	function changeLevel(){}

	function startLevel(){
        changeScene(currentLevel.getCurrentScene());
	}

	function changeScene(_newScene){
        console.log(_newScene.getCssClass());
        $('#backgroundScene').attr('class', _newScene.getCssClass());
    }

	function openModalScreen(){}

	function startDialog(_dialog){}
	
	function closeDialog(){}

	function getSceneActions(){}

	return {
		start: start,
	}
});