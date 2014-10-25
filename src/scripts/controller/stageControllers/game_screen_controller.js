/**
 *
 * @name Game Screen Controller
 * @module
 */
define(['stage', 'core'], function(stage, core){
	function load()
	{
		$('.backButton').click(function(){
			stage.changeScreen(0);
		});

        core.start();
	}

	function unload()
	{
		
	}

	return {
		load: load,
		unload: unload
	}

});