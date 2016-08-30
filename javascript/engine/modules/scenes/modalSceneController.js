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

define(["text!../html/scenes/modalScene.html"],function(e){function s(s){$(s).append(e)}function n(e){""==i?$(l).addClass(e.getCssClass()):($(l).removeClass(i),$(l).addClass(e.getCssClass())),$(l).empty(),$(l).append(e.getTemplate()),i=e.getCssClass(),o=!0,$(l).show()}function t(){o=!1,$(l).hide()}function a(){return o}var l="#modalScene",o=!1,i="";return{init:s,close:t,open:n,isShowing:a}});