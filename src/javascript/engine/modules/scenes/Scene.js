/* 
 This module declares the object type scene that represents one of the rooms inside the game.

 Each scene may have more than one interactive Object that will be declared later.

 Each scene has a background image
 * @memberOf Scene
 */
define([], function () {

    var counter = -1;
    /**
     * @class
     * @name Scene
     * @param {string} _name
     * @param {string} _cssClass
     * @param {function} _load
     * @param {function} _unload
     * @return ObjectExpression
     */
    function Scene(_id, _name) {
        //Attributes

        if(_id == null)
            _id = "Scene_"+counter;

        if(_name == null)
            _name = "";


        var name = _name;
        var cssClass = "noTexture";

        var loaderFunction = function(){};
        var unloadFunction = function(){};

        var dialogs = [];

        var interactiveObjects = [];
        var interactiveObjects_aux = {};

        var actions = [];
        var actions_aux = {};

        //Methods

        /**
         * Description
         * @method load
         *
         * @memberOf Scene#
         */
        function load() {
            console.info("Scene " + name + " load function");
            loaderFunction();
        }

        /**
         * Description
         * @method unload
         *
         * @memberOf Scene#
         */
        function unload() {
            console.info("Scene " + name + " unload function");
            unloadFunction();
        }

        //Getters
        function getClone(){
            var scene_clone = new Scene(id, name)
                .setCssClass(cssClass)
                .setLoadFunction(loaderFunction)
                .setUnloadFunction(unloadFunction);

            for(dialog in dialogs)
                scene_clone.registerDialog(dialog.getClone());

            for(interactiveObject in interactiveObjects)
                scene_clone.registerInteractiveObject(interactiveObject.getClone());

            for(action in actions)
                scene_clone.registerAction(action.getClone());

            return scene_clone;
        }

        /**
         * Description
         * @method getName
         * @return name
         *
         * @memberOf Scene#
         */
        function getName() {
            return name;
        }

        /**
         * Description
         * @method getCssClass
         * @return cssClass
         *
         * @memberOf Scene#
         */
        function getCssClass() {
            return cssClass;
        }

        /**
         * Description
         * @method getActions
         * @return actions
         *
         * @memberOf Scene#
         */
        function getActions() {
            return actions;
        }

        /**
         * Description
         * @method getAction
         * @param {} _actionId
         *
         * @memberOf Scene#
         */
        function getAction(_actionId) {
            if (typeof _actionId == "string") {
                return actions[actions_aux[_actionId]];
            } else {
                return actions[_actionId];
            }
        }

        /**
         * Description
         * @method getDialogs
         * @return dialogs
         *
         * @memberOf Scene#
         */
        function getDialogs() {
            return dialogs;
        }

        /**
         * Description
         * @method getInteractiveObjects
         * @return interactiveObjects
         *
         * @memberOf Scene#
         */
        function getInteractiveObjects() {
            return interactiveObjects;
        }

        /**
         * Description
         * @method getInteractiveObject
         * @param {} _intObjId
         *
         * @memberOf Scene#
         */
        function getInteractiveObject(_intObjId) {
            if (typeof _intObjId == "string") {
                return interactiveObjects[interactiveObjects_aux[_intObjId]];
            } else {
                return interactiveObjects[_intObjId];
            }
        }

        //Setters
        function setId(_id){
            id = _id;
            return this;
        }

        function setName(_name){
            name = _name;
            return this;
        }

        function setCssClass(_cssClass){
            cssClass = _cssClass;
            return this;
        }

        function setLoadFunction(_load){
            loaderFunction = _load;
            return this;
        }

        function setUnloadFunction(_unload){
            unloadFunction = _unload;
            return this;
        }

        /**
         * Description
         * @method registerAction
         * @param {} _action
         *
         * @memberOf Scene#
         */
        function registerAction(_action) {
            actions_aux[_action.getId()] = actions.length;
            actions.push(_action);

            console.log("Registering Action: ", _action.getName(), "on Scene:" + name);
        }

        function registerActions(_actions){
            var i;
            for (i = 0; i < _actions.length; i++) {
                registerAction(_actions[i]);
            }
        }

        /**
         * Description
         * @method registerDialog
         * @param {} _dialog
         *
         * @memberOf Scene#
         */
        function registerDialog(_dialog) {
            dialogs.push(_dialog);
            console.log("Registering Dialog: ", _dialog.getSpeakerName(), "on Scene:" + name);
        }

        /**
         * Description
         * @method registerDialogs
         * @param {} _dialogs
         *
         * @memberOf Scene#
         */
        function registerDialogs(_dialogs) {
            var i;
            for (i = 0; i < _dialogs.length; i++) {
                registerDialog(_dialogs[i]);
            }
        }

        /**
         * Description
         * @method registerInteractiveObject
         * @param {} _interactiveObject
         *
         * @memberOf Scene#
         */
        function registerInteractiveObject(_interactiveObject) {
            interactiveObjects_aux[_interactiveObject.getId()] = interactiveObjects.length;
            interactiveObjects.push(_interactiveObject);

            console.log("Registering Interactive Object: ", _interactiveObject.getName(), "on Scene:" + name);
        }

        function registerInteractiveObjects(_interactiveObjects) {
            var i;
            for (i = 0; i < _interactiveObjects.length; i++) {
                registerInteractiveObject(_interactiveObjects[i]);
            }
        }

        //Public interface
        return {
            getName: getName,
            getCssClass: getCssClass,
            load: load,
            unload: unload,

            getClone: getClone,
            getActions: getActions,
            getAction: getAction,
            getInteractiveObjects: getInteractiveObjects,
            getInteractiveObject: getInteractiveObject,
            getDialogs: getDialogs,

            setId:setId,
            setName:setName,
            setCssClass:setCssClass,
            setLoadFunction:setLoadFunction,
            setUnloadFunction:setUnloadFunction,


            registerAction: registerAction,
            registerActions: registerActions,
            registerDialog: registerDialog,
            registerDialogs: registerDialogs,
            registerInteractiveObject: registerInteractiveObject,
            registerInteractiveObjects: registerInteractiveObjects
        }

    }

    return Scene;
});
