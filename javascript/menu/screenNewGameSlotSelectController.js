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

define(["Stage"],function(e){function l(){$(o).dialog({resizable:!1,autoOpen:!1,dialogClass:"delete-slot-dialog",modal:!0,draggable:!1,buttons:[{text:"Voltar","class":"dialogVoltarBtt",click:function(){$(this).dialog("close")}},{text:"Apagar","class":"dialogApagarBtt",click:function(){l=$(".slot"),$(this).dialog("close"),n.reset(i),$(l[i]).removeClass("filled"),$(l[i]).addClass("empty"),r[i]=n.loadSlot(i);var e=r[i];s=e.empty,$(l[i]).text(e.name),h()}}]}),$(o).dialog().dialog("widget").find(".ui-dialog-titlebar-close").hide(),$(u).dialog({resizable:!1,autoOpen:!1,dialogClass:"type-name-dialog",modal:!0,draggable:!1,buttons:[{text:"Voltar","class":"dialogVoltarBtt",click:function(){$(this).dialog("close"),$(a).val(f)}},{text:"Confirmar","class":"dialogConfirmarBtt",click:function(){$(this).dialog("close");var t=$(a).val();if(t===null||t===undefined||t===""||t===f)t=f+" "+(i+1);t=t.substring(0,25),n.setupSlot(i,t),n.loadSlot(i),s=!1,h(),e.changeScreen(6)}}]}),$(u).dialog().dialog("widget").find(".ui-dialog-titlebar-close").hide();var l=$(".slot");$(l[i]).addClass("selected"),h();var p;for(p in r){var d=r[p];d.empty?$(l[p]).addClass("empty"):$(l[p]).addClass("filled"),$(l[p]).text(d.name)}$(".menuButton").click(function(){t.play(t.audios.sfx.selecionarMenu)}),$(".backButton").click(function(){e.changeScreen(0)}),$("#deleteSlot").click(function(){s||$("#dialog-confirmDelete").dialog("open")}),$("#loadSlot").click(function(){c()}),l.click(function(){var e=$(".slot"),t=e.index(this);if(i!==t){i=t,e.removeClass("selected"),$(this).addClass("selected");var o=r[i];s=o.empty,h(),n.setSelectedId(i)}else c()})}function c(){s?$(u).dialog("open"):(n.loadSlot(i),e.changeScreen(6))}function h(){s?($("#deleteSlot").addClass("disabled"),$("#loadSlot").text("Iniciar")):($("#deleteSlot").removeClass("disabled"),$("#loadSlot").text("Carregar"))}function p(){}var t=require("Player"),n=require("Storage"),r=n.load(),i=n.getSelectedId(),s=r[i].empty,o="#dialog-confirmDelete",u="#dialog-typeName",a="#nameInput",f="";return{load:l,unload:p}});