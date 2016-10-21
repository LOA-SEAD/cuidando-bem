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

define([],function(){function t(e,r){function i(){S()}function o(){_()}function u(){var n=new t(U,w).setCssClass(f()).onLoad(S).onUnload(_).setTemplate(v());for(dialog in k)n.registerDialog(k[dialog].getClone());for(interactiveObject in q)n.registerInteractiveObject(q[interactiveObject].getClone());for(action in B)n.registerAction(B[action].getClone());return n}function c(){return U}function s(){return w}function f(){return x}function g(){return B}function a(t){return"string"==typeof t?B[E[t]]:B[t]}function l(){return k}function h(){return q}function d(t){return"string"==typeof t?q[z[t]]:q[t]}function v(){return N}function C(t){return U=t,this}function I(t){return w=t,this}function p(t){return x=t,this}function b(t){return S=t,this}function j(t){return _=t,this}function O(t){return N=t,this}function m(t){E[t.getId()]=B.length,B.push(t)}function A(t){var n;for(n=0;n<t.length;n++)m(t[n])}function D(t){k.push(t)}function T(t){var n;for(n=0;n<t.length;n++)D(t[n])}function y(t){z[t.getId()]=q.length,q.push(t)}function L(t){var n;for(n=0;n<t.length;n++)y(t[n])}null==e&&(e="Scene_"+n),null==r&&(r="");var N,U=e,w=r,x="noTexture",S=function(){},_=function(){},k=[],q=[],z={},B=[],E={};return{getId:c,getName:s,getCssClass:f,load:i,unload:o,getClone:u,getActions:g,getAction:a,getInteractiveObjects:h,getInteractiveObject:d,getDialogs:l,getTemplate:v,setId:C,setName:I,setCssClass:p,onLoad:b,onUnload:j,setTemplate:O,registerAction:m,registerActions:A,registerDialog:D,registerDialogs:T,registerInteractiveObject:y,registerInteractiveObjects:L}}var n=-1;return t});