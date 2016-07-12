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

define(["Stage","levelsData"],function(e,a){function t(){o="Selecione uma fase",n=i.getLoadedSlot(),r.characters.jogador.setName(n.name);var t;for(t in n.levels)+t+1>n.lastLevel+1&&$($(".level")[t]).addClass("disabled");n.lastLevel>=10?$(".endGameButton").show():$(".endGameButton").hide();for(var l=0;l<c.length;l++)$(".l"+l).attr("aria-label","Fase "+c[l]);$(".image",$(".level")[n.lastLevel+1]).addClass("next"),$(".menuButton").click(function(){s.play(s.audios.sfx.selecionarMenu)}),$(".endGameButton").click(function(){var t=i.getScoreSum(),l=a.getMaxGameScore(),n=t/l;n>=.75?e.changeScreen(8):e.changeScreen(9)}),$(".backButton").click(function(){e.changeScreen(5)}),$(".level").click(function(){var t=$(".level").index(this),l=t+1;l<=n.lastLevel+1&&(o=c[t],$("p.title").text(o),$(this).hasClass("selected")?(a.setCurrentLevel(l),e.changeScreen(1)):($(".level").removeClass("selected"),$(this).addClass("selected")))}),$(".level").hover(function(){var e=$(".level").index(this),a=e;s.play(s.audios.sfx.passarMouse),a<=n.lastLevel+1&&$("p.title").text(c[e])},function(){var e=$(".level").index(this),a=e;a<=n.lastLevel+1&&$("p.title").text(o)})}function l(){}var n,s=require("Player"),i=require("Storage"),r=(require("DialogsData"),require("Commons")),o="Selecione uma fase",c=["1 - Identificação do Paciente","2 - Prevenção de úlcera por pressão","3 - Prevenção de quedas","4 - Cirurgia segura","5 - Medicação segura","6 - Higienização das mãos","7 - Infusão de dieta segura","8 - Segurança na admnistração de medicação","9 - Segurança em procedimentos cirúrgicos","10 - Admnistração segura de medicação"];return{load:t,unload:l}});