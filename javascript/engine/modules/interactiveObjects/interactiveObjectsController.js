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

define(["text!../html/interactiveObject/interactiveObjects.html","text!../html/interactiveObject/interactiveObjectTemplate.html","IsMobile"],function(t,e,i){function a(e){$(e).append(t)}function n(t){var e;for(e=0;e<t.length;e++){var i=t[e];l(i)}}function c(t){o(),n(t)}function l(t){var i=$($(e)[0]);i.attr("title",t.getName()),i.attr("aria-label",t.getName()),i.attr("id",t.getId()),i.addClass(t.getCssClass()),i.focus(function(){$("<span>"+t.getName()+"</span><br>").appendTo("#accessible_log")}),i.tooltip({tooltipClass:"interactiveObject-ui-tooltip",show:{duration:200},position:{within:"#stage",of:"#stage",my:"center top",at:"center top+5%"}}),t.isEnabled()?b(i,t):(i.addClass("disabled"),i.tooltip("option","disabled",!0)),$(g).append(i),t.isVisible()||i.hide()}function o(){$(g).empty()}function s(t){$("#"+t.getId()).remove()}function r(t){var e="#"+t.getId(),i=$(e);b(i,t)}function d(t){var e="#"+t.getId(),i=$(e);i.removeClass("enabled"),i.addClass("disabled"),i.unbind("click"),i.tooltip("option","disabled",!0)}function b(t,e){t.click(e.getFunction()),t.removeClass("disabled"),t.addClass("enabled"),t.tooltip("option","disabled",!1)}function v(t){var e;for(e=0;e<t.length;e++){var i=t[e];r(i)}}function p(t){var e;for(e=0;e<t.length;e++){var i=t[e];d(i)}}function f(t){var e;for(e=0;e<t.length;e++){var i=t[e];i.isEnabled()?r(i):d(i)}}function u(t,e){var i="#"+t.getId();e?$(i).show():$(i).hide()}var g="#interactiveObjects";return{init:a,addInteractiveObject:l,addAllInteractiveObjects:n,changeToInteractiveObjects:c,removeAllInteractiveObjects:o,removeInteractiveObject:s,setInteractiveObjectVisible:u,enableInteractiveObject:r,disableInteractiveObject:d,enableAllInteractiveObjects:v,disableAllInteractiveObjects:p,updateAllInteractiveObjects:f}});