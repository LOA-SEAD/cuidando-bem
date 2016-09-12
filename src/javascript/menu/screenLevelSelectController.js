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
 * This method adds all the events to the levelSelect screen
 *
 * @name Screen_levelSelect_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage", "levelsData", "AccessibleNavigationMenus" ], function( Stage, game, Accessibility ) {

  var Player = require("Player");
  var Storage = require("Storage");
  var Dialogs = require("DialogsData");
  var Lib = require("Commons");

  var save;

  var text = "Selecione uma fase";

  var levelNames = [
    "1 - Identificação do Paciente",
    "2 - Prevenção de úlcera por pressão",
    "3 - Prevenção de quedas",
    "4 - Cirurgia segura",
    "5 - Medicação segura",
    "6 - Higienização das mãos",
    "7 - Infusão de dieta segura",
    "8 - Segurança na admnistração de medicação",
    "9 - Segurança em procedimentos cirúrgicos",
    "10 - Admnistração segura de medicação",
    "Contratação"
  ];

  /**
   * This method is called when the screen levelSelect is loaded
   *
   * @method load
   * @public
   *
   * @memberOf module:Screen_levelSelect_Controller
   */
  function load() {

    text = "Selecione uma fase";
    save = Storage.getLoadedSlot();

    // Change player name to save slot name
    Lib.characters.jogador.setName( save.name );


    var i;
    for ( i = 0; i < save.lastLevel; i++ ) {
      // reset button classes
      var button = $( $(".level")[ i ] );
      button.removeClass("completed");
      button.removeClass("failed");
      // Level completeness %
      var levelCompleteness = Storage.getLevelScoreSum( i ) / game.getLevelMaxScore( i + 1 );
      if ( levelCompleteness >= 0.75 ) {
        // se level >= 75%
        button.addClass("completed");
      } else {
        // se level < 75%
        button.addClass("failed");
      }
    }
    for ( i = save.lastLevel + 1; i < save.levels.length; i++ ) {
      $( $(".level")[ i ] ).addClass("disabled");
    }

    // $(".image", $(".level")[ save.lastLevel + 1 ] ).addClass("next");

    if ( save.lastLevel >= 10 ) {
      $( $(".level")[ 10 ] ).removeClass("disabled");
      if ( Storage.hasSeenCredits() ) {
        $( $(".level")[ 10 ] ).addClass("completed");
      }
    } else {
      $( $(".level")[ 10 ] ).addClass("disabled");
    }

    // adding the name of each level by attributes aria-label
    for ( var j = 0; j < levelNames.length; j++ ) {
      $(".l" + j ).attr("aria-label", "Fase " + levelNames[ j ] );
    }

    $(".menuButton").click(function() {
      Player.play( Player.audios.sfx.selecionarMenu );
    });

    $(".backButton").click(function() {
      Stage.changeScreen( 5 );
    });

    $(".level").click(function() {
      var index = $(".level").index( this );
      var levelId = index + 1;

      if ( levelId <= save.lastLevel + 1 ) {
        text = levelNames[ index ];
        $("p.title").text( text );

        if ( $( this ).hasClass("selected") ) {
          if ( index != 10 ) {
            game.setCurrentLevel( levelId );
            Stage.changeScreen( 1 );
          } else {
            var scoreSum = Storage.getScoreSum();
            var scoreMax = game.getMaxGameScore();

            var completeness = scoreSum / scoreMax;
            if ( completeness >= 0.75 ) {
              Stage.changeScreen( 8 );
            } else {
              Stage.changeScreen( 9 );
            }
          }
        } else {
          $(".level").removeClass("selected");
          $( this ).addClass("selected");
        }
      }
    });

    $(".level").hover(
      function() {
        $(".level").css("z-index", "1");
        $( this ).css("z-index", "3");
        var index = $(".level").index( this );
        var levelId = index;

        // Som para quando o mouse é passado por cima
        Player.play( Player.audios.sfx.passarMouse );

        if ( levelId <= save.lastLevel ) {
          $("p.title").text( levelNames[ index ] );
        }
      },
      function() {
        var index = $(".level").index( this );
        var levelId = index;

        if ( levelId <= save.lastLevel ) {
          $("p.title").text( text );
        }
      }
    );

    Accessibility.startAccessibleNavigationMenus();

  }

  /**
   * This method is called when the screen levelSelect is unloaded
   *
   * @method unload
   * @public
   *
   * @memberOf module:Screen_levelSelect_Controller
   */
  function unload() {

  }

  return {
    load: load,
    unload: unload
  };

});
