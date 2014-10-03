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
			getControllerName: getControllerName
		}
	}

	var screens = [];
	var htmlPath;
	var controllerPath;



	function addScreen (_name, _htmlPage, _controller)
	{
		;
		screens.push(new Screen(_name, _htmlPage, _controller));
	}

	function changeScreen(nextScreenId)
	{
		var nextScreen = screens[nextScreenId];

		//;

		

		require(['text!'+htmlPath+nextScreen.getHtmlPage(), controllerPath+nextScreen.getControllerName()], function (page, controller)
		{			
			;
			$('#stage').empty();
			$('#stage').append(page);
			controller.load();
		});	
	}

	function setHtmlPath(path)
	{
		htmlPath = path;
	}

	function setControllersPath(path)
	{
		controllerPath = path;
	}

	return {

		start: start,
		addScreen: addScreen,
		changeScreen: changeScreen,

		setHtmlPath: setHtmlPath,
		setControllersPath: setControllersPath,
	}
});