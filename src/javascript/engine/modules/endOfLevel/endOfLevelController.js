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
 *
 * @name EndOfLevel
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([
    "text!../html/end_of_level/endOfLevel.html",
    "text!../html/end_of_level/scoreItemTemplate.html"
  ],
  function( html, scoreItemHtml ) {

// Attributes

    var Stage = require("Stage");
    var modalSelector = "#endOfLevel";
    var scoreListSelector = "#scoreList";
    var scoreListBodySelector = "#scoreList_tbody";

    var titleSelector = ".title";
    var scoreSelector = ".score";

    var isOpen = false;

    var Player = require("Player");
// Methods
    // Init
    /**
     * Description
     * @method init
     * @memberOf module:EndOfLevel
     */
    function init( selector ) {
      $( selector ).append( html );

      $(".goToMenu").click(function() {
        isOpen = false;
        Stage.changeScreen( 6 );
        Player.playInLoop( Player.audios.musics.menu );
      });

      $(".playAgain").click(function() {
        var core = require("CuidandoBem");

        core.restartLevel();
      });
    }

    function show( _scoreList, max ) {
      if ( !isOpen ) {
        $( modalSelector ).show();

        var actualScore = 0;
        for ( i = 0; i < _scoreList.length; i++ ) {
          var scoreItem = _scoreList[ i ];

          var element = $( $( scoreItemHtml )[ 0 ] );
          var score = $( scoreSelector, element );
          var title = $( titleSelector, element );

          score.html( scoreItem.score );
          title.html( scoreItem.title );

          actualScore += scoreItem.score;

          $( scoreListSelector ).append( element );
        }
        var percent = Math.floor( (actualScore / max) * 100 );

        $(".percent").text( percent + "%");
        $(".fill").css("width", percent + "%");

        isOpen = true;
      }
    }

    function close() {
      $( scoreListBodySelector ).empty();
      $( modalSelector ).hide();
      isOpen = false;
    }

// Getters
// Setters
// Public Interface
    return {
      init: init,
      show: show,
      close: close
    };

  });
