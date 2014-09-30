/* 
This module declares the object interactive Object that 
represents one object that will be "clickable" inside a scene
*/

define([], function()
{
	return function interactiveObject(_name, _cssClass, _action)
	{
		//Attributes

		var name = _name;
		var cssClass = _cssClass;		
		var visible = true;
		var enable = true;		
		var action = _action;

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
		//Public Interface
		
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
