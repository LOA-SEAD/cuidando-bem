define([], function () {
    /**
     * @module LevelsData
     */
//Attributes
    /**
     * @private
     * @type {object}
     *
     * @memberOf module:LevelsData
     */
    var levels = {};
    /**
     * @private
     * @type {object}
     *
     * @memberOf module:LevelsData
     */
    var currentLevel = 0;

//Methods
    /**
     * Description
     * @method registerLevel
     * @param {Level} _level
     * @param _id
     * @public
     *
     * @memberOf module:LevelsData
     */
    function registerLevel(_level, _id) {
        if(levels[_id] != null){
            L.warn("O id: " + _id + " já está em uso. O level anterior com esse mesmo id vai ser reescrito.")
        }

        levels[_id] = _level;

        //Log
        L.log(['\nAdding new Level:', _level.getName()]);
    }

//Getters
    /**
     * Description
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
     * Description
     * @method setCurrentLevel
     * @param {(string|number)} _level
     * @public
     *
     * @memberOf module:LevelsData
     */
    function setCurrentLevel(_level) {
        currentLevel = _level;
    }

//Public Interface
    return {
        registerLevel: registerLevel,

        getCurrentLevel: getCurrentLevel,

        setCurrentLevel: setCurrentLevel
    }
});
