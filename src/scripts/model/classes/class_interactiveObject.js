/* 
This module declares the object interactive Object that 
represents one object that will be "clickable" inside a scene
*/

define([], function(){
	return function interactiveObject(_name, _cssClass, _actionFunction, _visible){
		//Attributes

        if (_visible == null)
            _visible = true;

		var name = _name;
		var cssClass = _cssClass;		
		var visible = _visible;
		var enable = true;		
		var actionFunction = _actionFunction;

		//Methods

		function execute(){
			action();
		}

		//Getters

        function getFunction(){
            return actionFunction;
        }

		function getName(){
			return name;
		}

		function getCssClass(){
			return cssClass;
		}

		function isEnabled(){
			return enable;
		}

		function isVisible(){
			return visible;
		}
		
		//Setters

		function setEnable(_enable){
			enable = _enable;
		}

		function setVisible(_visible){
			visible = _visible;
		}
		//Public Interface
		
		return {
			execute: execute,

            getFunction: getFunction,
			getName: getName,
			getCssClass: getCssClass,
			isEnabled: isEnabled,
			isVisible: isVisible,

			setEnable: setEnable,
			setVisible: setVisible
		}
	}
});
