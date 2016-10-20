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

define([],function(){function n(t,o){var r,e=[];if("object"==typeof o)if(o instanceof Array)e=e.concat(o);else for(r in o)e=e.concat(n(t,o[r]));else e.push(o);return e}function t(){arguments[0];c++,e(),c==f&&(a=!1,r())}function o(o,i,u,s){if(a)throw new Error("Can't load two path objects at the same time");var h;a=!0,c=0,r=u,e=s;var l=n(o,i);l.forEach(function(n,t,r){r[t]=o+n}),f=l.length;for(h in l){var v=l[h],d=new Image;d.onload=t,d.src=v}return f}var r,e,a=!1,c=0,f=0;return{load:o}});