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

define(["Stage"],function(e){function n(){}function t(){}function o(e){r=e}function a(){i++;var n=Math.floor(i/r*100);$(".preloaderPercent").text(n+"%"),$(".preloaderFill").css("width",n+"%"),n>=100&&(e.changeScreen(0),l=!1)}var r=0,i=0,l=!0;return{load:n,unload:t,setTotalFiles:o,fileLoaded:a}});