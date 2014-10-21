define(['stage', 'core'], function(stage, core){
	function load()
	{
		L.log("Configuring main menu listeners");
		$($('.menuButton')[0]).click(function()
		{
			L.log(this);
			stage.changeScreen(1);
			//core.start();
		});

		$($('.menuButton')[1]).click(function()
		{
			L.log(this);
			stage.changeScreen(2);
		});

		$($('.menuButton')[2]).click(function()
		{
			L.log(this);
			stage.changeScreen(4);
		});

		$($('.menuButton')[3]).click(function()
		{
			L.log(this);
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