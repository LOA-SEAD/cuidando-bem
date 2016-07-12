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
/*
 This module declares the object type scene that represents one of the rooms inside the game.

 Each scene may have more than one interactive Object that will be declared later.

 Each scene has a background image
 * @memberOf Scene

 @author Otho - Marcelo Lopes Lotufo
 */
define(function() {

    var counter = -1;

    /**
     * @class
     * @name Scene
     * @param {string} _name
     * @param {string} _cssClass
     * @param {function} _load
     * @param {function} _unload
     * @return ObjectExpression
     *
     * @author Otho - Marcelo Lopes Lotufo
     */
    function Scene( _id, _name ) {
        // Attributes

        if ( _id == null ) {
            _id = "Scene_" + counter;
        }

        if ( _name == null ) {
            _name = "";
        }

        var id = _id;

        var name = _name;
        var cssClass = "noTexture";

        var onLoadFunction = function() {
        };
        var onUnloadFunction = function() {
        };

        var dialogs = [];

        var interactiveObjects = [];
        var interactiveObjectsAux = {};

        var actions = [];
        var actionsAux = {};

        var template;

        // Methods

        /**
         * Description
         * @method load
         *
         * @memberOf Scene#
         */
        function load() {

            onLoadFunction();
        }

        /**
         * Description
         * @method unload
         *
         * @memberOf Scene#
         */
        function unload() {

            onUnloadFunction();
        }

        // Getters
        function getClone() {
            var sceneClone = new Scene( id, name )
                .setCssClass( getCssClass() )
                .onLoad( onLoadFunction )
                .onUnload( onUnloadFunction )
                .setTemplate( getTemplate() );

            for ( dialog in dialogs ) {
                sceneClone.registerDialog( dialogs[ dialog ].getClone() );
            }

            for ( interactiveObject in interactiveObjects ) {
                sceneClone.registerInteractiveObject( interactiveObjects[ interactiveObject ].getClone() );
            }

            for ( action in actions ) {
                sceneClone.registerAction( actions[ action ].getClone() );
            }

            return sceneClone;
        }

        function getId() {
            return id;
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
        function getAction( _actionId ) {
            if ( typeof _actionId == "string") {
                return actions[ actionsAux[ _actionId ] ];
            }

            return actions[ _actionId ];
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
        function getInteractiveObject( _intObjId ) {
            if ( typeof _intObjId == "string") {
                return interactiveObjects[ interactiveObjectsAux[ _intObjId ] ];
            }

            return interactiveObjects[ _intObjId ];
        }

        function getTemplate() {
            return template;
        }

        // Setters
        function setId( _id ) {
            id = _id;
            return this;
        }

        function setName( _name ) {
            name = _name;
            return this;
        }

        function setCssClass( _cssClass ) {
            cssClass = _cssClass;
            return this;
        }

        function onLoad( _load ) {
            onLoadFunction = _load;
            return this;
        }

        function onUnload( _unload ) {
            onUnloadFunction = _unload;
            return this;
        }

        function setTemplate( _template ) {
            template = _template;
            return this;
        }

        /**
         * Description
         * @method registerAction
         * @param {} _action
         *
         * @memberOf Scene#
         */
        function registerAction( _action ) {
            actionsAux[ _action.getId() ] = actions.length;
            actions.push( _action );

, "on Scene:" + name );
        }

        function registerActions( _actions ) {
            var i;
            for ( i = 0; i < _actions.length; i++ ) {
                registerAction( _actions[ i ] );
            }
        }

        /**
         * Description
         * @method registerDialog
         * @param {} _dialog
         *
         * @memberOf Scene#
         */
        function registerDialog( _dialog ) {
            dialogs.push( _dialog );
, "on Scene:" + name );
        }

        /**
         * Description
         * @method registerDialogs
         * @param {} _dialogs
         *
         * @memberOf Scene#
         */
        function registerDialogs( _dialogs ) {
            var i;
            for ( i = 0; i < _dialogs.length; i++ ) {
                registerDialog( _dialogs[ i ] );
            }
        }

        /**
         * Description
         * @method registerInteractiveObject
         * @param {} _interactiveObject
         *
         * @memberOf Scene#
         */
        function registerInteractiveObject( _interactiveObject ) {
            interactiveObjectsAux[ _interactiveObject.getId() ] = interactiveObjects.length;
            interactiveObjects.push( _interactiveObject );

, "on Scene:" + name );
        }

        function registerInteractiveObjects( _interactiveObjects ) {
            var i;
            for ( i = 0; i < _interactiveObjects.length; i++ ) {
                registerInteractiveObject( _interactiveObjects[ i ] );
            }
        }

        // Public interface
        return {
            getId: getId,
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
            getTemplate: getTemplate,

            setId: setId,
            setName: setName,
            setCssClass: setCssClass,
            onLoad: onLoad,
            onUnload: onUnload,
            setTemplate: setTemplate,


            registerAction: registerAction,
            registerActions: registerActions,
            registerDialog: registerDialog,
            registerDialogs: registerDialogs,
            registerInteractiveObject: registerInteractiveObject,
            registerInteractiveObjects: registerInteractiveObjects
        };

    }

    return Scene;
});
