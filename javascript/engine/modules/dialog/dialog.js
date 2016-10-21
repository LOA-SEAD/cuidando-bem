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

define([],function(){function t(e){function n(t,e){this.text=t,this.actionFunction=e}function i(t){k[t].actionFunction()}function r(){var e=new t(h).setText(x).setRandomize(N).setSpeakerCssClass(h.getCssClass()).setSpeakerName(h.getName());for(opt in k)e.registerOption(k[opt].text,k[opt].actionFunction);return e}function s(){return k}function o(){return h.getName()}function u(){return h.getCssClass()}function a(){return x}function c(){return N}function f(t){return k[t].text}function g(t){return this}function p(t){return this}function C(t){return x=t,this}function l(t){return N=t,this}function m(t,e){var i=new n(t,e);return k.push(i),this}if(null!=e){var h=e;e.getName(),e.getCssClass()}var x="",k=[],N=!1;return{DialogOption:n,executeOption:i,getClone:r,getSpeakerName:o,getSpeakerCssClass:u,getText:a,getOptions:s,getOptionText:f,getRandomize:c,setSpeakerName:g,setSpeakerCssClass:p,setText:C,setRandomize:l,registerOption:m}}return t});