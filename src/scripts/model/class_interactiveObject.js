/* 
This module declares the object interactive Object that 
represents one object that will be "clickable" inside a scene


*/

define([], function()
{
	return function interactiveObject(_name, _cssClass, _action)
	{
		var name = _name;
		var cssClass = _cssClass;		
		var visible = true;
		var action = _action;

		function onLoad(){}
		function onUnload(){}
		function onInteraction(){}

		return {

		}
	}

});
