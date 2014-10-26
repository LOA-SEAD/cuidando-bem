define([], function(){
    /**
     * @class
     * @name Flag
     * @param {} name
     * @param {} value
     * @return ObjectExpression

*/
    function Flag(name, value){
        //Attributes

        var name = name;
        var value = value;

        //Methods

        //Getters

        /**
         * Description
         * @method getName
         * @return name
         * @memberOf Flag
*/
        function getName()
        {
            return name;
        }

        /**
         * Description
         * @method getValue
         * @return value
         * @memberOf Flag
*/
        function getValue()
        {
            return value;
        }

        //Setters

        /**
         * Description
         * @method setName
         * @param {} _name
         * @memberOf Flag
*/
        function setName(_name)
        {
            name = _name;
        }

        /**
         * Description
         * @method setValue
         * @param {} _value
         * @memberOf Flag
*/
        function setValue(_value)
        {
            value = _value;
        }

        //Public interface
        return {
            getName: getName,
            getValue: getValue,

            setName: setName,
            setValue: setValue
        }

    }

	return Flag;
});
