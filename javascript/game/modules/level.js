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

define([],function(){function e(t){function p(){var t=new e(n);for(scene in r)t.registerScene(r[scene].getClone());for(modal in s)t.registerModalScene(s[modal].getClone());for(flag in u)t.registerFlag(u[flag].getClone());return t.setMaxPoints(c),t.setInitialScene(l),t.setCurrentSceneById(f),t.setSetupScript(h),t}function d(){return n}function v(e){return y(e).getActions()}function m(e){return y(e).getDialogs()}function g(e){return y(e).getInteractiveObjects()}function y(e){return typeof e=="string"?r[i[e]]:r[e]}function b(e){return typeof e=="string"?s[o[e]]:s[e]}function w(){return u}function E(e){return typeof e=="string"?u[a[e]]:u[e]}function S(){return r[l]}function x(){return r[f]}function T(){return f}function N(e){l=e,f=e}function C(e){f=e}function k(e){i[e.getId()]=r.length,r.push(e)}function L(e){o[e.getId()]=s.length,s.push(e)}function A(e,t){r[t].registerAction(e)}function O(e,t){r[t].registerInteractiveObject(e)}function M(e,t){r[t].registerDialog(e)}function _(e){a[e.getName()]=u.length,u.push(e)}function D(e){c=e}function P(){return c}var n=t,r=[],i={},s=[],o={},u=[],a={},f=0,l=0,c=0,h=function(){};return{getClone:p,getName:d,getActions:v,getFlag:E,getFlags:w,getInteractiveObjects:g,getDialogs:m,getInitialScene:S,getCurrentScene:x,getCurrentSceneId:T,getScene:y,getModalScene:b,getMaxPoints:P,setInitialScene:N,setCurrentSceneById:C,setSetupScript:function(e){h=e},setup:function(){h()},setMaxPoints:D,registerScene:k,registerModalScene:L,registerAction:A,registerDialog:M,registerFlag:_,registerInteractiveObject:O}}return e});