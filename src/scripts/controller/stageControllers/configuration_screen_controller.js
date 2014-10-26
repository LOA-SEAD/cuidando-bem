/**
 *
 * @name Configuration_Screen_Controller
 * @module
*/
define(['stage'], function(stage){
	/**
	 * Description
	 * @method load
	 * @memberOf module:Configuration_Screen_Controller
*/
	function load()
	{
		$('.backButton').click(function()
		{
			stage.changeScreen(0);
		});
	}

	/**
	 * Description
	 * @method unload
	 * @memberOf module:Configuration_Screen_Controller
*/
	function unload()
	{
		
	}

	return {
		load: load,
		unload: unload,
	}

});