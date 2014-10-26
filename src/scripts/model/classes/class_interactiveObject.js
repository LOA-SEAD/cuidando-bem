/* 
This module declares the object interactive Object that 
represents one object that will be "clickable" inside a scene
*/

define([], function(){
    /**
     * @class
     * @name InteractiveObject
     * @param {} _name
     * @param {} _cssClass
     * @param {} _actionFunction
     * @param {} _visible
     * @return ObjectExpression
*/
    function interactiveObject(_name, _cssClass, _actionFunction, _visible){
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
         * Description
         * @method execute
         * @memberOf InteractiveObject
*/
        function execute(){
            action();
        }

        //Getters

        /**
         * Description
         * @method getFunction
         * @return actionFunction
         * @memberOf InteractiveObject
*/
        function getFunction(){
            return actionFunction;
        }

        /**
         * Description
         * @method getName
         * @return name
         * @memberOf InteractiveObject
*/
        function getName(){
            return name;
        }

        /**
         * Description
         * @method getCssClass
         * @return cssClass
         * @memberOf InteractiveObject
*/
        function getCssClass(){
            return cssClass;
        }

        /**
         * Description
         * @method isEnabled
         * @return enable
         * @memberOf InteractiveObject
*/
        function isEnabled(){
            return enable;
        }

        /**
         * Description
         * @method isVisible
         * @return visible
         * @memberOf InteractiveObject
*/
        function isVisible(){
            return visible;
        }

        //Setters

        /**
         * Description
         * @method setEnable
         * @param {} _enable
         * @memberOf InteractiveObject
*/
        function setEnable(_enable){
            enable = _enable;
        }

        /**
         * Description
         * @method setVisible
         * @param {} _visible
         * @memberOf InteractiveObject
*/
        function setVisible(_visible){
            visible = _visible;
        }
        //Public Interface

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

	return interactiveObject;
});
