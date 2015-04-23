define([], function(){

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
	function Character(_name, _cssClass){

        /**
         *
         * @type {string}
         * @private
         *
         * @memberOf Character#
         */
		var name = _name;

        /**
         *
         * @type {string}
         * @private
         *
         * @memberOf Character#
         */
		var cssClass = _cssClass;

        /**
         *
         * @method getCssClass
         * @returns {string} cssClass
         *
         * @memberOf Character#
         */
		function getCssClass(){
			return cssClass;
		}

        /**
         *
         * @method setCssClass
         * @param {string} _cssClass
         *
         * @memberOf Character#
         */
		function setCssClass(_cssClass){
			cssClass = _cssClass;
			return this;
		}

        /**
         *
         * @method getName
         * @returns {string} name
         *
         * @memberOf Character#
         */
		function getName(){
			return name;
		}

        /**
         *
         * @method setName
         * @param {string} _name
         *
         * @memberOf Character#
         */
		function setName(_name){
			name = _name
			return this;
		}

		return {
			getName: getName,
			setName: setName,

			getCssClass: getCssClass,
			setCssClass: setCssClass
		}
	}

	return Character;
});