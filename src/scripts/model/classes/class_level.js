define([], function () {
    /**
     * @class
     * @name Level
     * @param {string} _name
     * @param {function} _isEndOfLevelFunction
     * @param {function} _nextLevelFunction
     * @return ObjectExpression
     */
    function Level(_name, _isEndOfLevelFunction, _nextLevelFunction) {
        //Attributes

        /**
         *
         * @type {string}
         * @private
         *
         * @memberOf Level#
         */
        var name = _name;
        /**
         *
         * @type {function}
         * @private
         *
         * @memberOf Level#
         */
        var isEndOfLevelFunction = _isEndOfLevelFunction;
        /**
         *
         * @type {function}
         * @private
         *
         * @memberOf Level#
         */
        var nextLevelFunction = _nextLevelFunction;

        /**
         *
         * @type {array}
         * @private
         *
         * @memberOf Level#
         */
        var scenes = [];
        /**
         *
         * @type {object}
         * @private
         *
         * @memberOf Level#
         */
        var scenes_aux = {};

        /**
         *
         * @type {array}
         * @private
         *
         * @memberOf Level#
         */
        var modalScenes = [];
        /**
         *
         * @type {object}
         * @private
         *
         * @memberOf Level#
         */
        var modalScenes_aux = {};

        /**
         *
         * @type {array}
         * @private
         *
         * @memberOf Level#
         */
        var flags = [];
        /**
         *
         * @type {object}
         * @private
         *
         * @memberOf Level#
         */
        var flags_aux = {};

        /**
         *
         * @type {int}
         * @private
         *
         * @memberOf Level#
         */
        var currentScene = 0;
        /**
         *
         * @type {int}
         * @private
         *
         * @memberOf Level#
         */
        var initialScene = 0;

        //Methods

        //Getters

        /**
         * Description
         * @method getName
         * @return name
         *
         * @memberOf Level#
         */
        function getName() {
            return name;
        }

        /**
         * Description
         * @method getActions
         * @param {int|string} _sceneId
         * @return CallExpression
         *
         * @memberOf Level#
         */
        function getActions(_sceneId) {
            return getScene(_sceneId).getActions();
        }

        /**
         * Description
         * @method getDialogs
         * @param {int|string} _sceneId
         * @return CallExpression
         *
         * @memberOf Level#
         */
        function getDialogs(_sceneId) {
            return getScene(_sceneId).getDialogs();
        }

        /**
         * Description
         * @method getInteractiveObjects
         * @param {int|string} _sceneId
         * @return CallExpression
         *
         * @memberOf Level#
         */
        function getInteractiveObjects(_sceneId) {
            return getScene(_sceneId).getInteractiveObjects();
        }

        /**
         * Description
         * @method getScene
         * @param {int|string} _sceneId
         *
         * @memberOf Level#
         */
        function getScene(_sceneId) {
            if (typeof _sceneId == "string") {
                return scenes[scenes_aux[_sceneId]];
            } else {
                return scenes[_sceneId];
            }
        }

        /**
         * Description
         * @method getModalScene
         * @param {int|string} _modalSceneId
         *
         * @memberOf Level#
         */
        function getModalScene(_modalSceneId) {
            if (typeof _modalSceneId == "string") {
                return modalScenes[modalScenes_aux[_modalSceneId]];
            } else {
                return modalScenes[_modalSceneId];
            }
        }

        /**
         * Description
         * @method getFlags
         * @return flags
         *
         * @memberOf Level#
         */
        function getFlags() {
            return flags;
        }

        /**
         * Description
         * @method getFlag
         * @param {int|string} _flagId
         *
         * @memberOf Level#
         */
        function getFlag(_flagId) {
            if (typeof _flagId == "string") {
                return flags[flags_aux[_flagId]];
            } else {
                return flags[_flagId];
            }
        }

        /**
         * Description
         * @method getInitialScene
         * @return MemberExpression
         *
         * @memberOf Level#
         */
        function getInitialScene() {
            return scenes[initialScene];
        }

        /**
         * Description
         * @method getCurrentScene
         * @return MemberExpression
         *
         * @memberOf Level#
         */
        function getCurrentScene() {
            return scenes[currentScene];
        }

        /**
         * Description
         * @method getCurrentSceneId
         * @return currentScene
         *
         * @memberOf Level#
         */
        function getCurrentSceneId() {
            return currentScene;
        }

        /**
         * Description
         * @method isEndOfLevel
         * @return CallExpression
         *
         * @memberOf Level#
         */
        function isEndOfLevel() {
            return isEndOfLevelFunction();
        }

        /**
         * Description
         * @method getNextLevel
         * @return CallExpression
         *
         * @memberOf Level#
         */
        function getNextLevel() {
            return nextLevelFunction();
        }

        //Setters

        /**
         * Description
         * @method setInitialScene
         * @param {int} _initialSceneId
         *
         * @memberOf Level#
         */
        function setInitialScene(_initialSceneId) {
            initialScene = _initialSceneId;
            currentScene = _initialSceneId;
        }

        /**
         * Description
         * @method setCurrentSceneById
         * @param {int} _newSceneId
         *
         * @memberOf Level#
         */
        function setCurrentSceneById(_newSceneId) {
            currentScene = _newSceneId;
        }

        /**
         * Description
         * @method registerScene
         * @param {Scene} _scene
         *
         * @memberOf Level#
         */
        function registerScene(_scene) {
            scenes_aux[_scene.getName()] = scenes.length;
            scenes.push(_scene);
            L.log(["Registering scene: ", _scene.getName()]);
        }

        /**
         * Description
         * @method registerModalScene
         * @param {ModalScene} _modalScene
         *
         * @memberOf Level#
         */
        function registerModalScene(_modalScene) {
            modalScenes_aux[_modalScene.getName()] = modalScenes.length;
            modalScenes.push(_modalScene);
            L.log(["Registering modalScene: ", _modalScene.getName()]);
        }

        /**
         * Description
         * @method registerAction
         * @param {Action} _action
         * @param {int} _sceneId
         *
         * @memberOf Level#
         */
        function registerAction(_action, _sceneId) {
            scenes[_sceneId].registerAction(_action);
        }

        /**
         * Description
         * @method registerInteractiveObject
         * @param {InteractiveObject} _interactiveObject
         * @param {int} _sceneId
         *
         * @memberOf Level#
         */
        function registerInteractiveObject(_interactiveObject, _sceneId) {
            scenes[_sceneId].registerInteractiveObject(_interactiveObject);
        }

        /**
         * Description
         * @method registerDialog
         * @param {Dialog} _dialog
         * @param {int} _sceneId
         *
         * @memberOf Level#
         */
        function registerDialog(_dialog, _sceneId) {
            scenes[_sceneId].registerDialog(_dialog);
        }

        /**
         * Description
         * @method registerFlag
         * @param {Flag} _flag
         *
         * @memberOf Level#
         */
        function registerFlag(_flag) {
            flags_aux[_flag.getName()] = flags.length;
            flags.push(_flag);
            L.log(["Registering flag: ", _flag.getName()]);
        }


        //Public interface
        return {
            getName: getName,
            getActions: getActions,
            getFlag: getFlag,
            getFlags: getFlags,
            getInteractiveObjects: getInteractiveObjects,
            getDialogs: getDialogs,

            getInitialScene: getInitialScene,

            getCurrentScene: getCurrentScene,
            getCurrentSceneId: getCurrentSceneId,
            getScene: getScene,
            getModalScene: getModalScene,

            isEndOfLevel: isEndOfLevel,
            getNextLevel: getNextLevel,

            setInitialScene: setInitialScene,
            setCurrentSceneById: setCurrentSceneById,


            registerScene: registerScene,
            registerModalScene: registerModalScene,
            registerAction: registerAction,
            registerDialog: registerDialog,
            registerFlag: registerFlag,
            registerInteractiveObject: registerInteractiveObject
        }
    }

    return Level;
});