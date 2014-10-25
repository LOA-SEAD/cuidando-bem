define([], function(){

    /**
     * @name Action
     * @class
    */
    function Action(_name, _cssClass, _actionFunction, _visible){
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
         * @memberOf Action
        */
        function execute(){
            actionFunction();
        }

        //Getters
        
        /**
         * @method
         * @memberOf Action
        */
        function getFunction(){
            return actionFunction;
        }
        /**
         * @method
         * @memberOf Action
        */
        function getName(){
            return name;
        }
        /**
         * @method
         * @memberOf Action
        */
        function getCssClass(){
            return cssClass;
        }
        /**
         * @method
         * @memberOf Action
        */
        function isEnabled(){
            return enable;
        }
        /**
         * @method
         * @memberOf Action
        */
        function isVisible(){
            return visible;
        }

        //Setters
        /**
         * @method
         * @memberOf Action
        */
        function setEnable(_enable){
            enable = _enable;
        }
        /**
         * @method
         * @memberOf Action
        */
        function setVisible(_visible){
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