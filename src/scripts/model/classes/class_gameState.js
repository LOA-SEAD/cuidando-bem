define([], function(){

    /**
     * @class
     * @name GameState
     * @return ObjectExpression
*/
    function GameState (){
        var currentLevel = 0;

        /**
         * Description
         * @method getCurrentLevel
         * @return MemberExpression
         * @memberOf GameState
*/
        function getCurrentLevel(){
            return this.currentLevel;
        }

        /**
         * Description
         * @method setCurrentLevel
         * @param {} _level
         * @memberOf GameState
*/
        function setCurrentLevel(_level){
            this.currentLevel = _level;
        }

        return {
            currentLevel: currentLevel,

            setCurrentLevel: setCurrentLevel,
            getCurrentLevel: getCurrentLevel
        }
    }

   return GameState;

});