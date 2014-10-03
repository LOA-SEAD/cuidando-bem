define(['stage', 'core'], function(stage, core){
	function load()
	{
		console.log("Configuring main menu listeners");
		$($('.menuButton')[0]).click(function()
		{
			console.log(this);
			stage.changeScreen(1);
			//core.start();
		});

		$($('.menuButton')[1]).click(function()
		{
			console.log(this);
			stage.changeScreen(2);
		});

		$($('.menuButton')[2]).click(function()
		{
			console.log(this);
			stage.changeScreen(4);
		});

		$($('.menuButton')[3]).click(function()
		{
			console.log(this);
			stage.changeScreen(3);
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