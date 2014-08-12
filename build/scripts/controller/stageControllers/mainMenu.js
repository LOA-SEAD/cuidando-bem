define(['stage'], function(stage){
	function load()
	{
		;
		$($('.menuButton')[0]).click(function()
		{
			;
			stage.changeScreen(1);
		});

		$($('.menuButton')[1]).click(function()
		{
			;
			stage.changeScreen(2);
		});

		$($('.menuButton')[2]).click(function()
		{
			;
			stage.changeScreen(3);
		});

		$($('.menuButton')[3]).click(function()
		{
			;
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