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

define([],function(){function i(i){n=i,r=0;var o;for(o=0;o<t.length;o++)require([e+t[o]],function(){s()})}function s(){r++,r>=t.length&&n()}var e="./game/scripts/levels/",t=["faseTeste","testeEndOfLevel","fase1","fase2","fase3","fase4","fase5","fase6","fase7","fase8","fase9","fase10"],n,r;return{load:i}});