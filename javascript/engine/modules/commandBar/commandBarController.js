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

define(["text!../html/command_bar/commandBar.html","text!../html/command_bar/actionButtonTemplate.html"],function(t,n){function o(n){$(n).append(t)}function a(t){var n;for(n=0;n<t.length;n++){var o=t[n];d(o)}}function i(t){c(),a(t)}function e(){var t=$(A);for(button in t){var n=$(t[button]);n.removeAllListeners()}}function l(){$(p).hide()}function s(){$(p).show()}function d(t){var o=$($(n)[0]);o.click(t.getFunction()),o.attr("title",t.getName()),o.attr("id",t.getId()),o.addClass(t.getCssClass()),o.tooltip({tooltipClass:"actionButton-ui-tooltip",show:{duration:100},position:{my:"center bottom-20",at:"center top",using:function(t,n){$(this).css(t),$("<div>").addClass("arrow").addClass(n.vertical).addClass(n.horizontal).appendTo(this)}}}),t.isEnabled()?o.addClass("enabled"):o.addClass("disabled"),$(p).append(o),t.isVisible()||o.hide()}function c(){$(p).empty()}function r(){}function u(t){var n="#"+t.getId(),o=$(n);o.removeClass("disabled"),o.addClass("enabled"),o.click(t.getFunction()),o.tooltip("enable")}function b(t){var n="#"+t.getId(),o=$(n);o.removeClass("enabled"),o.addClass("disabled"),o.unbind("click"),o.tooltip("disable")}function f(t){var n;for(n=0;n<t.length;n++){var o=t[n];u(o)}}function m(t){var n;for(n=0;n<t.length;n++){var o=t[n];b(o)}}function v(t){var n;for(n=0;n<t.length;n++){var o=t[n];o.isEnabled()?u(o):b(o)}}function h(t,n){var o="#"+t.getId();n?$(o).show():$(o).hide()}var p="#commandBar",A=".action_button";return{init:o,close:e,hide:l,show:s,addActionButton:d,addAllActionButtons:a,changeToActionsButtons:i,removeActionButton:r,enableActionButton:u,disableActionButton:b,enableAllActionButtons:f,disableAllActionButtons:m,updateAllActionButtons:v,setActionVisible:h}});