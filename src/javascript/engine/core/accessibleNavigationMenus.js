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
 * This method adds accessible navigation to menus
 *
 * @name accessible_Navigation_Menus
 * @module
 *
 * @author wellyfr - Wellyson Freitas
 */

 define(function() {

    // Accessibility
    var navigationList = null;
    var i = 0;
    // TODO: avoid duplication
    const KEYCODE_ARROW_LEFT = 37;
    const KEYCODE_ARROW_UP = 38;
    const KEYCODE_ARROW_RIGHT = 39;
    const KEYCODE_ARROW_DOWN = 40;
    const KEYCODE_ENTER = 13;
    const KEYCODE_P = 80;
    const KEYCODE_ONE = 49;
    const KEYCODE_TWO = 50;
    const KEYCODE_THREE = 51;

    /**
     * Description
     * @method menuSweepScreen
     * @memberOf module:Screen_Accessible_Navigation_Menus
     */
    function menuSweepScreen() {

        var slotsList = null;
        var levelsList = null;
        var controlsList = null;
        var buttonsList = null;
        
        navigationList = $( ".menuButton:visible" );

        if( $( "#slotsContainer" ).is( ":visible" ) ){
            slotsList = $( "#slotsContainer .slot:visible" );
        }
        if( $( "#levelSelector"  ).is( ":visible" ) ){
            levelsList = $( "#levelSelector button:visible[class!='disabled']" );
        }
        if( $( "#musicControls"  ).is( ":visible" ) ){
            controlsList = $( "#musicControls .ui-slider-handle" );
        }
        if( $( ".ui-dialog"      ).is( ":visible" ) ){
            buttonsList = $( ".ui-dialog button" );
        }

        // merges
        if( slotsList    != null ){
            navigationList.push.apply(navigationList, slotsList);
        }
        if( levelsList   != null ){
            navigationList.push.apply(navigationList, levelsList);
        }
        if( controlsList != null ){
            navigationList.push.apply(navigationList, controlsList);
        }
        if( buttonsList != null ){
            navigationList.push.apply(navigationList, buttonsList);
        }

    }

    /**
     * Description
     * @method menuNavigation
     * @param {} _keycode
     * @memberOf module:Screen_Accessible_Navigation_Menus
     */
    function menuNavigation( keycode ) {

        menuSweepScreen();

        if( navigationList != null ){
            if( keycode == KEYCODE_ARROW_DOWN ){
                if( i >= navigationList.length - 1 ){
                    i = 0;
                }
                else{
                    i++;
                }
                $( navigationList[i] ).focus();
                return false;
            }

            else if( keycode == KEYCODE_ARROW_UP ){
                if( i > 0 ){
                    i--;
                }
                else{
                    i = navigationList.length - 1;
                }
                $( navigationList[i] ).focus();
                return false;
            }

            else if( keycode == KEYCODE_ENTER ){
                if( i != -1 ){
                   $( navigationList[i] ).click();
                   return false;
                }
            }
        }
    }

    /**
     * Description
     * @method startAccessibleNavigationMenus
     * @memberOf module:Screen_Accessible_Navigation_Menus
     */

    function startAccessibleNavigationMenus() {

        //$( window ).off( "keydown" );

        $( window ).on( "keydown", function( e ){
            return menuNavigation( e.which );
        });
    }

    return {

        menuSweepScreen: menuSweepScreen,
        menuNavigation: menuNavigation,
        startAccessibleNavigationMenus: startAccessibleNavigationMenus

    };

 });