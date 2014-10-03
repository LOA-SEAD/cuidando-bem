define([], function()
{
	return function Flag(name, value)
	{
		//Attributes

		var name = name;
		var value = value;	
		
		//Methods
		
		//Getters

		function getName()
		{
			return name;
		}		

		function getValue()
		{
			return value;
		}
		
		//Setters

		function setName(_name)
		{
			name = _name;
		}

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

});
