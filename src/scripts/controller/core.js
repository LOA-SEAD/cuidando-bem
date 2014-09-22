define(['stateMachine'], function(game)
{
	function start(){
		console.log("Starting Game");
		game.startCurrentLevel();
	}
	function changeLevel(){}
	function startLevel(){}

	function changeScene(){}

	function openModalScreen(){}

	function startDialog(){}
	function closeDialog(){}

	function getSceneActions(){}

	return {
		start: start,
	}
});