/*

This module is responsible to register every screen used in this application, in this case a game.

@author Otho - Marcelo Lopes Lotufo
 */
define(['Stage'], function (Stage) {
    console.groupCollapsed("Stage Config:");

    Stage.setHtmlPath('../assets/html/screens/');
    Stage.setControllersPath('./menu/');
    Stage.setStartingScreenId(0);

    Stage.registerScreen('mainMenu', 'mainMenu.html', 'mainMenu_screen_controller');
    Stage.registerScreen('game', 'gameContainer.html', 'game_screen_controller');
    Stage.registerScreen('loadGame', 'loadGame.html', 'loadGame_screen_controller');
    Stage.registerScreen('credits', 'credits.html', 'credits_screen_controller');
    Stage.registerScreen('configuration', 'configuration.html', 'configuration_screen_controller');
    Stage.registerScreen('newGameSlotSelect', 'newGameSlotSelect.html', 'newGameSlotSelect_screen_controller');
    Stage.registerScreen('levelSelect', 'levelSelect.html', 'levelSelect_screen_controller');

    console.groupEnd();
});