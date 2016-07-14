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
 * This method adds all the events to the loadGame screen
 *
 * @name Screen_loadGame_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage" ], function( Stage ) {

    // var Player = require("Player");
    var totalFilesToLoad = 0;
    var totalFilesLoaded = 0;

    var preloading = true;

    /**
     * This method is called when the screen loadGame is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_loadGame_Controller
     */
    function load() {

    }

    /**
     * This method is called when the screen loadGame is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_loadGame_Controller
     */
    function unload() {

    }

    function setTotalFiles( total ) {
      totalFilesToLoad = total;
    }
    function fileLoaded() {
      // if ( preloading ) {
        totalFilesLoaded++;
        console.log( totalFilesLoaded + "/" + totalFilesToLoad );

        var percent = Math.floor( (totalFilesLoaded / totalFilesToLoad) * 100 );

        $(".preloaderPercent").text( percent + "%" );
        $(".preloaderFill").css("width", percent + "%");

        if ( percent >= 100 ) {
          Stage.changeScreen( 0 );
          preloading = false;
        }
      // }
    }

    return {
        load: load,
        unload: unload,

        setTotalFiles: setTotalFiles,
        fileLoaded: fileLoaded
    };

});
