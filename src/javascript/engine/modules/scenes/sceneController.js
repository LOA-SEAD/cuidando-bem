/**
 *
 * @name Scene
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "text!../html/scenes/scene.html" ], function( html ) {


//Attributes
//Methods
    function init( selector ) {
        $( selector ).append( html );
    }

    /**
     * Description
     * @method changeScene
     * @param {} _newScene
     * @memberOf module:Scene
     */
    function changeScene( _newScene ) {
        setScene( _newScene );
    }

    /**
     * Description
     * @method setScene
     * @param {} _scene
     * @memberOf module:Scene
     */
    function setScene( _scene ) {
        $( "#backgroundScene" ).attr( "class", _scene.getCssClass() );
    }

//Getters
//Setters
//Public Interface
    return {
        init: init,
        changeScene: changeScene,
        setScene: setScene
    };

});
