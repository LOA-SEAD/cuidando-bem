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

define(["Stage","AccessibleNavigationMenus"],function(e,n){function t(){}function o(){}function a(e){r=e}function i(){f++;var e=Math.floor(f/r*100);$(".preloaderPercent").text(e+"%"),$(".preloaderFill").css("width",e+"%"),e>=100&&(c(),u=!1)}function l(e){c=e}var c,r=0,f=0,u=!0;return{load:t,unload:o,setTotalFiles:a,fileLoaded:i,setCallBack:l}});