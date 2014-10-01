/*
    The stateMachine will be a module responsible to handle all the game variables and its mechanics.    
*/

define([], function()
{

//Variables
	var auxText = "Esse texto precisa ser retornado";
	var levels = [];
	var currentLevel = 0;

//functions
//Scene
	

	function getCurrentLevel()
	{
		return currentScene;
	}

	

//modalScene
//interactiveObjects
//levels
	function addLevel(level)
	{
		levels.push(level);

		//Log
		console.log('\tAdding new Level:', level.name);
	}

	function setCurrentLevel(level)
	{
		currentLevel = levels[level];
	}

//This should be a core funciton
	// function startCurrentLevel()
	// {
	// 	console.log("Starting Level: " + levels[currentLevel].getName());
		
	// 	console.log(levels[currentLevel].getActions());
	// 	console.log(levels[currentLevel].getActions()[6][0]);
	// 	levels[currentLevel].getActions()[6][0].doAction();
	// }

	return {

		addScene: addScene,
		getScenes: function (){return scenes},
		getScene: getScene,
		setCurrentScene: setCurrentScene,
		setNumberOfScenes: setNumberOfScenes,

		addLevel: addLevel,
		setCurrentLevel: setCurrentLevel,
		startCurrentLevel: startCurrentLevel,
		nextLevel: nextLevel,

		getText: function (){return auxText},
	}
});
