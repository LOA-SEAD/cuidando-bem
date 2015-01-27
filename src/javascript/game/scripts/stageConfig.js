define(['Stage'], function (Stage) {
    console.groupCollapsed("Stage Config:");

    Stage.setHtmlPath('../assets/html/screens/');
    Stage.setControllersPath('./menu/');
    Stage.setStartingScreenId(0);

    Stage.addScreen('mainMenu', 'mainMenu.html', 'mainMenu_screen_controller');
    Stage.addScreen('game', 'gameContainer.html', 'game_screen_controller');
    Stage.addScreen('loadGame', 'loadGame.html', 'loadGame_screen_controller');
    Stage.addScreen('credits', 'credits.html', 'credits_screen_controller');
    Stage.addScreen('configuration', 'configuration.html', 'configuration_screen_controller');
    Stage.addScreen('newGameSlotSelect', 'newGameSlotSelect.html', 'newGameSlotSelect_screen_controller');
    Stage.addScreen('levelSelect', 'levelSelect.html', 'levelSelect_screen_controller');

    console.groupEnd();
});