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

define(["Stage","levelsData"],function(e,t){function f(){u="Selecione uma fase",o=r.getLoadedSlot(),s.characters.jogador.setName(o.name);var i;for(i in o.levels)+i+1>o.lastLevel+1&&$($(".level")[i]).addClass("disabled");$(".image",$(".level")[o.lastLevel+1]).addClass("next"),$(".menuButton").click(function(){n.play(n.audios.sfx.selecionarMenu)}),$(".backButton").click(function(){e.changeScreen(5)}),$(".level").click(function(){var n=$(".level").index(this),r=n+1;r<=o.lastLevel+1&&(u=a[n],$("p.title").text(u),$(this).hasClass("selected")?(t.setCurrentLevel(r),e.changeScreen(1)):($(".level").removeClass("selected"),$(this).addClass("selected")))}),$(".level").hover(function(){var e=$(".level").index(this),t=e;n.play(n.audios.sfx.passarMouse),t<=o.lastLevel+1&&$("p.title").text(a[e])},function(){var e=$(".level").index(this),t=e;t<=o.lastLevel+1&&$("p.title").text(u)})}function l(){}var n=require("Player"),r=require("Storage"),i=require("DialogsData"),s=require("Commons"),o,u="Selecione uma fase",a=["1 - Identificação do Paciente","2 - Prevenção de úlcera por pressão","3 - Prevenção de quedas","4 - Cirurgia segura","5 - Medicação segura","6 - Higienização das mãos","7 - Infusão de dieta segura","8 - Segurança na admnistração de medicação","9 - Segurança em procedimentos cirúrgicos","10 - Admnistração segura de medicação"];return{load:f,unload:l}});