define([], function () {

    /**
     * @class
     * @name Action
     * @param {string} _name
     * @param {string} _cssClass
     * @param {function} _actionFunction
     * @param {boolean} [_visible=true]
     * @return ObjectExpression
     */
    function Action(_name, _cssClass, _actionFunction, _visible) {
        //Attributes

        if (typeof _visible === 'undefined')
            _visible = true;

        /**
         * @type {string}
         * @private
         *
         * @memberOf Action#
         */
        var name = _name;
        /**
         * @type {string}
         * @private
         *
         * @memberOf Action#
         */
        var cssClass = _cssClass;
        /**
         * @type {boolean}
         * @private
         *
         * @memberOf Action#
         */
        var visible = _visible;
        /**
         * @type {function}
         * @private
         *
         * @memberOf Action#
         */
        var actionFunction = _actionFunction;
        /**
         * @type {boolean}
         * @private
         *
         * @memberOf Action#
         */
        var enable = true;

        //Methods

        /**
         * It runs this class actionFunction
         * @method
         * @method execute
         * @public
         *
         * @memberOf Action#
         */
        function execute() {
            actionFunction();
        }

        //Getters

        /**
         * @method
         * @method getFunction
         * @return actionFunction
         * @public
         *
         * @memberOf Action#
         */
        function getFunction() {
            return actionFunction;
        }

        /**
         * @method
         * @method getName
         * @return name
         * @public
         *
         * @memberOf Action#
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
         * @memberOf Action#
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
         * @memberOf Action#
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
         * @memberOf Action#
         */
        function isVisible() {
            return visible;
        }

        //Setters
        /**
         * @method
         * @method setEnable
         * @param {boolean} _enable
         * @public
         *
         * @memberOf Action#
         */
        function setEnable(_enable) {
            enable = _enable;
        }

        /**
         * @method
         * @memberOf Action
         * @method setVisible
         * @param {boolean} _visible
         * @public
         *
         * @memberOf Action#
         */
        function setVisible(_visible) {
            visible = _visible;
        }

        //Public interface

        return {
            execute: execute,

            getFunction: getFunction,
            getName: getName,
            getCssClass: getCssClass,
            isEnabled: isEnabled,
            isVisible: isVisible,

            setEnable: setEnable,
            setVisible: setVisible
        }
    }


    return Action;
});