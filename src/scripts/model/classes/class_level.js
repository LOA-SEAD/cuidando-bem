define([], function () {
    /**
     * @class
     * @name Level
     * @param {} _name
     * @param {} _isEndOfLevelFunction
     * @param {} _nextLevelFunction
     * @return ObjectExpression
     */
    function Level(_name, _isEndOfLevelFunction, _nextLevelFunction) {
        //Attributes

        var name = _name;
        var isEndOfLevelFunction = _isEndOfLevelFunction;
        var nextLevelFunction = _nextLevelFunction;

        var scenes = [];
        var scenes_aux = {};

        var modalScenes = [];
        var modalScenes_aux = {};

        var flags = [];
        var flags_aux = {};

        var currentScene = 0;
        var initialScene = 0;

        //Methods

        //Getters

        /**
         * Description
         * @method getName
         * @return name
         * @memberOf Level
         */
        function getName() {
            return name;
        }

        /**
         * Description
         * @method getActions
         * @param {} _sceneId
         * @return CallExpression
         * @memberOf Level
         */
        function getActions(_sceneId) {
            return getScene(_sceneId).getActions();
        }

        /**
         * Description
         * @method getDialogs
         * @param {} _sceneId
         * @return CallExpression
         * @memberOf Level
         */
        function getDialogs(_sceneId) {
            return getScene(_sceneId).getDialogs();
        }

        /**
         * Description
         * @method getInteractiveObjects
         * @param {} _sceneId
         * @return CallExpression
         * @memberOf Level
         */
        function getInteractiveObjects(_sceneId) {
            return getScene(_sceneId).getInteractiveObjects();
        }

        /**
         * Description
         * @method getScene
         * @param {} _sceneId
         * @memberOf Level
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
         * @param {} _modalSceneId
         * @memberOf Level
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
         * @memberOf Level
         */
        function getFlags() {
            return flags;
        }

        /**
         * Description
         * @method getFlag
         * @param {} _flagId
         * @memberOf Level
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
         * @memberOf Level
         */
        function getInitialScene() {
            return scenes[initialScene];
        }

        /**
         * Description
         * @method getCurrentScene
         * @return MemberExpression
         * @memberOf Level
         */
        function getCurrentScene() {
            return scenes[currentScene];
        }

        /**
         * Description
         * @method getCurrentSceneId
         * @return currentScene
         * @memberOf Level
         */
        function getCurrentSceneId() {
            return currentScene;
        }

        /**
         * Description
         * @method isEndOfLevel
         * @return CallExpression
         * @memberOf Level
         */
        function isEndOfLevel() {
            return isEndOfLevelFunction();
        }

        /**
         * Description
         * @method getNextLevel
         * @return CallExpression
         * @memberOf Level
         */
        function getNextLevel() {
            return nextLevelFunciton();
        }

        //Setters

        /**
         * Description
         * @method setInitialScene
         * @param {} _initialScene
         * @memberOf Level
         */
        function setInitialScene(_initialScene) {
            initialScene = _initialScene;
            currentScene = _initialScene;
        }

        /**
         * Description
         * @method setCurrentSceneById
         * @param {} _newScene
         * @memberOf Level
         */
        function setCurrentSceneById(_newScene) {
            currentScene = _newScene;
        }

        /**
         * Description
         * @method registerScene
         * @param {} _scene
         * @memberOf Level
         */
        function registerScene(_scene) {
            scenes_aux[_scene.getName()] = scenes.length;
            scenes.push(_scene);
            L.log(["Registering scene: ", _scene.getName()]);
        }

        /**
         * Description
         * @method registerModalScene
         * @param {} _modalScene
         * @memberOf Level
         */
        function registerModalScene(_modalScene) {
            modalScenes_aux[_modalScene.getName()] = modalScenes.length;
            modalScenes.push(_modalScene);
            L.log(["Registering modalScene: ", _modalScene.getName()]);
        }

        /**
         * Description
         * @method registerAction
         * @param {} _action
         * @param {} _sceneId
         * @memberOf Level
         */
        function registerAction(_action, _sceneId) {
            scenes[_sceneId].registerAction(_action);
        }

        /**
         * Description
         * @method registerInteractiveObject
         * @param {} _interactiveObject
         * @param {} _sceneId
         * @memberOf Level
         */
        function registerInteractiveObject(_interactiveObject, _sceneId) {
            scenes[_sceneId].registerInteractiveObject(_interactiveObject);
        }

        /**
         * Description
         * @method registerDialog
         * @param {} _dialog
         * @param {} _sceneId
         * @memberOf Level
         */
        function registerDialog(_dialog, _sceneId) {
            scenes[_sceneId].registerDialog(_dialog);
        }

        /**
         * Description
         * @method registerFlag
         * @param {} _flag
         * @memberOf Level
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