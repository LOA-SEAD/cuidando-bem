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

define([],function(){function e(t){function n(){var t=new e(m);for(scene in A)t.registerScene(A[scene].getClone());for(modal in F)t.registerModalScene(F[modal].getClone());for(flag in x)t.registerFlag(x[flag].getClone());return t.setMaxPoints(w),t.setInitialScene(N),t.setCurrentSceneById(B),t.setSetupScript(k),t}function r(){return m}function i(e){return u(e).getActions()}function c(e){return u(e).getDialogs()}function o(e){return u(e).getInteractiveObjects()}function u(e){return"string"==typeof e?A[D[e]]:A[e]}function g(e){return"string"==typeof e?F[O[e]]:F[e]}function s(){return x}function f(e){return"string"==typeof e?x[P[e]]:x[e]}function a(){return A[N]}function l(){return A[B]}function S(){return B}function I(e){N=e,B=e}function d(e){B=e}function p(e){D[e.getId()]=A.length,A.push(e)}function C(e){O[e.getId()]=F.length,F.push(e)}function h(e,t){A[t].registerAction(e)}function v(e,t){A[t].registerInteractiveObject(e)}function M(e,t){A[t].registerDialog(e)}function y(e){P[e.getName()]=x.length,x.push(e)}function b(e){w=e}function j(){return w}var m=t,A=[],D={},F=[],O={},x=[],P={},B=0,N=0,w=0,k=function(){};return{getClone:n,getName:r,getActions:i,getFlag:f,getFlags:s,getInteractiveObjects:o,getDialogs:c,getInitialScene:a,getCurrentScene:l,getCurrentSceneId:S,getScene:u,getModalScene:g,getMaxPoints:j,setInitialScene:I,setCurrentSceneById:d,setSetupScript:function(e){k=e},setup:function(){k()},setMaxPoints:b,registerScene:p,registerModalScene:C,registerAction:h,registerDialog:M,registerFlag:y,registerInteractiveObject:v}}return e});