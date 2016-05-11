/*
This file is part of Cuidando Bem.

    Cuidando Bem is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Cuidando Bem is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Cuidando Bem.  If not, see <http://www.gnu.org/licenses/>.
*/
define([], function() {
    /**
     * @class
     * @name Level
     * @param {string} _name
     * @return ObjectExpression
     *
     * @author Otho - Marcelo Lopes Lotufo
     */
    function Level( _name ) {
        // Attributes

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
        var scenesAux = {};

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
        var modalscenesAux = {};

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
        var flagsAux = {};

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

        var maxPoints = 0;

        var setupScript = function() {
        };

        // Methods

        // Getters

        function getClone() {
            var newLevel = new Level( name );

            for ( scene in scenes ) {
                newLevel.registerScene( scenes[ scene ].getClone() );
            }

            for ( modal in modalScenes ) {
                newLevel.registerModalScene( modalScenes[ modal ].getClone() );
            }

            for ( flag in flags ) {
                newLevel.registerFlag( flags[ flag ].getClone() );
            }

            newLevel.setMaxPoints( maxPoints );
            newLevel.setInitialScene( initialScene );
            newLevel.setCurrentSceneById( currentScene );
            newLevel.setSetupScript( setupScript );

            return newLevel;
        }

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
        function getActions( _sceneId ) {
            return getScene( _sceneId ).getActions();
        }

        /**
         * Description
         * @method getDialogs
         * @param {int|string} _sceneId
         * @return CallExpression
         *
         * @memberOf Level#
         */
        function getDialogs( _sceneId ) {
            return getScene( _sceneId ).getDialogs();
        }

        /**
         * Description
         * @method getInteractiveObjects
         * @param {int|string} _sceneId
         * @return CallExpression
         *
         * @memberOf Level#
         */
        function getInteractiveObjects( _sceneId ) {
            return getScene( _sceneId ).getInteractiveObjects();
        }

        /**
         * Description
         * @method getScene
         * @param {int|string} _sceneId
         *
         * @memberOf Level#
         */
        function getScene( _sceneId ) {
            if ( typeof _sceneId == "string") {
                return scenes[ scenesAux[ _sceneId ] ];
            }

            return scenes[ _sceneId ];
        }

        /**
         * Description
         * @method getModalScene
         * @param {int|string} _modalSceneId
         *
         * @memberOf Level#
         */
        function getModalScene( _modalSceneId ) {
            if ( typeof _modalSceneId == "string") {
                return modalScenes[ modalscenesAux[ _modalSceneId ] ];
            }

            return modalScenes[ _modalSceneId ];
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
        function getFlag( _flagId ) {
            if ( typeof _flagId == "string") {
                return flags[ flagsAux[ _flagId ] ];
            }

            return flags[ _flagId ];
        }

        /**
         * Description
         * @method getInitialScene
         * @return MemberExpression
         *
         * @memberOf Level#
         */
        function getInitialScene() {
            return scenes[ initialScene ];
        }

        /**
         * Description
         * @method getCurrentScene
         * @return MemberExpression
         *
         * @memberOf Level#
         */
        function getCurrentScene() {
            return scenes[ currentScene ];
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

        // Setters

        /**
         * Description
         * @method setInitialScene
         * @param {int} _initialSceneId
         *
         * @memberOf Level#
         */
        function setInitialScene( _initialSceneId ) {
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
        function setCurrentSceneById( _newSceneId ) {
            currentScene = _newSceneId;
        }

        /**
         * Description
         * @method registerScene
         * @param {Scene} _scene
         *
         * @memberOf Level#
         */
        function registerScene( _scene ) {
            scenesAux[ _scene.getId() ] = scenes.length;
            scenes.push( _scene );
            console.log("Registering scene: ", _scene.getName() );
        }

        /**
         * Description
         * @method registerModalScene
         * @param {ModalScene} _modalScene
         *
         * @memberOf Level#
         */
        function registerModalScene( _modalScene ) {
            modalscenesAux[ _modalScene.getId() ] = modalScenes.length;
            modalScenes.push( _modalScene );
            console.log("Registering modalScene: ", _modalScene.getName() );
        }

        /**
         * Description
         * @method registerAction
         * @param {Action} _action
         * @param {int} _sceneId
         *
         * @memberOf Level#
         */
        function registerAction( _action, _sceneId ) {
            scenes[ _sceneId ].registerAction( _action );
        }

        /**
         * Description
         * @method registerInteractiveObject
         * @param {InteractiveObject} _interactiveObject
         * @param {int} _sceneId
         *
         * @memberOf Level#
         */
        function registerInteractiveObject( _interactiveObject, _sceneId ) {
            scenes[ _sceneId ].registerInteractiveObject( _interactiveObject );
        }

        /**
         * Description
         * @method registerDialog
         * @param {Dialog} _dialog
         * @param {int} _sceneId
         *
         * @memberOf Level#
         */
        function registerDialog( _dialog, _sceneId ) {
            scenes[ _sceneId ].registerDialog( _dialog );
        }

        /**
         * Description
         * @method registerFlag
         * @param {Flag} _flag
         *
         * @memberOf Level#
         */
        function registerFlag( _flag ) {
            flagsAux[ _flag.getName() ] = flags.length;
            flags.push( _flag );
            console.log("Registering flag: ", _flag.getName() );
        }

        function setMaxPoints( _points ) {
            maxPoints = _points;
        }

        function getMaxPoints() {
            return maxPoints;
        }


        // Public interface
        return {
            getClone: getClone,
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
            getMaxPoints: getMaxPoints,

            setInitialScene: setInitialScene,
            setCurrentSceneById: setCurrentSceneById,
            setSetupScript: function( script ) {
                setupScript = script;
            },
            setup: function() {
                setupScript();
            },
            setMaxPoints: setMaxPoints,

            registerScene: registerScene,
            registerModalScene: registerModalScene,
            registerAction: registerAction,
            registerDialog: registerDialog,
            registerFlag: registerFlag,
            registerInteractiveObject: registerInteractiveObject
        };
    }

    return Level;
});
