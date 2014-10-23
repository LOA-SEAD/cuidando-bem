/* 
This module declares the object type scene that represents one of the rooms inside the game.

Each scene may have more than one interactive Object that will be declared later.

Each scene has a background image
*/
define([], function(){
	return function Scene(_name, _cssClass, _load, _unload){
		//Attributes

		var name = _name;
		var cssClass = _cssClass;

		var loaderFunction = _load;
		var unloadFunction = _unload;

        var dialogs = [];
        var interactiveObjects = [];

        var actions = [];
        var actions_aux = {};

		//Methods

		function onLoad(){
			L.log("Scene "+name+" loader function");
			loaderFunction();
		}

		function onUnload(){
			L.log("Scene "+name+" unload function");
			unloadFunction();
		}
		
		//Getters

		function getName(){
			return name;
		}

		function getCssClass(){
			return cssClass;
		}

        function getActions(){
            return actions;
        }

        function getAction(_actionId){
            if(typeof _actionId == "string"){
                return actions[actions_aux[_actionId]];
            }else {
                return actions[_actionId];
            }
        }

        function getDialogs(){
            return dialogs;
        }

        function getInteractiveObjects(){
            return interactiveObjects;
        }
		
		//Setters

        function registerAction(_action){
            actions_aux[_action.getName()] = actions.length;
            actions.push(_action);

            L.log(["Registering Action: ", _action.getName(), "on Scene:" + name]);
        }

        function registerDialog(_dialog){
            dialogs.push(_dialog);
            L.log(["Registering Dialog: ", _dialog.getSpeakerName(), "on Scene:" + name]);
        }

        function registerInteractiveObject(_interactiveObject){
            interactiveObjects.push(_interactiveObject);
            L.log(["Registering Interactive Object: ", _interactiveObject.getName(), "on Scene:" + name]);
        }

        //Public interface
		return {			
			getName: getName,
			getCssClass: getCssClass,
			onLoad: onLoad,
			onUnLoad: onUnload,

            getActions: getActions,
            getAction: getAction,
            getInteractiveObjects: getInteractiveObjects,
            getDialogs: getDialogs,

            registerAction: registerAction,
            registerDialog: registerDialog,
            registerInteractiveObject: registerInteractiveObject
		}
		
	}
});
