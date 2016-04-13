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
     * @name Flag
     * @param {string} _name
     * @param {any} _value
     * @return ObjectExpression
     *
     * @author Otho - Marcelo Lopes Lotufo
     */
    function Flag( _name, _value ) {
        // Attributes

        /**
         *
         * @type {string}
         * @private
         *
         * @memberOf Flag#
         */
        var name = _name;
        /**
         *
         * @type {any}
         * @private
         *
         * @memberOf Flag#
         */
        var value = _value;

        // Methods

        // Getters
        function getClone() {
            return new Flag( name, value );
        }

        /**
         * Description
         * @method getName
         * @return name
         *
         * @memberOf Flag#
         */
        function getName() {
            return name;
        }

        /**
         * Description
         * @method getValue
         * @return value
         *
         * @memberOf Flag#
         */
        function getValue() {
            return value;
        }

        // Setters

        /**
         * Description
         * @method setName
         * @param {string} _name
         *
         * @memberOf Flag#
         */
        function setName( _name ) {
            name = _name;
        }

        /**
         * Description
         * @method setValue
         * @param {any} _value
         *
         * @memberOf Flag#
         */
        function setValue( _value ) {
            value = _value;
        }

        // Public interface
        return {
            getClone: getClone,

            getName: getName,
            getValue: getValue,

            setName: setName,
            setValue: setValue
        };

    }

    return Flag;
});
