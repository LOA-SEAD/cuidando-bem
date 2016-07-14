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

define([],function(){function n(t,e){var r,o=[];if("object"==typeof e)if(e instanceof Array)o=o.concat(e);else for(r in e)o=o.concat(n(t,e[r]));else o.push(t+e);return o}function t(){arguments[0];c++,o(),c==f&&(a=!1,r())}function e(e,i,u,s){if(a)throw new Error("Can't load two path objects at the same time");var l;a=!0,c=0,r=u,o=s;var h=n(e,i);f=h.length;for(l in h){var v=h[l],d=new Image;d.onload=t,d.src=v}return f}var r,o,a=!1,c=0,f=0;return{load:e}});