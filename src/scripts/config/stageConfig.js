define(['stage'], function(stage){
	stage.setHtmlPath('../html/screens/');
	stage.setControllersPath('../scripts/controller/stageControllers/');

	stage.addScreen('mainMenu', 'mainMenu.html', 'mainMenu');
	stage.addScreen('game', 'gameContainer.html', 'game');
	stage.addScreen('loadGame', 'loadGame.html', 'loadGame');
	stage.addScreen('credits', 'credits.html', 'credits');
	stage.addScreen('configuration', 'configuration.html', 'configuration');

});