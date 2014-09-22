define([], function ()
{
	return function Level(_name, _startingScene, _numberOfScenes)
	{
		var name = _name;
		var actions = [];
		var objects = [];

		for(i=0;i<_numberOfScenes;i++)
		{
			actions.push([]);
			objects.push([]);
		}
	
		function addAction(_action, _scene)
		{
			console.log(actions);
			actions[_scene].push(_action);
		}

		function addInteractiveObject(_object, _scene)
		{

		}

		function getActions()
		{
			return actions;
		}

		function getObjects()
		{
			return objects;
		}

		return {
			getName: function (){return name},
			addAction: addAction,
			getActions: getActions,

			addInteractiveObject: addInteractiveObject,
			getObjects: getObjects,

		}



	}
});