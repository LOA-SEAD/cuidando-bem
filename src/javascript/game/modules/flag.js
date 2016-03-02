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
