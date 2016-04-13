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
 * @name Scene
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "text!../html/scenes/scene.html" ], function( html ) {


// Attributes
// Methods
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
        $("#backgroundScene").attr("class", _scene.getCssClass() );
    }

// Getters
// Setters
// Public Interface
    return {
        init: init,
        changeScene: changeScene,
        setScene: setScene
    };

});
