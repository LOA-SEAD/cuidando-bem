/* 
 This module declares the object type scene that represents one of the rooms inside the game.

 Each scene may have more than one interactive Object that will be declared later.

 Each scene has a background image
 * @memberOf Scene
 */
define([], function () {
    /**
     * @class
     * @name Scene
     * @param {string} _name
     * @param {string} _cssClass
     * @param {function} _load
     * @param {function} _unload
     * @return ObjectExpression
     */
    function Scene(_name, _cssClass, _load, _unload) {
        //Attributes

        if (typeof _load === 'undefined') {
            _load = function () {};
        }

        if (typeof _unload === 'undefined') {
            _unload = function () {};
        }

        var name = _name;
        var cssClass = _cssClass;

        var loaderFunction = _load;
        var unloadFunction = _unload;

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
                dialogs.push(_dialogs[i]);
                console.log("Registering Dialog: ", _dialogs[i].getSpeakerName(), "on Scene:" + name);
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

        //Public interface
        return {
            getName: getName,
            getCssClass: getCssClass,
            load: load,
            unload: unload,

            getActions: getActions,
            getAction: getAction,
            getInteractiveObjects: getInteractiveObjects,
            getInteractiveObject: getInteractiveObject,
            getDialogs: getDialogs,

            registerAction: registerAction,
            registerDialog: registerDialog,
            registerDialogs: registerDialogs,
            registerInteractiveObject: registerInteractiveObject,

            setCssClass: function (_cssClass){
                cssClass = _cssClass;
            }
        }

    }

    return Scene;
});
