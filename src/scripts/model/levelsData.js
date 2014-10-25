/*
    The stateMachine will be a module responsible to handle all the game variables and its mechanics.    
*/
/**
 *
 * @name Levels Data
 * @module
 */
define([], function()
{

//Attributes
	var levels = [];
	var currentLevel = 0;

//Methods
	function registerLevel(_level){
		levels.push(_level);

		//Log
		L.log(['\nAdding new Level:', _level.getName()]);
	}

//Getters
	function getCurrentLevel(){
		return levels[currentLevel];
	}

//Setters	
	function setCurrentLevel(_level){
		currentLevel = _level;
	}
	
//Public Interface
	return {
        registerLevel: registerLevel,

        getCurrentLevel: getCurrentLevel,

        setCurrentLevel: setCurrentLevel
	}
});
