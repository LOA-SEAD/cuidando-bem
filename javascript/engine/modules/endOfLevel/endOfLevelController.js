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

define(["text!../html/end_of_level/endOfLevel.html","text!../html/end_of_level/scoreItemTemplate.html"],function(e,t){function n(t){$(t).append(e),$(".goToMenu").click(function(){d=!1,r.changeScreen(6),h.playInLoop(h.audios.musics.menu)}),$(".playAgain").click(function(){var e=require("CuidandoBem");e.restartLevel()})}function o(e,n){if(!d){$(c).show();var o=0;for(i=0;i<e.length;i++){var l=e[i],r=$($(t)[0]),s=$(u,r),h=$(f,r);s.html(l.score),h.html(l.title),o+=l.score,$(a).append(r)}var m=Math.floor(o/n*100);$(".percent").text(m+"%"),$(".fill").css("width",m+"%"),d=!0}}function l(){$(s).empty(),$(c).hide(),d=!1}var r=require("Stage"),c="#endOfLevel",a="#scoreList",s="#scoreList_tbody",f=".title",u=".score",d=!1,h=require("Player");return{init:n,show:o,close:l}});