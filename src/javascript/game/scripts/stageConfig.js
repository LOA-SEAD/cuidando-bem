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
    Stage.registerScreen("mainMenu", "mainMenu.html", "screenMainMenuController");
// 1
    Stage.registerScreen("game", "gameContainer.html", "screenGameController");
// 2
    Stage.registerScreen("loadGame", "loadGame.html", "screenLoadGameController");
// 3
    Stage.registerScreen("credits", "credits.html", "screenCreditsController");
// 4
    Stage.registerScreen("configuration", "configuration.html", "screenConfigurationController");
// 5
    Stage.registerScreen("newGameSlotSelect", "newGameSlotSelect.html", "screenNewGameSlotSelectController");
// 6
    Stage.registerScreen("levelSelect", "levelSelect.html", "screenLevelSelectController");
// 7
    Stage.registerScreen("conteudo", "conteudo.html", "screenConteudoController");

    console.groupEnd();
});
