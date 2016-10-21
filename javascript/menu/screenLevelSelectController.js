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

define(["Stage","levelsData","AccessibleNavigationMenus"],function(e,a,l){function s(){d="Selecione uma fase",i=n.getLoadedSlot(),o.characters.jogador.setName(i.name);var s;for(s=0;s<i.lastLevel;s++){var t=$($(".level")[s]);t.removeClass("completed"),t.removeClass("failed");var v=n.getLevelScoreSum(s)/a.getLevelMaxScore(s+1);v>=.75?t.addClass("completed"):t.addClass("failed")}for(s=i.lastLevel+1;s<i.levels.length;s++)$($(".level")[s]).addClass("disabled");i.lastLevel>=10?($($(".level")[10]).removeClass("disabled"),n.hasSeenCredits()&&$($(".level")[10]).addClass("completed")):$($(".level")[10]).addClass("disabled");for(var u=0;u<c.length;u++)$(".l"+u).attr("aria-label","Fase "+c[u]);$(".menuButton").click(function(){r.play(r.audios.sfx.selecionarMenu)}),$(".backButton").click(function(){e.changeScreen(5)}),$(".level").click(function(){var l=$(".level").index(this),s=l+1;if(s<=i.lastLevel+1)if(d=c[l],$("p.title").text(d),$(this).hasClass("selected"))if(10!=l)a.setCurrentLevel(s),e.changeScreen(1);else{var t=n.getScoreSum(),r=a.getMaxGameScore(),o=t/r;o>=.75?e.changeScreen(8):e.changeScreen(9)}else $(".level").removeClass("selected"),$(this).addClass("selected")}),$(".level").hover(function(){$(".level").css("z-index","1"),$(this).css("z-index","3");var e=$(".level").index(this),a=e;r.play(r.audios.sfx.passarMouse),a<=i.lastLevel&&$("p.title").text(c[e])},function(){var e=$(".level").index(this),a=e;a<=i.lastLevel&&$("p.title").text(d)}),l.startAccessibleNavigationMenus()}function t(){}var i,r=require("Player"),n=require("Storage"),o=(require("DialogsData"),require("Commons")),d="Selecione uma fase",c=["1 - Identificação do Paciente","2 - Prevenção de úlcera por pressão","3 - Prevenção de quedas","4 - Cirurgia segura","5 - Medicação segura","6 - Higienização das mãos","7 - Infusão de dieta segura","8 - Segurança na admnistração de medicação","9 - Segurança em procedimentos cirúrgicos","10 - Admnistração segura de medicação","Contratação"];return{load:s,unload:t}});