define([], function(){

   return function GameState ()
   {
       var currentLevel = 0;

       function getCurrentLevel(){
           return this.currentLevel;
       }

       function setCurrentLevel(_level){
           this.currentLevel = _level;
       }

       return {
           currentLevel: currentLevel,

           setCurrentLevel: setCurrentLevel,
           getCurrentLevel: getCurrentLevel
       }
   }

});