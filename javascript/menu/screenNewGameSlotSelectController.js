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

define(["Stage","AccessibleNavigationMenus"],function(e,l){function a(){$(g).dialog({resizable:!1,autoOpen:!1,dialogClass:"delete-slot-dialog",modal:!0,draggable:!1,buttons:[{text:"Voltar",class:"dialogVoltarBtt",click:function(){$(this).dialog("close")}},{text:"Apagar",class:"dialogApagarBtt",click:function(){a=$(".slot"),$(this).dialog("close"),s.reset(c),$(a[c]).removeClass("filled"),$(a[c]).addClass("empty"),n[c]=s.loadSlot(c);var e=n[c];r=e.empty,$(a[c]).text(e.name),o()}}]}),$(g).dialog().dialog("widget").find(".ui-dialog-titlebar-close").hide(),$(u).dialog({resizable:!1,autoOpen:!1,dialogClass:"type-name-dialog",modal:!0,draggable:!1,buttons:[{text:"Voltar",class:"dialogVoltarBtt",click:function(){$(this).dialog("close"),$(f).val(m)}},{text:"Confirmar",class:"dialogConfirmarBtt",click:function(){$(this).dialog("close");var l=$(f).val();null!==l&&void 0!==l&&""!==l&&l!==m||(l=m+" "+(c+1)),l=l.substring(0,25),s.setupSlot(c,l),s.loadSlot(c),r=!1,o(),e.changeScreen(6)}}]}),$(u).dialog().dialog("widget").find(".ui-dialog-titlebar-close").hide();var a=$(".slot");$(a[c]).addClass("selected"),o();var i;for(i in n){var p=n[i];p.empty?$(a[i]).addClass("empty"):$(a[i]).addClass("filled"),$(a[i]).text(p.name)}$(".menuButton").click(function(){d.play(d.audios.sfx.selecionarMenu)}),$(".backButton").click(function(){e.changeScreen(0)}),$("#deleteSlot").click(function(){r||$("#dialog-confirmDelete").dialog("open")}),$("#loadSlot").click(function(){t()}),a.click(function(){var e=$(".slot"),l=e.index(this);if(c!==l){c=l,e.removeClass("selected"),$(this).addClass("selected");var a=n[c];r=a.empty,o(),s.setSelectedId(c)}else t()}),l.startAccessibleNavigationMenus()}function t(){r?$(u).dialog("open"):(s.loadSlot(c),e.changeScreen(6))}function o(){r?($("#deleteSlot").addClass("disabled"),$("#loadSlot").text("Iniciar")):($("#deleteSlot").removeClass("disabled"),$("#loadSlot").text("Carregar"))}function i(){}var d=require("Player"),s=require("Storage"),n=s.load(),c=s.getSelectedId(),r=n[c].empty,g="#dialog-confirmDelete",u="#dialog-typeName",f="#nameInput",m="";return{load:a,unload:i}});