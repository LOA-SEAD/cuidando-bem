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
 * @name Pulseira_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "text!../html/pulseira/pulseira.html" ], function( html ) {

// Attributes
  /**
   * Description
   * @type {string}
   * @private
   *
   * @memberOf module:Pulseira_Controller
   */
  var divSelector = "#pulseira_modal";

  /**
   * Description
   * @type {string}
   * @private
   *
   * @memberOf module:Pulseira_Controller
   */
  var nameInputSelector = "#name_input";

  /**
   * Description
   * @type {boolean}
   * @private
   *
   * @memberOf module:Pulseira_Controller
   */
  var validName = false;

  /**
   * Description
   * @type {string}
   * @private
   *
   * @memberOf module:Pulseira_Controller
   */
  var leitoInputSelector = "#leito_input";

  /**
   * Description
   * @type {boolean}
   * @private
   *
   * @memberOf module:Pulseira_Controller
   */
  var validLeito = false;

  /**
   * Description
   * @type {string}
   * @private
   *
   * @memberOf module:Pulseira_Controller
   */
  var dataInputSelector = "#data_input";

  /**
   * Description
   * @type {boolean}
   * @private
   *
   * @memberOf module:Pulseira_Controller
   */
  var validData = false;

  /**
   * Description
   * @type {boolean}
   * @private
   *
   * @memberOf module:Pulseira_Controller
   */
  var showing = false;

  /**
   * Description
   * @type {regex}
   * @private
   *
   * @memberOf module:Pulseira_Controller
   */
  var nameRegExp;

  /**
   * Description
   * @type {regex}
   * @private
   *
   * @memberOf module:Pulseira_Controller
   */
  var leitoRegExp;

  /**
   * Description
   * @type {regex}
   * @private
   *
   * @memberOf module:Pulseira_Controller
   */
  var dataRegExp;

  var disabled = false;

  // Accessibility
  var navigationList = null;
  // TODO: avoid duplication
  const KEYCODE_ARROW_LEFT = 37;
  const KEYCODE_ARROW_UP = 38;
  const KEYCODE_ARROW_RIGHT = 39;
  const KEYCODE_ARROW_DOWN = 40;
  const KEYCODE_ARROW_TAB = 9;
  const KEYCODE_ENTER = 13;
  const KEYCODE_ESC = 27;
  const KEYCODE_ONE = 49;
  const KEYCODE_TWO = 50;
  const KEYCODE_THREE = 51;

// Methods
  // Init
  /**
   * Description
   * @method init
   * @memberOf module:Pulseira_Controller
   */
  function init( selector ) {
    $( selector ).append( html );
  }

  // Accessibility
  /**
   * Description
   * @method pulseiraSweepScreen
   * @memberOf module:Pulseira_Controller
   */
  function pulseiraSweepScreen() {

    if ( !$("#pauseMenu").is(":visible") ) {
      if ( $("#commandBar").is(":visible") ) {
        navigationList = $.merge(
          $("#pulseira_modal input:enabled"),
          $("#commandBar .action_button[class!='disabled']:visible")
        );
        return "inputsAndActions";
      } else {
        navigationList = $("#pulseira_modal input:enabled");
        return "inputsOnly";
      }
    } else {
      navigationList = $("#pauseMenu .button");
      return "pause";
    }
  }

  /**
   * Description
   * @method pulseiraNavigation
   * @param {} _keycode
   * @memberOf module:Pulseira_Controller
   */
  function pulseiraNavigation( _keycode ) {

    op = pulseiraSweepScreen();

    if ( _keycode == KEYCODE_ARROW_DOWN || _keycode == KEYCODE_ARROW_TAB ) {
      if ( i >= navigationList.length - 1 ) {
        i = 0;
      } else {
        i++;
      }

      if ( $( navigationList[ i ] ).hasClass("action_button") ) {
        $( navigationList[ i ] ).trigger("screenReader");
      } else {
        $( navigationList[ i ] ).focus();
      }

      return false;
    } else if ( _keycode == KEYCODE_ARROW_UP ) {
      if ( i > 0 ) {
        i--;
      } else {
        i = navigationList.length - 1;
      }

      if ( $( navigationList[ i ] ).hasClass("action_button") ) {
        $( navigationList[ i ] ).trigger("screenReader");
      } else {
        $( navigationList[ i ] ).focus();
      }

      return false;
    } else if ( _keycode == KEYCODE_ENTER ) {
      if ( $( navigationList[ i ] ).hasClass("action_button") ) {
        $( navigationList[ i ] ).click();
      }
      return false;
    } else if ( $("#pauseButton").is(":visible") && _keycode == KEYCODE_ESC ) {
      $("#pauseButton").click();
      return false;
    }
  }

  /**
   * Description
   * @method startAccessiblePulseiraNavigation
   * @memberOf module:Pulseira_Controller
   */

  var i = 0;
  var j = 0;

  function startAccessiblePulseiraNavigation() {

    $( window ).off("keydown");

    $( window ).on("keydown", function( e ) {

      if ( $("#dialogBar").is(":visible") && !$("#pauseMenu").is(":visible") ) {

        if ( e.which == KEYCODE_ARROW_UP && $(".dialog_reread").is(":visible") ) {
          $(".dialog_reread").click();
          return false;
        } else if ( e.which == KEYCODE_ARROW_DOWN && $(".dialog_right").is(":visible") ) {
          $(".dialog_right").click();
          return false;
        } else if ( e.which == KEYCODE_ONE && $(".dialog_button[value='1']").is(":visible") ) {
          $(".dialog_button[value='1']").click();
          return false;
        } else if ( e.which == KEYCODE_TWO && $(".dialog_button[value='2']").is(":visible") ) {
          $(".dialog_button[value='2']").click();
          return false;
        } else if ( e.which == KEYCODE_THREE && $(".dialog_button[value='3']").is(":visible") ) {
          $(".dialog_button[value='3']").click();
          return false;
        } else if ( $("#pauseButton").is(":visible") && e.which == KEYCODE_ESC ) {
          $("#pauseButton").click();
          return false;
        }

      } else {
        return pulseiraNavigation( e.which );
      }
    });
  }

  /**
   * Description
   * @method open

   * @memberOf module:Pulseira_Controller
   */
  function open() {
    console.info("Show Modal Scene");
    showing = true;
    $( divSelector ).show();
    $( dataInputSelector ).mask("00/00/0000");

    var data = $( dataInputSelector ).val().toLowerCase();
    var leito = $( leitoInputSelector ).val().toLowerCase();
    var name = $( nameInputSelector ).val().toLowerCase();

    $( dataInputSelector ).focus(function() {
      $("#accessible_log").empty();
      $("<span>Data de nascimento: " + data + ".</span><br>").appendTo("#accessible_log");
    });

    $( leitoInputSelector ).focus(function() {
      $("#accessible_log").empty();
      $("<span>Leito: " + leito + ".</span><br>").appendTo("#accessible_log");
    });

    $( nameInputSelector ).focus(function() {
      $("#accessible_log").empty();
      $("<span>Nome: " + name + ".</span><br>").appendTo("#accessible_log");
    });

    if ( $("#pulseira_modal input:first").is(":enabled") ) {
      $("#pulseira_modal input:first").focus();
    } else {
      $("#accessible_log").empty();
      $("<span>Nome: " + name + ".</span><br>").appendTo("#accessible_log");
      $("<span>Leito: " + leito + ".</span><br>").appendTo("#accessible_log");
      $("<span>Data de nascimento: " + data + ".</span><br>").appendTo("#accessible_log");
    }

    startAccessiblePulseiraNavigation();
  }

  /**
   * Description
   * @method close
   * @memberOf module:Pulseira_Controller
   */
  function close() {
    console.info("Close modal Scene");
    showing = false;
    $( divSelector ).hide();
  }

  function disable() {
    disable = true;

    $( dataInputSelector ).prop("disabled", true );
    $( leitoInputSelector ).prop("disabled", true );
    $( nameInputSelector ).prop("disabled", true );
  }

  function enable() {
    disable = false;

    $( dataInputSelector ).prop("disabled", false );
    $( leitoInputSelector ).prop("disabled", false );
    $( nameInputSelector ).prop("disabled", false );
  }

// Getters
  /**
   * Description
   * @method isShowing
   * @return showing
   * @memberOf module:Pulseira_Controller
   */
  function isShowing() {
    return showing;
  }

  /**
   * Description
   * @method isNameValid
   * @return validName
   * @memberOf module:Pulseira_Controller
   */
  function isNameValid() {
    return validName;
  }

  /**
   * Description
   * @method isDataValid
   * @return validData
   * @memberOf module:Pulseira_Controller
   */
  function isDataValid() {
    return validData;
  }

  /**
   * Description
   * @method isLeitoValid
   * @return validLeito
   * @memberOf module:Pulseira_Controller
   */
  function isLeitoValid() {
    return validLeito;
  }

  function isAllDataValid() {
    var valid = true;

    var data = $( dataInputSelector ).val().toLowerCase();
    var leito = $( leitoInputSelector ).val().toLowerCase();
    var name = $( nameInputSelector ).val().toLowerCase();

    valid = valid && nameRegExp.test( name );
    valid = valid && leitoRegExp.test( leito );
    valid = valid && dataRegExp.test( data );

    return valid;
  }

// Setters
  /**
   * Description
   * @method setNameRegExp
   * @param {regex} _nameRegExp
   *
   * @memberOf module:Pulseira_Controller
   */
  function setNameRegExp( _nameRegExp ) {
    nameRegExp = _nameRegExp;
    return this;
  }

  function setName( _name ) {
    $( nameInputSelector ).val( _name );
  }

  /**
   * Description
   * @method setDataRegExp
   * @param {regex} _dataRegExp
   *
   * @memberOf module:Pulseira_Controller
   */
  function setDataRegExp( _dataRegExp ) {
    dataRegExp = _dataRegExp;
    return this;
  }

  function setData( _data ) {
    $( dataInputSelector ).val( _data );
  }

  /**
   * Description
   * @method setLeitoRegExp
   * @param {regex} _leitoRegExp
   *
   * @memberOf module:Pulseira_Controller
   */
  function setLeitoRegExp( _leitoRegExp ) {
    leitoRegExp = _leitoRegExp;
    return this;
  }

  function setLeito( _leito ) {
    $( leitoInputSelector ).val( _leito );
  }

  function resetData() {
    setName("");
    setLeito("");
    setData("");

    enable();
  }


// Public Interface
  return {
    init: init,

    close: close,
    open: open,

    disable: disable,
    enable: enable,

    isShowing: isShowing,

    isNameValid: isNameValid,
    isDataValid: isDataValid,
    isLeitoValid: isLeitoValid,
    isAllDataValid: isAllDataValid,

    resetData: resetData,

    setNameRegExp: setNameRegExp,
    setDataRegExp: setDataRegExp,
    setLeitoRegExp: setLeitoRegExp,

    setName: setName,
    setLeito: setLeito,
    setData: setData
  };

});
