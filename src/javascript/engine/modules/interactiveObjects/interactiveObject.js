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
 This module declares the object interactive Object that
 represents one object that will be "clickable" inside a scene

 @author Otho - Marcelo Lopes Lotufo
 */

define([], function() {


    var counter = -1;

    /**
     * @class
     * @name InteractiveObject
     * @param {string} _id
     * @param {string} _name
     * @return ObjectExpression
     *
     * @author Otho - Marcelo Lopes Lotufo
     */
    "use strict";
    function InteractiveObject( _id, _name ) {
        counter++;
        // Attributes

        if ( _id == null ) {
            _id = "interactiveObject_" + counter;
        }

        if ( _name == null ) {
            _name = "";
        }

        var id = _id;
        /**
         * @type {string}
         * @private
         *
         * @memberOf InteractiveObject#
         */
        var name = _name;
        /**
         * @type {string}
         * @private
         *
         * @memberOf InteractiveObject#
         */
        var cssClass = "noTexture";
        /**
         * @type {boolean}
         * @private
         *
         * @memberOf InteractiveObject#
         */
        var visible = true;
        /**
         * @type {function}
         * @private
         *
         * @memberOf InteractiveObject#
         */
        var onClickFunction = function() {
        };
        /**
         * @type {boolean}
         * @private
         *
         * @memberOf InteractiveObject#
         */
        var enable = true;

        // Methods

        /**
         * It runs this class actionFunction
         * @method
         * @method execute
         * @public
         *
         * @memberOf InteractiveObject#
         */
        function execute() {
            onClickFunction();
        }

        // Getters

        /**
         * @method
         * @method getFunction
         * @return actionFunction
         * @public
         *
         * @memberOf InteractiveObject#
         */

        function getFunction() {
            return onClickFunction;
        }

        function getClone() {
            return new InteractiveObject( id, name )
                .setCssClass( cssClass )
                .setVisibility( visible )
                .onClick( onClickFunction )
                .setEnable( enable );
        }

        function getId() {
            return id;
        }

        /**
         * @method
         * @method getName
         * @return name
         * @public
         *
         * @memberOf InteractiveObject#
         */
        function getName() {
            return name;
        }

        /**
         * @method
         * @method getCssClass
         * @return cssClass
         * @public
         *
         * @memberOf InteractiveObject#
         */
        function getCssClass() {
            return cssClass;
        }

        /**
         * @method
         * @method isEnabled
         * @return enable
         * @public
         *
         * @memberOf InteractiveObject#
         */
        function isEnabled() {
            return enable;
        }

        /**
         * @method
         * @method isVisible
         * @return visible
         * @public
         *
         * @memberOf InteractiveObject#
         */
        function isVisible() {
            return visible;
        }

        // Setters
        /**
         * @method
         * @method setEnable
         * @param {boolean} _enable
         * @public
         *
         * @memberOf InteractiveObject#
         */
        function setEnable( _enable ) {
            enable = _enable;
            return this;
        }

        /**
         * @method
         * @memberOf Action
         * @method setVisibility
         * @param {boolean} _visible
         * @public
         *
         * @memberOf InteractiveObject#
         */
        function setVisibility( _visible ) {
            visible = _visible;
            return this;
        }

        function setCssClass( _cssClass ) {
            cssClass = _cssClass;
            return this;
        }

        function setId( _id ) {
            id = _id;
            return this;
        }

        function setName( _name ) {
            name = _name;
            return this;
        }

        function onClick( _function ) {
            onClickFunction = _function;
            return this;
        }

        // Public interface

        return {
            execute: execute,

            getClone: getClone,
            getId: getId,
            getFunction: getFunction,
            getName: getName,
            getCssClass: getCssClass,
            isEnabled: isEnabled,
            isVisible: isVisible,

            setId: setId,
            setName: setName,
            setCssClass: setCssClass,
            setEnable: setEnable,
            setVisibility: setVisibility,
            onClick: onClick
        };
    }

    return InteractiveObject;
});
