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

define(["text!../html/command_bar/commandBar.html","text!../html/command_bar/actionButtonTemplate.html"],function(e,t){function i(t){$(t).append(e)}function s(e){console.group("Adding action Buttons",!0);var t;for(t=0;t<e.length;t++){console.log("Action to be added "+t+": "+e[t].getName());var n=e[t];l(n)}console.groupEnd()}function o(e){c(),s(e)}function u(){var e=$(r);for(button in e){var t=$(e[button]);t.removeAllListeners()}}function a(){$(n).hide()}function f(){$(n).show()}function l(e){var r=$($(t)[0]);r.click(e.getFunction()),r.attr("title",e.getName()),r.attr("id",e.getId()),r.addClass(e.getCssClass()),r.tooltip({tooltipClass:"actionButton-ui-tooltip",show:{duration:100},position:{my:"center bottom-20",at:"center top",using:function(e,t){$(this).css(e),$("<div>").addClass("arrow").addClass(t.vertical).addClass(t.horizontal).appendTo(this)}}}),e.isEnabled()?r.addClass("enabled"):r.addClass("disabled"),$(n).append(r),e.isVisible()||r.hide()}function c(){$(n).empty()}function h(){}function p(e){var t="#"+e.getId(),n=$(t);n.removeClass("disabled"),n.addClass("enabled"),n.click(e.getFunction()),n.tooltip("enable")}function d(e){var t="#"+e.getId(),n=$(t);n.removeClass("enabled"),n.addClass("disabled"),n.unbind("click"),n.tooltip("disable")}function v(e){console.group("Enabling action Buttons",!0);var t;for(t=0;t<e.length;t++){console.log("Action to be enabled "+t+": "+e[t].getName());var n=e[t];p(n)}console.groupEnd()}function m(e){console.group("Disabling action Buttons",!0);var t;for(t=0;t<e.length;t++){console.log("Action to be disabled "+t+": "+e[t].getName());var n=e[t];d(n)}console.groupEnd()}function g(e){console.group("Updating action Buttons",!0);var t;for(t=0;t<e.length;t++){console.log("Action to be updated "+t+": "+e[t].getName());var n=e[t];n.isEnabled()?p(n):d(n)}console.groupEnd()}function y(e,t){var n="#"+e.getId();t?$(n).show():$(n).hide()}var n="#commandBar",r=".action_button";return{init:i,close:u,hide:a,show:f,addActionButton:l,addAllActionButtons:s,changeToActionsButtons:o,removeActionButton:h,enableActionButton:p,disableActionButton:d,enableAllActionButtons:v,disableAllActionButtons:m,updateAllActionButtons:g,setActionVisible:y}});