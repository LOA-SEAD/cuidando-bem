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

define(["Stage"],function(e){function l(){$(r).dialog({resizable:!1,autoOpen:!1,dialogClass:"delete-slot-dialog",modal:!0,draggable:!1,buttons:[{text:"Voltar","class":"dialogVoltarBtt",click:function(){$(this).dialog("close")}},{text:"Apagar","class":"dialogApagarBtt",click:function(){l=$(".slot"),$(this).dialog("close"),d.reset(s),$(l[s]).removeClass("filled"),$(l[s]).addClass("empty"),n[s]=d.loadSlot(s);var e=n[s];c=e.empty,$(l[s]).text(e.name),t()}}]}),$(r).dialog().dialog("widget").find(".ui-dialog-titlebar-close").hide(),$(g).dialog({resizable:!1,autoOpen:!1,dialogClass:"type-name-dialog",modal:!0,draggable:!1,buttons:[{text:"Voltar","class":"dialogVoltarBtt",click:function(){$(this).dialog("close"),$(u).val(f)}},{text:"Confirmar","class":"dialogConfirmarBtt",click:function(){$(this).dialog("close");var l=$(u).val();(null===l||void 0===l||""===l||l===f)&&(l=f+" "+(s+1)),l=l.substring(0,25),d.setupSlot(s,l),d.loadSlot(s),c=!1,t(),e.changeScreen(6)}}]}),$(g).dialog().dialog("widget").find(".ui-dialog-titlebar-close").hide();var l=$(".slot");$(l[s]).addClass("selected"),t();var o;for(o in n){var m=n[o];m.empty?$(l[o]).addClass("empty"):$(l[o]).addClass("filled"),$(l[o]).text(m.name)}$(".menuButton").click(function(){i.play(i.audios.sfx.selecionarMenu)}),$(".backButton").click(function(){e.changeScreen(0)}),$("#deleteSlot").click(function(){c||$("#dialog-confirmDelete").dialog("open")}),$("#loadSlot").click(function(){a()}),l.click(function(){var e=$(".slot"),l=e.index(this);if(s!==l){s=l,e.removeClass("selected"),$(this).addClass("selected");var o=n[s];c=o.empty,t(),d.setSelectedId(s)}else a()})}function a(){c?$(g).dialog("open"):(d.loadSlot(s),e.changeScreen(6))}function t(){c?($("#deleteSlot").addClass("disabled"),$("#loadSlot").text("Iniciar")):($("#deleteSlot").removeClass("disabled"),$("#loadSlot").text("Carregar"))}function o(){}var i=require("Player"),d=require("Storage"),n=d.load(),s=d.getSelectedId(),c=n[s].empty,r="#dialog-confirmDelete",g="#dialog-typeName",u="#nameInput",f="";return{load:l,unload:o}});