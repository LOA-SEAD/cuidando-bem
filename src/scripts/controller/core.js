define(['stateMachine'], function(game)
{
	var currentLevel;

	function start(){
		console.log("Starting Game");
		
		currentLevel = game.getCurrentLevel()
		startLevel();
		
	}
	function changeLevel(){}

	function startLevel(){
		
	}

	function changeScene(_newScene){}

	function openModalScreen(){}

	function startDialog(_dialog){}
	
	function closeDialog(){}

	function getSceneActions(){}

	return {
		start: start,
	}
});