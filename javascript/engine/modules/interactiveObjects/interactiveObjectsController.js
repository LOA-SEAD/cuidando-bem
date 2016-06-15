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

define(["text!../html/interactiveObject/interactiveObjects.html","text!../html/interactiveObject/interactiveObjectTemplate.html"],function(e,t){function i(t){$(t).append(e)}function s(e){var t;for(t=0;t<e.length;t++){var n=e[t];u(n)}}function o(e){a(),s(e)}function u(e){var r=$($(t)[0]);r.attr("title",e.getName()),r.attr("id",e.getId()),r.addClass(e.getCssClass()),r.tooltip({tooltipClass:"interactiveObject-ui-tooltip",show:{duration:200},position:{within:"#stage",of:"#stage",my:"center top",at:"center top+5%"}}),e.isEnabled()?(r.addClass("enabled"),r.click(e.getFunction()),r.tooltip("option","disabled",!1)):(r.addClass("disabled"),r.tooltip("option","disabled",!0)),$(n).append(r),e.isVisible()||r.hide()}function a(){$(n).empty()}function f(e){$("#"+e.getId()).remove()}function l(e){var t="#"+e.getId(),n=$(t);n.removeClass("disabled"),n.addClass("enabled"),n.click(e.getFunction()),n.tooltip("option","disabled",!1)}function c(e){var t="#"+e.getId(),n=$(t);n.removeClass("enabled"),n.addClass("disabled"),n.unbind("click"),n.tooltip("option","disabled",!0)}function h(e){var t;for(t=0;t<e.length;t++){var n=e[t];l(n)}}function p(e){var t;for(t=0;t<e.length;t++){var n=e[t];c(n)}}function d(e){var t;for(t=0;t<e.length;t++){var n=e[t];n.isEnabled()?l(n):c(n)}}function v(e,t){var n="#"+e.getId();t?$(n).show():$(n).hide()}var n="#interactiveObjects",r=".interactiveObject";return{init:i,addInteractiveObject:u,addAllInteractiveObjects:s,changeToInteractiveObjects:o,removeAllInteractiveObjects:a,removeInteractiveObject:f,setInteractiveObjectVisible:v,enableInteractiveObject:l,disableInteractiveObject:c,enableAllInteractiveObjects:h,disableAllInteractiveObjects:p,updateAllInteractiveObjects:d}});