/*
 This module is responsible to register every screen used in this application, in this case a game.

 @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage" ], function( Stage ) {
    console.groupCollapsed("Stage Config:");

    Stage.setHtmlPath("../html/screens/");
    Stage.setControllersPath("./menu/");
    Stage.setStartingScreenId( 0 );

// 0
    Stage.registerScreen("mainMenu", "mainMenu.html", "screen_mainMenu_controller");
// 1
    Stage.registerScreen("game", "gameContainer.html", "screen_game_controller");
// 2
    Stage.registerScreen("loadGame", "loadGame.html", "screen_loadGame_controller");
// 3
    Stage.registerScreen("credits", "credits.html", "screen_credits_controller");
// 4
    Stage.registerScreen("configuration", "configuration.html", "screen_configuration_controller");
// 5
    Stage.registerScreen("newGameSlotSelect", "newGameSlotSelect.html", "screen_newGameSlotSelect_controller");
// 6
    Stage.registerScreen("levelSelect", "levelSelect.html", "screen_levelSelect_controller");
// 7
    Stage.registerScreen("conteudo", "conteudo.html", "screen_conteudo_controller");

    console.groupEnd();
});
