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

define([],function(){function l(){var l=null,n=null,i=null,u=null;e=$(".menuButton:visible"),$("#slotsContainer").is(":visible")&&(l=$("#slotsContainer .slot:visible")),$("#levelSelector").is(":visible")&&(n=$("#levelSelector button:visible[class!='disabled']")),$("#musicControls").is(":visible")&&(i=$("#musicControls .ui-slider-handle")),$(".ui-dialog").is(":visible")&&(u=$(".ui-dialog button")),null!=l&&e.push.apply(e,l),null!=n&&e.push.apply(e,n),null!=i&&e.push.apply(e,i),null!=u&&e.push.apply(e,u)}function n(n){if(l(),null!=e){if(n==t)return u>=e.length-1?u=0:u++,$(e[u]).focus(),!1;if(n==s)return u>0?u--:u=e.length-1,$(e[u]).focus(),!1;if(n==o&&-1!=u)return $(e[u]).click(),!1}}function i(){$(window).on("keydown",function(l){return n(l.which)})}var e=null,u=0;const s=38,t=40,o=13;return{menuSweepScreen:l,menuNavigation:n,startAccessibleNavigationMenus:i}});