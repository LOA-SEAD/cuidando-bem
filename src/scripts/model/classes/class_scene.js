/* 
This module declares the object type scene that represents one of the rooms inside the game.

Each scene may have more than one interactive Object that will be declared later.

Each scene has a background image
*/
define([], function(){
	return function Scene(name, cssClass, load, unload)
	{
		//Attributes

		var name = name;
		var cssClass = cssClass;		

		var loaderFunction = load;
		var unloadFunction = unload;
		
		//Methods

		function onLoad()
		{
			console.log("Scene "+name+" loader function");
			loaderFunction();
		}
		function onUnload()
		{
			console.log("Scene "+name+" unload function");
			unloadFunction();
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
		
		//Setters
		
		//Public interface
		return {			
			getName: getName,
			getCssClass: getCssClass,
			onLoad: onLoad,
			onUnLoad: onUnload			
		}
		
	}

});
