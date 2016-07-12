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

define([],function(){function n(t,e){var o,r=[];if("object"==typeof e)if(e instanceof Array)r=r.concat(e);else for(o in e)r=r.concat(n(t,e[o]));else r.push(t+e);return r}function t(){arguments[0];a++,a==c&&(r=!1,o())}function e(e,f,i){if(r)throw new Error("Can't load two path objects at the same time");var s;r=!0,a=0,o=i;var u=n(e,f);c=u.length;for(s in u){var l=u[s],h=new Image;h.onload=t,h.src=l}}var o,r=!1,a=0,c=0;return{load:e}});