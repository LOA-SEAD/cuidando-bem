define([], function (){
	return function Level(_name, _isEndOfLevelFunction, _nextLevelFunciton)
	{
		//Attributes

		var name = _name;
		var actions = [];
		var interactiveObjects = [];
		var scenes = [];
		var currentScene = 0;
		var initialScene = 0;
		var isEndOfLevelFunction = _isEndOfLevelFunction;
		var nextLevelFunction = _nextLevelFunciton;
		var flags = [];
		var dialogs = [];
		//Methods

		//Getters

		function getName(){
			return name;
		}

		function getActions(){
			return actions;
		}

		function getFlags(){
			return flags;
		}

		function getDialogs(){
			return dialogs;
		}

		function getInteractiveObjects(){
			return interactiveObjects;
		}

		function getInitialScene(){
			return scenes[initialScene];
		}

        function getCurrentScene(){
            return scenes[currentScene];
        }

        function getCurrentSceneId(){
            return currentScene;
        }

		function isEndOfLevel(){
			return isEndOfLevelFunction();
		}

		function getNextLevel(){
			return nextLevelFunciton();
		}	

		//Setters

		function setInitialScene(_initialScene){
			initialScene = _initialScene;
			currentScene = _initialScene;
		}

        function setCurrentSceneById(_newScene){
            currentScene = _newScene;
        }

		function registerScene(_scene){
			scenes.push(_scene);
			L.log("registering scene: ", _scene);

			dialogs.push([]);
			actions.push([]);
			flags.push([]);
			interactiveObjects.push([]);
		}

		function registerAction(_action, _scene){
			actions[_scene].push(_action);
			L.log(actions);
		}

		function registerDialog(_dialog, _scene){
			dialogs[_scene].push(_dialog);
			L.log(dialogs);
		}

		function registerFlag(_flag, _scene){
			flags[_scene].push(_flag);
			L.log(flags);
		}

		function registerInteractiveObject(_interactiveObject, _scene){
			interactiveObjects[_scene].push(_interactiveObject);
			L.log(interactiveObjects);
		}		


		//Public interface
		return {
			getName: getName,
			getActions: getActions,
			getFlags: getFlags,
			getInteractiveObjects: getInteractiveObjects,
			getDialogs: getDialogs,

            getInitialScene: getInitialScene,

            getCurrentScene: getCurrentScene,
            getCurrentSceneId: getCurrentSceneId,
			isEndOfLevel: isEndOfLevel,
			getNextLevel: getNextLevel,

			setInitialScene: setInitialScene,
            setCurrentSceneById: setCurrentSceneById,


			registerScene: registerScene,
			registerAction: registerAction,
			registerDialog: registerDialog,
			registerFlag: registerFlag,
			registerInteractiveObject: registerInteractiveObject
		}
	}
});