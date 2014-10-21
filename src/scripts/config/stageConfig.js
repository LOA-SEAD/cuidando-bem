define(['stage'], function(stage){
    L.group("Stage Config:", true);

	stage.setHtmlPath('../html/screens/');
	stage.setControllersPath('../scripts/controller/stageControllers/');

	stage.addScreen('mainMenu', 'mainMenu.html', 'mainMenu_screen_controller');
	stage.addScreen('game', 'gameContainer.html', 'game_screen_controller');
	stage.addScreen('loadGame', 'loadGame.html', 'loadGame_screen_controller');
	stage.addScreen('credits', 'credits.html', 'credits_screen_controller');
	stage.addScreen('configuration', 'configuration.html', 'configuration_screen_controller');

    L.groupEnd();
});