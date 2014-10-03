/*
    The stateMachine will be a module responsible to handle all the game variables and its mechanics.    
*/

define([], function()
{

//Variables
	var auxText = "Esse texto precisa ser retornado";
	var levels = [];
	var currentLevel = 0;

	function getCurrentLevel()
	{
		return levels[currentLevel];
	}
	

	function registerLevel(level)
	{
		levels.push(level);

		//Log
		;
	}

	function setCurrentLevel(level)
	{
		currentLevel = level;
	}

	return {
		getCurrentLevel: getCurrentLevel,
		registerLevel: registerLevel
	}
});
