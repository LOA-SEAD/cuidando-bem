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

define(["text!../html/end_of_level/endOfLevel.html","text!../html/end_of_level/scoreItemTemplate.html"],function(e,t){function c(t){$(t).append(e),$(".goToMenu").click(function(){f=!1,n.changeScreen(6),l.playInLoop(l.audios.musics.menu)}),$(".playAgain").click(function(){var e=require("CuidandoBem");e.restartLevel()})}function h(e,n){if(!f){$(r).show();var o=0;for(i=0;i<e.length;i++){var l=e[i],c=$($(t)[0]),h=$(a,c),p=$(u,c);h.html(l.score),p.html(l.title),o+=l.score,$(s).append(c)}var d=Math.floor(o/n*100);$(".percent").text(d+"%"),$(".fill").css("width",d+"%"),f=!0}}function p(){$(o).empty(),$(r).hide(),f=!1}var n=require("Stage"),r="#endOfLevel",s="#scoreList",o="#scoreList_tbody",u=".title",a=".score",f=!1,l=require("Player");return{init:c,show:h,close:p}});