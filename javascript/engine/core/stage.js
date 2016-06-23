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

define([],function(){function o(){if(i==undefined)throw new Error(e.undefinedContainer);f(s)}function u(e,t,n){function o(){return i}function u(){return s}var r=e,i=t,s=n;return{getHtmlPage:o,getControllerName:u}}function a(e,n,r){console.log("	Adding Screen: ",e,n,r),t.push(new u(e,n,r))}function f(e){var s=t[e],o="text!"+n+s.getHtmlPage(),u=r+s.getControllerName();require([o,u],function(e,t){console.log("Actual Screen Name: "+s.getControllerName()),$(i).empty(),$(i).append(e),t.load()})}function l(e){n=e}function c(e){i=e}function h(e){s=e}function p(){return i}function d(e){r=e}console.info("Stage - module loaded");var e={undefinedContainer:"'container' is undefined and Stage can't continue without a place to load its content"},t=[],n,r,i,s=0;return{start:o,registerScreen:a,changeScreen:f,setHtmlPath:l,setControllersPath:d,setStartingScreenId:h,setContainer:c,getContainer:p}});