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

define(["text!../html/end_of_level/endOfLevel.html","text!../html/end_of_level/scoreItemTemplate.html"],function(e,t){function f(t){$(t).append(e),$(".goToMenu").click(function(){a=!1,n.changeScreen(6)}),$(".playAgain").click(function(){var e=require("CuidandoBem");e.restartLevel()})}function l(e){if(!a){$(r).show();for(i=0;i<e.length;i++){var n=e[i],f=$($(t)[0]),l=$(u,f),c=$(o,f);l.html(n.score),c.html(n.title),$(s).append(f)}a=!0}}function c(){$(s).empty(),$(r).hide(),a=!1}var n=require("Stage"),r="#endOfLevel",s="#scoreList",o=".title",u=".score",a=!1;return{init:f,show:l,close:c}});