/**
 *
 * @name Credits_Screen_Controller
 * @module
*/
define(['stage'], function(stage){
	/**
	 * Description
	 * @method load
	 * @memberOf module:Credits_Screen_Controller
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
	 * @memberOf module:Credits_Screen_Controller
*/
	function unload()
	{
		
	}

	return {
		load: load,
		unload: unload,
	}

});