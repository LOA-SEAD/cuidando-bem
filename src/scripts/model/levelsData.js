define([], function()
{
    /**
     * @module LevelsData
*/
//Attributes
	var levels = [];
	var currentLevel = 0;

//Methods
	/**
	 * Description     
	 * @method registerLevel
	 * @param {} _level
	 * @memberOf module:LevelsData
*/
	function registerLevel(_level){
		levels.push(_level);

		//Log
		L.log(['\nAdding new Level:', _level.getName()]);
	}

//Getters
	/**
	 * Description
	 * @method getCurrentLevel
	 * @return MemberExpression
	 * @memberOf module:LevelsData
*/
	function getCurrentLevel(){
		return levels[currentLevel];
	}

//Setters	
	/**
	 * Description
	 * @method setCurrentLevel
	 * @param {} _level
	 * @memberOf module:LevelsData
*/
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
