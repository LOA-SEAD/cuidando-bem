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

define(["Stage","levelsData"],function(e,a){function l(){n="Selecione uma fase",t=i.getLoadedSlot(),o.characters.jogador.setName(t.name);var l;for(l=0;l<t.lastLevel;l++){var s=$($(".level")[l]);s.removeClass("completed"),s.removeClass("failed");var c=i.getLevelScoreSum(l)/a.getLevelMaxScore(l+1);c>=.75?s.addClass("completed"):s.addClass("failed")}for(l=t.lastLevel+1;l<t.levels.length;l++)$($(".level")[l]).addClass("disabled");t.lastLevel>=10?($($(".level")[10]).removeClass("disabled"),i.hasSeenCredits()&&$($(".level")[10]).addClass("completed")):$($(".level")[10]).addClass("disabled");for(var v=0;v<d.length;v++)$(".l"+v).attr("aria-label","Fase "+d[v]);$(".menuButton").click(function(){r.play(r.audios.sfx.selecionarMenu)}),$(".backButton").click(function(){e.changeScreen(5)}),$(".level").click(function(){var l=$(".level").index(this),s=l+1;if(s<=t.lastLevel+1)if(n=d[l],$("p.title").text(n),$(this).hasClass("selected"))if(10!=l)a.setCurrentLevel(s),e.changeScreen(1);else{var r=i.getScoreSum(),o=a.getMaxGameScore(),c=r/o;c>=.75?e.changeScreen(8):e.changeScreen(9)}else $(".level").removeClass("selected"),$(this).addClass("selected")}),$(".level").hover(function(){var e=$(".level").index(this),a=e;r.play(r.audios.sfx.passarMouse),a<=t.lastLevel&&$("p.title").text(d[e])},function(){var e=$(".level").index(this),a=e;a<=t.lastLevel&&$("p.title").text(n)})}function s(){}var t,r=require("Player"),i=require("Storage"),o=(require("DialogsData"),require("Commons")),n="Selecione uma fase",d=["1 - Identificação do Paciente","2 - Prevenção de úlcera por pressão","3 - Prevenção de quedas","4 - Cirurgia segura","5 - Medicação segura","6 - Higienização das mãos","7 - Infusão de dieta segura","8 - Segurança na admnistração de medicação","9 - Segurança em procedimentos cirúrgicos","10 - Admnistração segura de medicação","Contratação"];return{load:l,unload:s}});