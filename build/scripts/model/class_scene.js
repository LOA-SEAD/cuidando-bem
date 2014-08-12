/* 
This module declares the object type scene that represents one of the rooms inside the game.

Each scene may have more than one interactive Object that will be declared later.

Each scene has a background image
*/

define([], function()
{
	return function Scene(name, cssClass)
	{
		var name = name;
		var cssClass = cssClass;

		function onLoad(){}
		function onUnload(){}

		function getName()
		{
			return name;
		}

		function getCssClass()
		{
			return cssClass;
		}

		return {			
			getName: getName,
			getCssClass: getCssClass,

		}
		
	}

});
