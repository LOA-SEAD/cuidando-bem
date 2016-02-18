/**
 *
 * @name InteractiveObject
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([
        "text!../html/interactiveObject/interactiveObjects.html",
        "text!../html/interactiveObject/interactiveObjectTemplate.html"
    ],
    function( html, interactiveObjectTemplate ) {
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
        element.attr("id", _interactiveObject.getId() );
        element.addClass( _interactiveObject.getCssClass() );

        element.tooltip({
            // disabled: true,
            tooltipClass: "interactiveObject-ui-tooltip",
            show: {
                duration: 200
            },
            position: {
                within: "#stage",
                of: "#gameStage",
                my: "center top",
                at: "center top+20"
            }
        });
        if ( _interactiveObject.isEnabled() ) {
            element.addClass("enabled");
            element.click( _interactiveObject.getFunction() );
            element.tooltip("option", "disabled", false );
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
        element.removeClass("disabled");
        element.addClass("enabled");
        element.click( _interactiveObject.getFunction() );
        element.tooltip("option", "disabled", false );
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
