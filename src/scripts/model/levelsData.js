/*
    The stateMachine will be a module responsible to handle all the game variables and its mechanics.    
*/

define([], function()
{

//Attributes
	var auxText = "Esse texto precisa ser retornado";
	var levels = [];
	var currentLevel = 0;

//Methods
	function registerLevel(level)
	{
		levels.push(level);

		//Log
		L.log(['\nAdding new Level:', level.getName()]);
	}

//Getters
	function getCurrentLevel()
	{
		return levels[currentLevel];
	}

//Setters	
	function setCurrentLevel(level)
	{
		currentLevel = level;
	}
	
//Public Interface
	return {
		getCurrentLevel: getCurrentLevel,
		registerLevel: registerLevel
	}
});
