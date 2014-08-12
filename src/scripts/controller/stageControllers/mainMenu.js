define(['stage'], function(stage){
	function load()
	{
		console.log("Configuring main menu listeners");
		$($('.menuButton')[0]).click(function()
		{
			console.log(this);
			stage.changeScreen(1);
		});

		$($('.menuButton')[1]).click(function()
		{
			console.log(this);
			stage.changeScreen(2);
		});

		$($('.menuButton')[2]).click(function()
		{
			console.log(this);
			stage.changeScreen(3);
		});

		$($('.menuButton')[3]).click(function()
		{
			console.log(this);
			stage.changeScreen(2);
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