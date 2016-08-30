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

define(["text!../html/interactiveObject/interactiveObjects.html","text!../html/interactiveObject/interactiveObjectTemplate.html","IsMobile"],function(e,t,i){function a(t){$(t).append(e)}function n(e){var t;for(t=0;t<e.length;t++){var i=e[t];o(i)}}function c(e){l(),n(e)}function o(e){var i=$($(t)[0]);i.attr("title",e.getName()),i.attr("id",e.getId()),i.addClass(e.getCssClass()),i.on("screenReader",function(){$(".jqhover").removeClass("jqhover"),$(this).addClass("jqhover"),$("#accessible_log").empty(),$("<span>"+e.getName()+"</span><br>").appendTo("#accessible_log")}),i.tooltip({tooltipClass:"interactiveObject-ui-tooltip",show:{duration:200},position:{within:"#stage",of:"#stage",my:"center top",at:"center top+5%"}}),e.isEnabled()?v(i,e):(i.addClass("disabled"),i.tooltip("option","disabled",!0)),$(j).append(i),e.isVisible()||i.hide()}function l(){$(j).empty()}function s(e){$("#"+e.getId()).remove()}function r(e){var t="#"+e.getId(),i=$(t);v(i,e)}function d(e){var t="#"+e.getId(),i=$(t);i.removeClass("enabled"),i.addClass("disabled"),i.unbind("click"),i.tooltip("option","disabled",!0)}function v(e,t){e.click(t.getFunction()),e.removeClass("disabled"),e.addClass("enabled"),e.tooltip("option","disabled",!1)}function b(e){var t;for(t=0;t<e.length;t++){var i=e[t];r(i)}}function p(e){var t;for(t=0;t<e.length;t++){var i=e[t];d(i)}}function f(e){var t;for(t=0;t<e.length;t++){var i=e[t];i.isEnabled()?r(i):d(i)}}function u(e,t){var i="#"+e.getId();t?$(i).show():$(i).hide()}var j="#interactiveObjects";return{init:a,addInteractiveObject:o,addAllInteractiveObjects:n,changeToInteractiveObjects:c,removeAllInteractiveObjects:l,removeInteractiveObject:s,setInteractiveObjectVisible:u,enableInteractiveObject:r,disableInteractiveObject:d,enableAllInteractiveObjects:b,disableAllInteractiveObjects:p,updateAllInteractiveObjects:f}});