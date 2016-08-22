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
 * @name InteractiveObject
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([
    "text!../html/interactiveObject/interactiveObjects.html",
    "text!../html/interactiveObject/interactiveObjectTemplate.html",
    "IsMobile"
  ],
  function( html, interactiveObjectTemplate, isMobile ) {
// Attributes
    var divSelector = "#interactiveObjects";
    var interactiveObjectSelector = ".interactiveObject";

// Methods
    /**
     * Description
     * @method init
     *
     * @memberOf module:InteractiveObject
     */
    function init( selector ) {
      $( selector ).append( html );
    }

    /**
     * Description
     * @method addAllInteractiveObjects
     * @param {} _interactiveObjects
     *
     * @memberOf module:InteractiveObject
     */
    function addAllInteractiveObjects( _interactiveObjects ) {
      console.group("Adding Interactive Objects:", true );

      var i;
      for ( i = 0; i < _interactiveObjects.length; i++ ) {
        console.log("Adding interactive object #" + i + ": " + _interactiveObjects[ i ].getName() );
        var interactiveObject = _interactiveObjects[ i ];
        addInteractiveObject( interactiveObject );
      }

      console.groupEnd();
    }

    /**
     * Description
     * @method changeToInteractiveObjects
     * @param {} _interactiveObjects
     *
     * @memberOf module:InteractiveObject
     */
    function changeToInteractiveObjects( _interactiveObjects ) {
      removeAllInteractiveObjects();
      addAllInteractiveObjects( _interactiveObjects );
    }


    /**
     * Description
     * @method addInteractiveObject
     * @param {} _interactiveObject
     *
     * @memberOf module:InteractiveObject
     */
    function addInteractiveObject( _interactiveObject ) {
      var element = $( $( interactiveObjectTemplate )[ 0 ] );

      element.attr("title", _interactiveObject.getName() );
      // element.attr("aria-label", _interactiveObject.getName() );
      element.attr("id", _interactiveObject.getId() );
      element.addClass( _interactiveObject.getCssClass() );

      element.on("screenReader", function() {
        $(".jqhover").removeClass("jqhover");
        $( this ).addClass("jqhover");
        $("#accessible_log").empty();
        $("<span>" + _interactiveObject.getName() + "</span><br>").appendTo("#accessible_log");
      });

      element.tooltip({
        // disabled: true,
        tooltipClass: "interactiveObject-ui-tooltip",
        show: {
          duration: 200
        },
        position: {
          within: "#stage",
          of: "#stage",
          my: "center top",
          at: "center top+5%"
        }
      });
      if ( _interactiveObject.isEnabled() ) {
        addClickToElement( element, _interactiveObject );
      } else {
        element.addClass("disabled");
        element.tooltip("option", "disabled", true );
      }

      $( divSelector ).append( element );
      if ( !_interactiveObject.isVisible() ) {
        element.hide();
      }
    }

    /**
     * Description
     * @method removeAllInteractiveObjects
     *
     * @memberOf module:InteractiveObject
     */
    function removeAllInteractiveObjects() {
      $( divSelector ).empty();
    }

    /**
     * Description
     * @method removeInteractiveObject
     * @param {} _interactiveObject
     *
     * @memberOf module:InteractiveObject
     */
    function removeInteractiveObject( _interactiveObject ) {
      $("#" + _interactiveObject.getId() ).remove();
    }

    /**
     * Description
     * @method activateInteractiveObject
     * @param {} _interactiveObject
     *
     * @memberOf module:InteractiveObject
     */
    function enableInteractiveObject( _interactiveObject ) {
      var selector = "#" + _interactiveObject.getId();
      var element = $( selector );
      addClickToElement( element, _interactiveObject );
    }

    /**
     * Description
     * @method deactivateInteractiveObject
     * @param {} _interactiveObject
     *
     * @memberOf module:InteractiveObject
     */
    function disableInteractiveObject( _interactiveObject ) {
      var selector = "#" + _interactiveObject.getId();
      var element = $( selector );
      element.removeClass("enabled");
      element.addClass("disabled");
      element.unbind("click");
      element.tooltip("option", "disabled", true );

    }

    function addClickToElement( element, _interactiveObject ) {
      // if ( !isMobile.isMobile() ) {
      //   element.click({ iofunc: _interactiveObject.getFunction() }, function( event ) {
      //     if ( $( this ).is(":focus") ) {
      //       event.data.iofunc();
      //     } else {
      //       $( this ).tooltip("open");
      //       $( this ).focus();
      //     }
      //   });
      // } else {
      element.click( _interactiveObject.getFunction() );
      element.removeClass("disabled");
      element.addClass("enabled");
      element.tooltip("option", "disabled", false );
    }

    /**
     * Description
     * @method activateAllInteractiveObjects
     * @param {} _interactiveObjects
     *
     * @memberOf module:InteractiveObject
     */
    function enableAllInteractiveObjects( _interactiveObjects ) {
      console.group("Enabling interactiveObjects", true );
      var i;

      for ( i = 0; i < _interactiveObjects.length; i++ ) {
        console.log("InteractiveObject to be enabled " + i + ": " + _interactiveObjects[ i ].getName() );
        var action = _interactiveObjects[ i ];
        enableInteractiveObject( action );
      }
      console.groupEnd();
    }

    /**
     * Description
     * @method deactivateAllInteractiveObjects
     * @param {} _interactiveObjects
     *
     * @memberOf module:InteractiveObject
     */
    function disableAllInteractiveObjects( _interactiveObjects ) {
      console.group("Disabling interactiveObjects", true );
      var i;

      for ( i = 0; i < _interactiveObjects.length; i++ ) {
        console.log("InteractiveObject to be disabled " + i + ": " + _interactiveObjects[ i ].getName() );
        var action = _interactiveObjects[ i ];
        disableInteractiveObject( action );
      }
      console.groupEnd();
    }

    /**
     * Description
     * @method updateAllActionButtons
     * @param {} _interactiveObjects
     *
     * @memberOf module:InteractiveObject
     */
    function updateAllInteractiveObjects( _interactiveObjects ) {
      console.group("Updating interactiveObjects", true );
      var i;

      for ( i = 0; i < _interactiveObjects.length; i++ ) {
        console.log("InteractiveObject to be updated " + i + ": " + _interactiveObjects[ i ].getName() );
        var action = _interactiveObjects[ i ];
        if ( action.isEnabled() ) {
          enableInteractiveObject( action );
        } else {
          disableInteractiveObject( action );
        }
      }
      console.groupEnd();
    }

// Getters

// Setters
    /**
     * Description
     * @method setInteractiveObjectVisible
     * @param {} _interactiveObject
     * @param {} _value
     *
     * @memberOf module:InteractiveObject
     */
    function setInteractiveObjectVisible( _interactiveObject, _value ) {
      var selector = "#" + _interactiveObject.getId();

      if ( _value ) {
        $( selector ).show();
      } else {
        $( selector ).hide();
      }
    }

// Public Interface
    return {
      init: init,

      addInteractiveObject: addInteractiveObject,
      addAllInteractiveObjects: addAllInteractiveObjects,

      changeToInteractiveObjects: changeToInteractiveObjects,

      removeAllInteractiveObjects: removeAllInteractiveObjects,
      removeInteractiveObject: removeInteractiveObject,

      setInteractiveObjectVisible: setInteractiveObjectVisible,

      enableInteractiveObject: enableInteractiveObject,
      disableInteractiveObject: disableInteractiveObject,
      enableAllInteractiveObjects: enableAllInteractiveObjects,
      disableAllInteractiveObjects: disableAllInteractiveObjects,
      updateAllInteractiveObjects: updateAllInteractiveObjects
    };

  });
