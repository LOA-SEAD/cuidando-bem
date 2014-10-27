define([], function () {

    /**
     * @class
     * @name Action
     * @param {string} _name
     * @param {string} _cssClass
     * @param {function} _actionFunction
     * @param {boolean} _visible = true
     * @return ObjectExpression
     */
    function Action(_name, _cssClass, _actionFunction, _visible) {
        //Attributes

        if (_visible == null)
            _visible = true;

        var name = _name;
        var cssClass = _cssClass;
        var visible = _visible;
        var enable = true;
        var actionFunction = _actionFunction;

        //Methods

        /**
         * @method
         * @method execute
         * @memberOf Action
         */
        function execute() {
            actionFunction();
        }

        //Getters

        /**
         * @method
         * @method getFunction
         * @return actionFunction
         * @memberOf Action
         */
        function getFunction() {
            return actionFunction;
        }

        /**
         * @method
         * @method getName
         * @return name
         * @memberOf Action
         */
        function getName() {
            return name;
        }

        /**
         * @method
         * @method getCssClass
         * @return cssClass
         * @memberOf Action
         */
        function getCssClass() {
            return cssClass;
        }

        /**
         * @method
         * @method isEnabled
         * @return enable
         * @memberOf Action
         */
        function isEnabled() {
            return enable;
        }

        /**
         * @method
         * @method isVisible
         * @return visible
         * @memberOf Action
         */
        function isVisible() {
            return visible;
        }

        //Setters
        /**
         * @method
         * @method setEnable
         * @param {} _enable
         * @memberOf Action
         */
        function setEnable(_enable) {
            enable = _enable;
        }

        /**
         * @method
         * @memberOf Action
         * @method setVisible
         * @param {} _visible
         * @memberOf Action
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