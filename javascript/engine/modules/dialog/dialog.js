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

define([],function(){function e(t){function n(e,t){this.text=e,this.actionFunction=t}function f(e){u[e].actionFunction()}function l(){var t=(new e(r)).setText(o).setRandomize(a).setSpeakerCssClass(r.getCssClass()).setSpeakerName(r.getName());for(opt in u)t.registerOption(u[opt].text,u[opt].actionFunction);return t}function c(){return u}function h(){return r.getName()}function p(){return r.getCssClass()}function d(){return o}function v(){return a}function m(e){return u[e].text}function g(e){return this}function y(e){return this}function b(e){return o=e,this}function w(e){return a=e,this}function E(e,t){var r=new n(e,t);return u.push(r),this}if(t!=null)var r=t,i=t.getName(),s=t.getCssClass();var o="",u=[],a=!1;return{DialogOption:n,executeOption:f,getClone:l,getSpeakerName:h,getSpeakerCssClass:p,getText:d,getOptions:c,getOptionText:m,getRandomize:v,setSpeakerName:g,setSpeakerCssClass:y,setText:b,setRandomize:w,registerOption:E}}return e});