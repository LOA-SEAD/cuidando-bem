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

define(["text!../html/scenes/modalScene.html"],function(e){function i(t){$(t).append(e)}function s(e){r==""?$(t).addClass(e.getCssClass()):($(t).removeClass(r),$(t).addClass(e.getCssClass())),$(t).empty(),$(t).append(e.getTemplate()),r=e.getCssClass(),n=!0,$(t).show()}function o(){n=!1,$(t).hide()}function u(){return n}var t="#modalScene",n=!1,r="";return{init:i,close:o,open:s,isShowing:u}});