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
/*

 This module register which files to load. Each of these files should contain a Level.

 @author Otho - Marcelo Lopes Lotufo
 */
define(function() {
    console.info("GameConfig - module loaded");
    var generalPath = "./game/scripts/levels/";
    var filePaths = [

        // "faseTeste"
        "testeEndOfLevel",
        "fase0",
        "fase1",
        "fase2",
        "fase3",
        "fase4",
        "fase5",
        "fase6",
        "fase7",
        "fase8",
        "fase9"

    ];

    var i;
    for ( i = 0; i < filePaths.length; i++ ) {
        console.log("\tRequiring Level module: ", filePaths[ i ] );
        require([ generalPath + filePaths[ i ] ]);
    }
});
