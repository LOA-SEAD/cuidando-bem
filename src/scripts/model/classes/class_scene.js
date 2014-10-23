/* 
This module declares the object type scene that represents one of the rooms inside the game.

Each scene may have more than one interactive Object that will be declared later.

Each scene has a background image
*/
define([], function(){
	return function Scene(_name, _cssClass, _load, _unload){
		//Attributes

        if(_load == null)
            _load = function (){};

        if(_unload == null)
            _unload = function (){};

		var name = _name;
		var cssClass = _cssClass;

		var loaderFunction = _load;
		var unloadFunction = _unload;

        var dialogs = [];
        var interactiveObjects = [];

        var actions = [];
        var actions_aux = {};

		//Methods

		function load(){
			L.info("Scene "+name+" loader function");
			loaderFunction();
		}

		function unload(){
			L.info("Scene "+name+" unload function");
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

        function registerDialogs(_dialogs){
            for(i = 0; i < _dialogs.length; i++){
                dialogs.push(_dialogs[i]);
                L.log(["Registering Dialog: ", _dialogs[i].getSpeakerName(), "on Scene:" + name]);
            }
        }

        function registerInteractiveObject(_interactiveObject){
            interactiveObjects.push(_interactiveObject);
            L.log(["Registering Interactive Object: ", _interactiveObject.getName(), "on Scene:" + name]);
        }

        //Public interface
		return {			
			getName: getName,
			getCssClass: getCssClass,
			load: load,
			unload: unload,

            getActions: getActions,
            getAction: getAction,
            getInteractiveObjects: getInteractiveObjects,
            getDialogs: getDialogs,

            registerAction: registerAction,
            registerDialog: registerDialog,
            registerDialogs: registerDialogs,
            registerInteractiveObject: registerInteractiveObject
		}
		
	}
});
