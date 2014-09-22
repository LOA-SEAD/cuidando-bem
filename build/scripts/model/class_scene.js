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
		var commandBarThumbnailCssClass;

		var loaderFunction;
		var unloaderFunction;

		function onLoad()
		{
			;
			loaderFunction();
		}
		function onUnload()
		{
			;
			unloaderFunction();
		}

		function getName()
		{
			return name;
		}

		function getCssClass()
		{
			return cssClass;
		}

		function setLoaderFunction(_function)
		{
			loaderFunction = _function;
		}
		function setUnloaderFunction(_function)
		{
			unloaderFunction = _function;
		}

		return {			
			getName: getName,
			getCssClass: getCssClass,
			load: onLoad,
			unload: onUnload,
			setLoaderFunction: setLoaderFunction,
			setUnloaderFunction: setUnloaderFunction,

		}
		
	}

});
