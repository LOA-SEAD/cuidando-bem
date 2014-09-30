define([], function ()
{
	return function Level(_name, _startingScene, _numberOfScenes, _isEndOfLevelFunction, _nextLevelFunciton, _flags)
	{
		//Attributes

		var name = _name;
		var actions = [];
		var interactiveObjects = [];
		var isEndOfLevelFunction = _isEndOfLevelFunction;
		var nextLevelFunciton = _nextLevelFunciton;
		var flags = _flags;

		var initialScene;

		for(i=0;i<_numberOfScenes;i++)
		{
			actions.push([]);
			objects.push([]);
		}
	
		//Methods

		//Getters

		function getName()
		{
			return name;
		}

		function getActions()
		{
			return actions;
		}

		function getFlags()
		{
			return flags;
		}

		function getInteractiveObjects()
		{
			return interactiveObjects;
		}

		function getInitialScene()
		{
			return initialScene;
		}

		function isEndOfLevel()
		{
			return isEndOfLevelFunction();
		}

		function getNextLevel()
		{
			return nextLevelFunciton();
		}	

		//Setters

		function setInitialScene(_initialScene)
		{
			initialScene = _initialScene;
		}

		function registerAction(_action, _scene)
		{
			actions[_scene].push(_action);
			console.log(actions);
		}

		function registerInteractiveObject(_interactiveObject, _scene)
		{
			interactiveObjects[_scene].push(_interactiveObject);
			console.log(interactiveObjects);
		}		


		//Public interface
		return {

			getName: getName,
			getActions: getActions,
			getFlags: getFlags,
			getInteractiveObjects: getInteractiveObjects,
			getInitialScene: getInitialScene,
			isEndOfLevel: isEndOfLevel,
			getNextLevel: getNextLevel,

			setInitialScene: setInitialScene,
			registerAction: registerAction,
			registerInteractiveObject: registerInteractiveObject
		}
	}
});