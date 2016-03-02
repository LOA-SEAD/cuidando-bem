define([], function() {

    /**
     * Stores a character name and cssClass
     *
     * @class
     * @name Character
     *
     * @param {string} _name
     * @param {string} _cssClass
     * @returns ObjectExpression
     * @constructor
     *
     * @author Otho - Marcelo Lopes Lotufo
     */
    function Character( _name, _cssClass ) {

        /**
         * Character name that will be displayed in the Dialog Modal
         * @type {string}
         * @private
         *
         * @memberOf Character#
         */
        var name = _name;

        /**
         * Css class of the character portrait
         * @type {string}
         * @private
         *
         * @memberOf Character#
         */
        var cssClass = _cssClass;

        /**
         * Returns cssClass
         * @method getCssClass
         * @returns {string} cssClass
         *
         * @memberOf Character#
         */
        function getCssClass() {
            return cssClass;
        }

        /**
         * Sets cssClass
         * @method setCssClass
         * @param {string} _cssClass
         *
         * @memberOf Character#
         */
        function setCssClass( _cssClass ) {
            cssClass = _cssClass;
            return this;
        }

        /**
         * Returns Name
         * @method getName
         * @returns {string} name
         *
         * @memberOf Character#
         */
        function getName() {
            return name;
        }

        /**
         * Sets name
         * @method setName
         * @param {string} _name
         *
         * @memberOf Character#
         */
        function setName( _name ) {
            name = _name;
            return this;
        }

        return {
            getName: getName,
            setName: setName,

            getCssClass: getCssClass,
            setCssClass: setCssClass
        };
    }

    return Character;
});
