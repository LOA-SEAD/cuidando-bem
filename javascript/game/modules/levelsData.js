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
define([], function() {
    /**
     * @module LevelsData
     *
     * @author Otho - Marcelo Lopes Lotufo
     */
// Attributes
    /**
     * This object stores all Level data for the game
     * @private
     * @type {object}
     *
     * @memberOf module:LevelsData
     */
    var levels = {};
    /**
     * This var stores the current level
     * @private
     * @type {(string|int)}
     *
     * @memberOf module:LevelsData
     */
    var currentLevel = 0;

    var maxGameScore = 0;

// Methods
    /**
     * This function stores a level data in the levels object
     * @method registerLevel
     * @param {Level} _level
     * @param _id
     * @public
     *
     * @memberOf module:LevelsData
     */
    function registerLevel( _level, _id ) {
        if ( levels[ _id ] != null ) {

        }

        levels[ _id ] = _level;

        maxGameScore += _level.getMaxPoints();

        // Log
 );
    }

// Getters
    /**
     * @method getCurrentLevel
     * @return {Level} MemberExpression
     * @public
     *
     * @memberOf module:LevelsData
     */
    function getCurrentLevel() {
        return levels[ currentLevel ];
    }

    function getCurrentLevelId() {
        return currentLevel;
    }

    function getMaxGameScore() {
        return maxGameScore;
    }

// Setters
    /**
     * @method setCurrentLevel
     * @param {(string|number)} _level
     * @public
     *
     * @memberOf module:LevelsData
     */
    function setCurrentLevel( _level ) {
        currentLevel = _level;
    }

// Public Interface
    return {
        registerLevel: registerLevel,

        getCurrentLevel: getCurrentLevel,
        getCurrentLevelId: getCurrentLevelId,

        getMaxGameScore: getMaxGameScore,

        setCurrentLevel: setCurrentLevel
    };
});
