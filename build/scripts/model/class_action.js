define([], function()
{
	return function Action(_name, _cssClass, _action)
	{
		var name = _name;
		var cssClass = _cssClass;
		var action = _action;	

		function doAction()
		{
			action();
		}	

		return {
			doAction: doAction
		}
	}

	
});