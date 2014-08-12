/*
    The stateMachine will be a module responsible to handle all the game variables and its mechanics.

    
*/

define(['core'], function(core)
{

//Variables
	var scenes = [];
	var auxScenes = [];
	var currentScene;

	var modalScenes = [];
	var auxModalScenes = [];

	var interactiveObjects = [];

	var levels = [];
	var currentLevel;


//functions
//Scene
	function addScene(scene)
	{
		auxScenes[scene.getName().toLowerCase()] = scenes.length;
		scenes.push(scene);

		//Log
		;
	}

	function setCurrentScene (scene)
	{
		;
		currentScene = getScene(scene);
	}

	function getCurrentLevel()
	{
		return currentScene;
	}

	function getScene(toFind)
	{
		if(typeof toFind === 'number')
		{
			return scenes[toFind];
		}else if(typeof toFind === 'string')
		{
			return scenes[auxScenes[toFind.toLowerCase()]];
		}else
		{
			return false;
		}
	}

//modalScene
//interactiveObjects
//levels
	function addLevel(level)
	{
		levels.push(level);

		//Log
		;
	}

	function setCurrentLevel(level)
	{
		currentLevel = levels[level];
	}

	function startCurrentLevel()
	{
		;
		currentLevel();
	}

	function nextLevel()
	{

	}

	function getCurrentLevel()
	{

	}

	return {

		addScene: addScene,
		getScenes: function (){return scenes},
		getScene: getScene,
		setCurrentScene: setCurrentScene,

		addLevel: addLevel,
		setCurrentLevel: setCurrentLevel,
		startCurrentLevel: startCurrentLevel,
		nextLevel: nextLevel,
	}
});
