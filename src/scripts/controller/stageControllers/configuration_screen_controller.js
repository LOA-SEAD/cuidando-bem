/**
 *
 * @name Configuration Screen Controller
 * @module
 */
define(['stage'], function(stage){
	function load()
	{
		$('.backButton').click(function()
		{
			stage.changeScreen(0);
		});
	}

	function unload()
	{
		
	}

	return {
		load: load,
		unload: unload,
	}

});