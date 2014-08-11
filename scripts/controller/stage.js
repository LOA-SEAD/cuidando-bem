define(['text!../html/container.html'], function(container)
{
	function start(id)
	{
		$('#'+id).append(container);
	}

	function Screen(_name, _htmlPage, _controllerName)
	{
		var name = _name;
		var htmlPage = _htmlPage;
		var controllerName = _controllerName;

		function getHtmlPage()
		{			
			return htmlPage;
		}

		function getControllerName()
		{
			return controllerName;
		}

		return {
			getHtmlPage: getHtmlPage,
			getControllerName: getControllerName,
		}
	}

	var screens = [];
	var path = '../html/';



	function addScreen (_name, _htmlPage, _controller)
	{
		screens.push(new Screen(_name, _htmlPage, _controller));
	}

	function changeScreen(nextScreenId)
	{
		var nextScreen = screens[nextScreenId];

		console.log('text!'+path+nextScreen.getHtmlPage());

		

		require(['text!'+path+nextScreen.getHtmlPage(), nextScreen.getControllerName()], function (page, controller)
		{			
			console.log(nextScreen.getControllerName());
			$('#stage').empty();
			$('#stage').append(page);
			controller.load();
		});	
	}

	return {

		start: start,
		addScreen: addScreen,
		changeScreen: changeScreen,
	}
});