/*
 This file is part of Cuidando Bem.

 Cuidando Bem is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Cuidando Bem is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Cuidando Bem.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * This method adds all the events to the Game screen
 *
 * @name Screen_game_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage", "AccessibleNavigationMenus", "CuidandoBem", "text!../../html/screens/configuration.html", "./screenConfigurationController" ], function( Stage, Accessibility, Core, configHtml, configCon ) {

  var Player = require("Player");

  /**
   * This method is called when the screen Game is loaded
   *
   * @method load
   * @public
   *
   * @memberOf module:Screen_game_Controller
   */
  function load() {

    $("#configMenu").append( configHtml );
    configCon.load(function() {
      Player.play( Player.audios.sfx.selecionarMenu );
      $("#configMenu").hide();
    });
    // $(".menuButton").click(function() {
    //     Player.play( Player.audios.sfx.selecionarMenu );
    // });

    // $(".backButton").click(function() {
    //     Player.play( Player.audios.sfx.selecionarMenu );
    //     Stage.changeScreen( 0 );
    // });

    $("#pauseButton").click(function() {
      Player.play( Player.audios.sfx.selecionarMenu );
      $("#pauseMenu").toggle();
    });

    $(".quit.button").click(function() {
      Player.stopAll();
      Player.play( Player.audios.sfx.selecionarMenu );
      Player.playInLoop( Player.audios.musics.menu );
      Stage.changeScreen( 6 );
    });

    $(".replay.button").click(function() {
      Player.play( Player.audios.sfx.selecionarMenu );
      Core.restartLevel();
      $("#pauseMenu").hide();
    });

    $(".config.button").click(function() {
      Player.play( Player.audios.sfx.selecionarMenu );
      $("#pauseMenu").toggle();
      $("#configMenu").show();
    });

    $(".back.button").click(function() {
      Player.play( Player.audios.sfx.selecionarMenu );
      $("#pauseMenu").hide();
    });

    Player.stopAll();
    Core.init();

    Accessibility.startAccessibleNavigationMenus();
  };

  /**
   * This method is called when the screen Game is unloaded
   *
   * @method unload
   * @public
   *
   * @memberOf module:Screen_game_Controller
   */
  function unload() {

  }

  return {
    load: load,
    unload: unload
  };

});
