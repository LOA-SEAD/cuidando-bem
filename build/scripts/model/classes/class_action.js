define([], function()
{
	return function Action(_name, _cssClass, _actionFunction)
	{
		//Attributes

		var name = _name;
		var cssClass = _cssClass;		
		var visible = true;
		var enable = true;
		var actionFunction = _actionFunction;

		//Methods

		function execute()
		{
			action();
		}

		//Getters

		function getName()
		{
			return name;
		}

		function getCssClass()
		{
			return cssClass;
		}

		function isEnabled()
		{
			return enable;
		}

		function isVisible()
		{
			return visible;
		}
		
		//Setters

		function setEnable(_enable)
		{
			enable = _enable;
		}

		function setVisible(_visible)
		{
			visible = _visible;
		}

		//Public interface
		
		return {
			execute: execute,

			getName: getName,
			getCssClass: getCssClass,
			isEnabled: isEnabled,
			isVisible: isVisible,

			setEnable: setEnable,
			setVisible: setVisible
		}
	}

	
});