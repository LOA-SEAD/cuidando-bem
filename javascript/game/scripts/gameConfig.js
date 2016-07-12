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

define([],function(){function e(e){s=e,a=0;var r;for(r=0;r<t.length;r++)require([n+t[r]],function(){f()})}function f(){a++,a>=t.length&&s()}var s,a,n="./game/scripts/levels/",t=["faseTeste","testeEndOfLevel","fase1","fase2","fase3","fase4","fase5","fase6","fase7","fase8","fase9","fase10"];return{load:e}});