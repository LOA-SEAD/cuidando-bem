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

define(["Stage"],function(e){function n(){}function t(){}function o(e){i=e}function a(){r++;var n=Math.floor(r/i*100);$(".preloaderPercent").text(n+"%"),$(".preloaderFill").css("width",n+"%"),n>=100&&(c(),e.changeScreen(0),f=!1)}function l(e){c=e}var c,i=0,r=0,f=!0;return{load:n,unload:t,setTotalFiles:o,fileLoaded:a,setCallBack:l}});