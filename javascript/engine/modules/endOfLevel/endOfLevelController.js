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

define(["text!../html/end_of_level/endOfLevel.html","text!../html/end_of_level/scoreItemTemplate.html"],function(e,t){function h(t){$(t).append(e),$(".goToMenu").click(function(){l?n.changeScreen(8):(f=!1,n.changeScreen(6),c.playInLoop(c.audios.musics.menu))}),$(".playAgain").click(function(){var e=require("CuidandoBem");e.restartLevel()})}function p(e,n,o){if(!f){typeof o!="undefined"&&(l=o),$(r).show();var c=0;for(i=0;i<e.length;i++){var h=e[i],p=$($(t)[0]),d=$(a,p),v=$(u,p);d.html(h.score),v.html(h.title),c+=h.score,$(s).append(p)}var m=Math.floor(c/n*100);$(".percent").text(m+"%"),$(".fill").css("width",m+"%"),f=!0}}function d(){$(o).empty(),$(r).hide(),f=!1}var n=require("Stage"),r="#endOfLevel",s="#scoreList",o="#scoreList_tbody",u=".title",a=".score",f=!1,l=!1,c=require("Player");return{init:h,show:p,close:d}});