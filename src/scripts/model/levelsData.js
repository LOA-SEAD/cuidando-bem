define([], function () {
    /**
     * @module LevelsData
     */
//Attributes
    /**
     * This object stores all Level data for the game
     * @private
     * @type {object}
     *
     * @memberOf module:LevelsData
     */
    var levels = {};
    /**
     * This var stores the current level
     * @private
     * @type {(string|int)}
     *
     * @memberOf module:LevelsData
     */
    var initialLevel = -1;
    var currentLevel = initialLevel;

//Methods
    /**
     * This function stores a level data in the levels object
     * @method registerLevel
     * @param {Level} _level
     * @param _id
     * @public
     *
     * @memberOf module:LevelsData
     */
    function registerLevel(_level, _id) {
        if(levels[_id] != null){
            console.warn("O id: " + _id + " já está em uso. O level anterior com esse mesmo id vai ser reescrito.");
        }

        levels[_id] = _level;

        //Log
        console.log('\nAdding new Level:', _level.getName());
    }

//Getters
    /**
     * @method getCurrentLevel
     * @return {Level} MemberExpression
     * @public
     *
     * @memberOf module:LevelsData
     */
    function getCurrentLevel() {
        return levels[currentLevel];
    }

//Setters	
    /**
     * @method setCurrentLevel
     * @param {(string|number)} _level
     * @public
     *
     * @memberOf module:LevelsData
     */
    function setCurrentLevel(_level) {
        currentLevel = _level;
    }

    function getInitialLevel(){
        return levels[initialLevel];
    }

//Public Interface
    return {
        registerLevel: registerLevel,

        getCurrentLevel: getCurrentLevel,
        getInitialLevel: getInitialLevel,

        setCurrentLevel: setCurrentLevel
    }
});
