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

define([],function(){function t(n,r){function v(){console.info("Scene "+s+" load function"),u()}function m(){console.info("Scene "+s+" unload function"),a()}function g(){var e=(new t(i,s)).setCssClass(w()).onLoad(u).onUnload(a).setTemplate(C());for(dialog in f)e.registerDialog(f[dialog].getClone());for(interactiveObject in l)e.registerInteractiveObject(l[interactiveObject].getClone());for(action in h)e.registerAction(h[action].getClone());return e}function y(){return i}function b(){return s}function w(){return o}function E(){return h}function S(e){return typeof e=="string"?h[p[e]]:h[e]}function x(){return f}function T(){return l}function N(e){return typeof e=="string"?l[c[e]]:l[e]}function C(){return d}function k(e){return i=e,this}function L(e){return s=e,this}function A(e){return o=e,this}function O(e){return u=e,this}function M(e){return a=e,this}function _(e){return d=e,this}function D(e){p[e.getId()]=h.length,h.push(e),console.log("Registering Action: ",e.getName(),"on Scene:"+s)}function P(e){var t;for(t=0;t<e.length;t++)D(e[t])}function H(e){f.push(e),console.log("Registering Dialog: ",e.getSpeakerName(),"on Scene:"+s)}function B(e){var t;for(t=0;t<e.length;t++)H(e[t])}function j(e){c[e.getId()]=l.length,l.push(e),console.log("Registering Interactive Object: ",e.getName(),"on Scene:"+s)}function F(e){var t;for(t=0;t<e.length;t++)j(e[t])}n==null&&(n="Scene_"+e),r==null&&(r="");var i=n,s=r,o="noTexture",u=function(){},a=function(){},f=[],l=[],c={},h=[],p={},d;return{getId:y,getName:b,getCssClass:w,load:v,unload:m,getClone:g,getActions:E,getAction:S,getInteractiveObjects:T,getInteractiveObject:N,getDialogs:x,getTemplate:C,setId:k,setName:L,setCssClass:A,onLoad:O,onUnload:M,setTemplate:_,registerAction:D,registerActions:P,registerDialog:H,registerDialogs:B,registerInteractiveObject:j,registerInteractiveObjects:F}}var e=-1;return t});