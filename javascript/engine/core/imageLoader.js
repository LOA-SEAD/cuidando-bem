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

define([],function(){function i(e,t){var n=[],r;if(typeof t=="object")if(t instanceof Array)n=n.concat(t);else for(r in t)n=n.concat(i(e,t[r]));else n.push(e+t);return n}function s(){var i=arguments[0];t++,t==n&&(e=!1,r())}function o(o,u,a){if(e)throw new Error("Can't load two path objects at the same time");var f;e=!0,t=0,r=a;var l=i(o,u);n=l.length;for(f in l){var c=l[f],h=new Image;h.onload=s,h.src=c}}var e=!1,t=0,n=0,r;return{load:o}});