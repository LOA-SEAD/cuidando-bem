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

define([],function(){function n(){if(void 0==l)throw new Error(g.undefinedContainer);r(C)}function t(n,t,e){function r(){return i}function o(){return a}var i=t,a=e;return{getHtmlPage:r,getControllerName:o}}function e(n,e,r){s.push(new t(n,e,r))}function r(n){var t=s[n],e="text!"+f+t.getHtmlPage(),r=d+t.getControllerName();require([e,r],function(n,t){$(l).empty(),$(l).append(n),t.load()})}function o(n){f=n}function i(n){l=n}function a(n){C=n}function u(){return l}function c(n){d=n}var f,d,l,g={undefinedContainer:"'container' is undefined and Stage can't continue without a place to load its content"},s=[],C=0;return{start:n,registerScreen:e,changeScreen:r,setHtmlPath:o,setControllersPath:c,setStartingScreenId:a,setContainer:i,getContainer:u}});