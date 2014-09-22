define(['stage', 'core'], function(stage, core){
	function load()
	{
		;
		$($('.menuButton')[0]).click(function()
		{
			;
			stage.changeScreen(1);
			core.start();
		});

		$($('.menuButton')[1]).click(function()
		{
			;
			stage.changeScreen(2);
		});

		$($('.menuButton')[2]).click(function()
		{
			;
			stage.changeScreen(4);
		});

		$($('.menuButton')[3]).click(function()
		{
			;
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