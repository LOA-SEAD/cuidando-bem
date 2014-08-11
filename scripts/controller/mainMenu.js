define([], function(){
	function load()
	{
		console.log("Configuring main menu listeners");
		$('.menuButton').click(function()
		{
			console.log(this);
		});
	}

	function unload()
	{
		//$('.menuButton')

	}

	return {
		load: load,
		unload: unload,
	}

});